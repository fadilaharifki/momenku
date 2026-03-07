CREATE TABLE musics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,               -- Nama Lagu (misal: Janji Suci)
    author TEXT,                       -- Penyanyi (optional)
    music_url TEXT NOT NULL,           -- Link Direct MP3 (dari Storage)
    created_at TIMESTAMPTZ DEFAULT NOW()
);