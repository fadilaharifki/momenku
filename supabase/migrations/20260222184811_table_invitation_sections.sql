CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE invitation_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invitation_id UUID NOT NULL REFERENCES invitations(id) ON DELETE CASCADE,
    layout_id UUID REFERENCES layouts(id) ON DELETE SET NULL, 
    
    title VARCHAR(255),
    icon TEXT,
    body TEXT,
    background_url TEXT DEFAULT '/images/no-image.jpg',
    image_url TEXT DEFAULT '/images/no-image.jpg',
    "order" INTEGER DEFAULT 1,
    is_active SMALLINT DEFAULT 1,
    is_premium SMALLINT DEFAULT 0,
    
    content JSONB DEFAULT '{}'::jsonb, 
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_invitation_sections_invitation_id ON invitation_sections(invitation_id);
CREATE INDEX idx_invitation_sections_order ON invitation_sections("order");