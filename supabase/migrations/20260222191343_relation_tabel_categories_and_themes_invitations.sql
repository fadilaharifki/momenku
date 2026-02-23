-- Pastikan tabel themes punya category_id yang tipenya UUID
ALTER TABLE themes 
ALTER COLUMN category_id TYPE UUID USING (gen_random_uuid()); -- Atau sesuaikan jika sudah ada datanya

-- Tambahkan foreign key di themes ke categories
ALTER TABLE themes
ADD CONSTRAINT fk_themes_category
FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL;