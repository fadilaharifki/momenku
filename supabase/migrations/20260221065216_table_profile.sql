-- 1. Buat tabel profilnya dulu
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  phone_number text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Buat fungsi untuk handle copy data dari metadata ke tabel profiles
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, phone_number)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name',  -- Ambil dari metadata
    new.raw_user_meta_data->>'phone_number' -- Ambil dari metadata
  );
  return new;
end;
$$ language plpgsql security definer;

-- 3. Jalankan trigger ini setiap kali ada user baru yang SIGN UP
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();