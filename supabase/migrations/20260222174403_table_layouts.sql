-- Pastikan extension uuid-ossp aktif untuk generate uuid otomatis
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE layouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(100) NOT NULL,
    icon TEXT, 
    image VARCHAR(255),
    image_url TEXT,
    body TEXT,
    is_premium BOOLEAN DEFAULT FALSE, -- Pakai boolean lebih modern
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexing untuk performa sorting
CREATE INDEX idx_layouts_order ON layouts ("order");

-- Trigger untuk update 'updated_at' otomatis setiap ada perubahan data
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_layouts_updated_at
    BEFORE UPDATE ON layouts
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();