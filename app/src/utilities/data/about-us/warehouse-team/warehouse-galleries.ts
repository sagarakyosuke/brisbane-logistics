export interface GalleryImage {
  id: number;
  key: string;
  label: string;
  image: string | null;
  gridArea: string;
}

export interface WarehouseGalleriesData {
  images: GalleryImage[];
}
