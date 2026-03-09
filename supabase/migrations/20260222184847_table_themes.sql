CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tabel Themes
CREATE TABLE themes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id INTEGER,
    slug VARCHAR(255) UNIQUE,
    name VARCHAR(255),
    description TEXT,
    styles TEXT,
    frame TEXT,
    is_premium BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    music_status BOOLEAN DEFAULT TRUE,
    version INTEGER DEFAULT 1,
    image_url TEXT,
    music_url TEXT,
    background_url TEXT,
    background_type VARCHAR(50) DEFAULT 'image',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);