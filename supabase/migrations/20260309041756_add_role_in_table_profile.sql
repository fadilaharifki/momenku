CREATE TYPE user_role AS ENUM ('admin', 'user');

ALTER TABLE public.profiles 
ADD COLUMN role user_role DEFAULT 'user',
ADD COLUMN is_reseller BOOLEAN DEFAULT false;

CREATE OR REPLACE FUNCTION public.handle_user_sync()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, role, is_reseller)
  VALUES (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    'user', -- Default role untuk user baru
    false   -- Default status reseller untuk user baru
  )
  ON CONFLICT (id) DO UPDATE
  SET 
    full_name = excluded.full_name,
    avatar_url = excluded.avatar_url,
    email = excluded.email;
    -- ROLE dan IS_RESELLER sengaja tidak di-update di sini
    -- supaya status yang sudah kamu set manual di database tidak berubah.
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;