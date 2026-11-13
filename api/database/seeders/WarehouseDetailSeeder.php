<?php

namespace Database\Seeders;

use App\Models\AboutUs\WarehouseDetail;
use Illuminate\Database\Seeder;

class WarehouseDetailSeeder extends Seeder
{
    public function run(): void
    {
        $details = [
            [
                'key' => 'exterior',
                'title' => 'Warehouse exterior',
                'desc' => 'Modern facility with secure, fenced access and hardstand space.',
                'icon_key' => 'apartment',
                'sort_order' => 1,
            ],
            [
                'key' => 'open-space',
                'title' => 'Open warehouse space',
                'desc' => 'A modern, open layout for storage and handling.',
                'icon_key' => 'warehouse',
                'sort_order' => 2,
            ],
            [
                'key' => 'loading',
                'title' => 'Loading and access',
                'desc' => 'Roller doors and a covered loading area for receiving and dispatch.',
                'icon_key' => 'local_shipping',
                'sort_order' => 3,
            ],
        ];

        foreach ($details as $detail) {
            WarehouseDetail::updateOrCreate(['key' => $detail['key']], $detail);
        }
    }
}