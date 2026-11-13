<?php

namespace Database\Seeders;

use App\Models\AboutUs\WarehouseGallery;
use Illuminate\Database\Seeder;

class WarehouseGallerySeeder extends Seeder
{
    public function run(): void
    {
        $images = [
            [
                'key' => 'exterior',
                'label' => 'Warehouse exterior',
                'image' => 'about-us/gallery/warehouse-side-a2.jpg',
                'grid_area' => 'exterior',
                'sort_order' => 1,
            ],
            [
                'key' => 'open-space',
                'label' => 'Open warehouse space',
                'image' => 'about-us/gallery/warehouse-interior-a1.jpg',
                'grid_area' => 'open-space',
                'sort_order' => 2,
            ],
            [
                'key' => 'loading-access',
                'label' => 'Covered loading access',
                'image' => 'about-us/gallery/covered-loading-a2.png',
                'grid_area' => 'loading-access',
                'sort_order' => 3,
            ],
            [
                'key' => 'loading-dock',
                'label' => 'Loading dock at dusk',
                'image' => 'about-us/gallery/warehouse-side-a1.jpg',
                'grid_area' => 'loading-dock',
                'sort_order' => 4,
            ],
            [
                'key' => 'interior',
                'label' => 'Warehouse interior',
                'image' => 'about-us/gallery/warehouse-interior-a2.png',
                'grid_area' => 'interior',
                'sort_order' => 5,
            ],
        ];

        foreach ($images as $image) {
            WarehouseGallery::updateOrCreate(['key' => $image['key']], $image);
        }
    }
}