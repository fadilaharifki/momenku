CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE invitations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    theme_id UUID REFERENCES themes(id) ON DELETE SET NULL,
    domain VARCHAR(255) UNIQUE NOT NULL,
    is_active SMALLINT DEFAULT 1,
    heading VARCHAR(255),
    introduction TEXT,
    label VARCHAR(255),
    
    -- Images & Media
    cover_url TEXT,
    secondary_image_url TEXT,
    music VARCHAR(255),
    music_url TEXT,
    music_status BOOLEAN DEFAULT TRUE,
    music_type SMALLINT DEFAULT 0,
    music_embed TEXT,

    backgroud_url TEXT,
    custom_background_url TEXT,
    is_custom_background_url BOOLEAN DEFAULT FALSE,
    
    -- Event Info
    first_event_date DATE,
    first_event_start TIME,
    first_event_gmt VARCHAR(50),
    first_event_address TEXT,
    
    -- Customization
    custom_styles TEXT,
    custom_scripts TEXT,
    is_portfolio SMALLINT DEFAULT 0,
    is_favorite SMALLINT DEFAULT 0,
    is_watermark SMALLINT DEFAULT 1,
    
    -- Settings
    settings JSONB DEFAULT '{
        "rsvp_status": 1,
        "rsvp_settings": {
            "is_private": false,
            "show_comments": true,
            "inputs": []
        }
    }'::jsonb,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);