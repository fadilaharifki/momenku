ALTER TABLE invitations 
ADD COLUMN IF NOT EXISTS storage_path TEXT;

-- Opsional: Berikan index agar query berdasarkan path lebih cepat jika nanti dibutuhkan
CREATE INDEX IF NOT EXISTS idx_invitations_storage_path ON invitations(storage_path);

CREATE OR REPLACE FUNCTION create_invitation_with_sections(
    p_user_id UUID,
    p_theme_id UUID,
    p_domain VARCHAR,
    p_settings JSONB,
    p_background_url TEXT,
    p_music_url TEXT,
    p_storage_path TEXT
) RETURNS SETOF invitations AS $$
DECLARE
    v_invitation_id UUID;
BEGIN
    -- 1. Insert ke tabel invitations termasuk kolom background_url
    INSERT INTO invitations (
        user_id, 
        theme_id, 
        domain, 
        settings, 
        background_url, 
        music_url, 
        storage_path,
        is_active
    )
    VALUES (
        p_user_id, 
        p_theme_id, 
        p_domain, 
        p_settings, 
        p_background_url,
        p_music_url, 
        p_storage_path, 
        1
    )
    RETURNING id INTO v_invitation_id;

    -- 2. Copy dari theme_sections ke invitation_sections
    INSERT INTO invitation_sections (
        invitation_id, 
        layout_id,
        title, 
        icon, 
        body, 
        is_premium, 
        image_url, 
        background_url, 
        "order"
    )
    SELECT 
        v_invitation_id, 
        layout_id,
        title, 
        icon, 
        body, 
        is_premium, 
        image_url, 
        background_url, 
        "order"
    FROM theme_sections
    WHERE theme_id = p_theme_id;

    -- 3. Return data undangan yang baru dibuat
    RETURN QUERY SELECT * FROM invitations WHERE id = v_invitation_id;
END;
$$ LANGUAGE plpgsql;

-- 1. Izin INSERT (Upload file baru)
-- Mengizinkan user yang login untuk upload ke folder 'client'
CREATE POLICY "Allow Authenticated Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'image' 
  AND (storage.foldername(name))[1] = 'client'
);

-- 2. Izin SELECT (PENTING: Agar tamu bisa lihat foto)
-- Menggunakan 'TO public' bukan 'FOR public'
CREATE POLICY "Allow Public Select"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'image');

-- 3. Izin UPDATE & DELETE (Agar user bisa menimpa/hapus fotonya sendiri)
CREATE POLICY "Allow Individual Update and Delete"
ON storage.objects FOR ALL
TO authenticated
USING (
  bucket_id = 'image' 
  AND (storage.foldername(name))[1] = 'client'
);