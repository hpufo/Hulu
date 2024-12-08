export type Accent = {
  hue: number;
  classification: string;
};

export type Image = {
  path: string;
  accent: Accent;
  image_id: string;
};

export type Artwork = {
  _type: string;
  artwork_type: string;
  image: Image;
  text?: string;
};

export type ArtworkOrientation = {
  _type: string;
  horizontal_tile: Artwork;
  vertical_tile: Artwork;
  vertical_title?: Artwork;
};

export type BrandingArtwork = {
  path: string;
  accent: Accent;
  image_type: string;
  image_id: string;
};

export type PrimaryBranding = {
  id: string;
  name: string;
  artwork: {
    [key: string]: BrandingArtwork;
  };
};

export type Visuals = {
  artwork: ArtworkOrientation;
  headline: string;
  action_text: string;
  subtitle?: string;
  body: string;
  footer?: string;
  prompt?: string;
  primary_branding?: PrimaryBranding;
};

export type Rating = {
  code?: string;
};

export type EntityMetadata = {
  genre_names: string[];
  premiere_date: string;
  rating: Rating;
  series_description: string;
  entity_type: string;
  episode_text?: string;
  is_warm: boolean;
};

export type View = {
  _type: string;
  id: string;
  view_template: string;
  visuals: Visuals;
  entity_metadata: EntityMetadata;
};

export type CollectionComponent = {
  _type: string;
  id: string;
  href: string;
  name: string;
  theme: string;
  artwork: Record<string, unknown>;
  items: View[];
};

export type Item = {
  id: string;
  headline: string;
  series_description: string;
  hub_image: string;
  focused_image: string;
  premiere_date: string;
  genre: string[];
  rating: string;
  watermark: string;
  ref: HTMLElement | null;
};

export type Category = {
  category: string;
  colOffset: number;
  items: Item[];
  rowRef: HTMLElement | null;
};