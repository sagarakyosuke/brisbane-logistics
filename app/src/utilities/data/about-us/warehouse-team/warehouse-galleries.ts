import warehouseSideA1 from '@/assets/hero/warehouse-side-a1.jpg';
import warehouseSideA2 from '@/assets/hero/warehouse-side-a2.jpg';
import warehouseInteriorA1 from '@/assets/hero/warehouse-interior-a1.jpg';
import warehouseInteriorA2 from '@/assets/hero/warehouse-interior-a2.png';
import coveredLoadingA2 from '@/assets/hero/covered-loading-a2.png';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface GalleryImage {
  id: string;
  label: string;
  image: string;
  gridArea: string;
}

export interface WarehouseGalleriesData {
  images: GalleryImage[];
}

/* =====================================================================
 * Data
 * ===================================================================== */

export const warehouseGalleriesData: WarehouseGalleriesData = {
  images: [
    {
      id: 'exterior',
      label: 'Warehouse exterior',
      image: warehouseSideA2,
      gridArea: 'exterior',
    },
    {
      id: 'open-space',
      label: 'Open warehouse space',
      image: warehouseInteriorA1,
      gridArea: 'open-space',
    },
    {
      id: 'loading-access',
      label: 'Covered loading access',
      image: coveredLoadingA2,
      gridArea: 'loading-access',
    },
    {
      id: 'loading-dock',
      label: 'Loading dock at dusk',
      image: warehouseSideA1,
      gridArea: 'loading-dock',
    },
    {
      id: 'interior',
      label: 'Warehouse interior',
      image: warehouseInteriorA2,
      gridArea: 'interior',
    },
  ],
};
