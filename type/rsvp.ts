export interface RSVP {
  id: string;
  invitation_id: string;
  name: string;
  group_name: string;
  phone: string;
  attendance: string;
  guest_count: number;
  comment: string;
  additional_data: JSON;
  is_attended: boolean;
  checkin_at: Date;
  is_read: string;
  rsvp_code: string;
  created_at: Date;
  updated_at: Date;
}

/**
 * Interface untuk pengaturan input dinamis RSVP Momenku
 */
export interface RSVPInputSetting {
  name: string;
  type: "text" | "phone" | "select" | "guest" | "textarea" | string;
  label: string;
  required: boolean;
  is_disabled: boolean;
  is_published: boolean;
  value?: string; // Digunakan untuk opsi select atau max guest
  showqr?: string; // Munculkan QR jika value ini terpilih (misal: "Hadir")
  showguest?: string; // Munculkan input jumlah tamu jika value ini terpilih
  placeholder?: string;
}

/**
 * Interface untuk konfigurasi global RSVP dalam satu undangan
 */
export interface RSVPSettings {
  custom_inputs?: RSVPInputSetting[];
  rsvp_status: number;
  inputs: RSVPInputSetting[];
  is_private: boolean;
  show_comments: boolean;
  show_download_qr: boolean;
  default_country_code: number;
  show_update_confirmation: boolean;
}

/**
 * Interface Utama untuk Response Data RSVP dari API Momenku
 */
export interface RSVPDataSetting {
  rsvp_settings: RSVPSettings;
}
