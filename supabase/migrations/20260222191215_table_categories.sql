CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    heading VARCHAR(255),
    introduction TEXT,
    hope TEXT,
    closure TEXT,
    meta_title VARCHAR(255),
    meta_description TEXT,
    message_template TEXT,
    image VARCHAR(255),
    image_url TEXT,
    type VARCHAR(50) DEFAULT 'theme', 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);