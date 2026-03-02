create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  phone_number text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create or replace function public.handle_user_sync()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do update
  set 
    full_name = excluded.full_name,
    avatar_url = excluded.avatar_url,
    email = excluded.email;
  return new;
end;
$$ language plpgsql security definer;
-- Hapus trigger lama jika ada
drop trigger if exists on_auth_user_created on auth.users;
drop trigger if exists on_auth_user_updated on auth.users;

-- Trigger saat user baru daftar
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_user_sync();

-- Trigger saat user login kembali (metadata update)
create trigger on_auth_user_updated
  after update on auth.users
  for each row 
  when (old.raw_user_meta_data is distinct from new.raw_user_meta_data)
  execute procedure public.handle_user_sync();