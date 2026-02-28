-- 1. Extension untuk UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Tabel RSVP disesuaikan dengan screenshot data inputs
CREATE TABLE invitation_rsvps (
    -- ID unik untuk isi QR Code [cite: 2026-02-28]
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Relasi ke tabel undangan utama
    invitation_id UUID NOT NULL,
    
    -- FIELD STANDAR (Sesuai urutan array di screenshot: name, group_name, phone, dll) [cite: 2026-02-28]
    name VARCHAR(255) NOT NULL,
    group_name VARCHAR(255),          -- Sesuai index 1 di screenshot [cite: 2026-02-28]
    phone VARCHAR(20),               -- Sesuai index 2 di screenshot [cite: 2026-02-28]
    attendance VARCHAR(50),          -- Sesuai index 3 di screenshot [cite: 2026-02-28]
    guest_count INTEGER DEFAULT 0,    -- Sesuai index 4 'guest' di screenshot [cite: 2026-02-28]
    comment TEXT,                    -- Sesuai index 5 di screenshot [cite: 2026-02-28]
    rsvp_code VARCHAR(20) UNIQUE  -- MOM-7A2X9
    
    -- JAWABAN CUSTOM (JSONB)
    -- Untuk menampung inputan seperti "Pertanyaan Baru" yang ada di screenshot dashboard [cite: 2026-02-28]
    additional_data JSONB DEFAULT '{}'::jsonb,
    
    -- FITUR CHECK-IN (QR CODE)
    is_attended BOOLEAN DEFAULT FALSE, -- Status kehadiran fisik [cite: 2026-02-28]
    checkin_at TIMESTAMP WITH TIME ZONE,
    
    -- METADATA
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    -- Hubungkan ke tabel invitations Anda
    CONSTRAINT fk_invitation
      FOREIGN KEY(invitation_id) 
      REFERENCES invitations(id)
      ON DELETE CASCADE
);

-- 3. INDEXING UNTUK PERFORMA
CREATE INDEX idx_rsvps_invitation_id ON invitation_rsvps(invitation_id);
CREATE INDEX idx_rsvps_id ON invitation_rsvps(id); -- Untuk scan QR [cite: 2026-02-28]
CREATE INDEX idx_rsvps_code ON invitation_rsvps(rsvp_code);

-- 4. TRIGGER UPDATE TIME
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_invitation_rsvps_modtime
    BEFORE UPDATE ON invitation_rsvps
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- Buat index agar pencarian kode secepat kilat