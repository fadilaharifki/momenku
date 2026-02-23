import { Theme } from "./theme"; // Pastikan kamu punya interface Theme

export interface InvitationSection {
  id: string;
  invitation_id: string;
  layout_id: string | null;
  title: string;
  icon: string | null;
  body: string;
  background_url: string | null;
  image_url: string | null;
  order: number;
  is_active: number;
  is_premium: number;
  content: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Invitation {
  id: string;
  user_id: string;
  theme_id: string | null;
  domain: string;
  is_active: number;

  // Content Info
  heading: string | null;
  introduction: string | null;
  label: string | null;

  // Images & Media
  cover_url: string | null;
  secondary_image_url: string | null;
  music: string | null;
  music_url: string | null;
  music_status: number;
  music_type: number;
  music_embed: string | null;

  // Event Info
  first_event_date: string | null;
  first_event_start: string | null;
  first_event_gmt: string | null;
  first_event_address: string | null;

  // Customization
  custom_styles: string | null;
  custom_scripts: string | null;
  is_portfolio: number;
  is_favorite: number;
  is_watermark: number;

  // Settings
  settings: {
    rsvp_status: number;
    rsvp_settings: {
      is_private: boolean;
      show_comments: boolean;
      inputs: any[];
    };
  };

  // Timestamps
  created_at: Date | string;
  updated_at: Date | string;

  theme?: Theme;
  sections?: InvitationSection[];
}
