ALTER TABLE theme_sections 
ADD COLUMN layout_id UUID REFERENCES layouts(id) ON DELETE SET NULL;