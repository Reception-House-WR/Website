export interface ImageSize {
  url: string;
  width: number;
  height: number;
}

export interface Image {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: ImageSize;
    small?: ImageSize;
    medium?: ImageSize;
    large?: ImageSize;
  };
  url: string;
}


export interface StrapiImageResponse {
  url: string;
  alternativeText: string | null;
  caption: string | null;
}