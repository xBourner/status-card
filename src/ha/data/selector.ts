export interface SelectOption {
  value: any;
  label: string;
  description?: string;
  image?: string | SelectBoxOptionImage;
  disabled?: boolean;
}

interface SelectBoxOptionImage {
  src: string;
  src_dark?: string;
  flip_rtl?: boolean;
}
