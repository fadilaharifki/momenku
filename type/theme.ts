import { Category } from "./category";

export interface Theme {
  id: string;
  category_id: string;
  slug: string;
  name: string;
  description: string | null;
  styles: string | null;
  frame: string | null;
  is_premium: number;
  is_active: number;
  version: number;
  image_url: string | null;
  background_url: string | null;
  background_type: string;
  created_at: string;
  updated_at: string;
  category?: Category;
}
