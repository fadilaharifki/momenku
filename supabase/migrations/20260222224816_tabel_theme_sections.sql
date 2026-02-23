CREATE TABLE theme_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    theme_id UUID REFERENCES themes(id) ON DELETE CASCADE,
    title VARCHAR(255),
    icon TEXT, -- Menyimpan HTML icon atau class name
    body TEXT, -- Konten HTML template
    is_premium SMALLINT DEFAULT 0,
    image_url TEXT, -- Thumbnail preview untuk editor
    background_url TEXT DEFAULT '/images/no-image.jpg', -- BG default tema
    "order" INTEGER DEFAULT 0, -- Urutan default dalam tema ini
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);