CREATE OR REPLACE FUNCTION create_invitation_with_sections(
    p_user_id UUID,
    p_theme_id UUID,
    p_domain VARCHAR,
    p_settings JSONB
) RETURNS SETOF invitations AS $$
DECLARE
    v_invitation_id UUID;
BEGIN
    -- 1. Insert ke tabel invitations
    INSERT INTO invitations (user_id, theme_id, domain, settings, is_active)
    VALUES (p_user_id, p_theme_id, p_domain, p_settings, 1)
    RETURNING id INTO v_invitation_id;

    -- 2. Copy dari theme_sections ke invitation_sections (termasuk layout_id)
    INSERT INTO invitation_sections (
        invitation_id, 
        layout_id,      -- Kolom baru yang ditambahkan
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
        layout_id,      -- Diambil dari theme_sections
        title, 
        icon, 
        body, 
        is_premium, 
        image_url, 
        background_url, 
        "order"
    FROM theme_sections
    WHERE theme_id = p_theme_id;

    RETURN QUERY SELECT * FROM invitations WHERE id = v_invitation_id;
END;
$$ LANGUAGE plpgsql;