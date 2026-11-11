<?php

namespace Database\Seeders;

use App\Models\AboutUs\WhatWeHandle;
use Illuminate\Database\Seeder;

class WhatWeHandleSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'key' => 'receiving',
                'title' => 'Receiving',
                'desc' => 'Containers, pallets and incoming goods.',
                'icon_key' => 'inventory',
                'sort_order' => 1,
            ],
            [
                'key' => 'storage',
                'title' => 'Storage',
                'desc' => 'Organised storage and stock records.',
                'icon_key' => 'warehouse',
                'sort_order' => 2,
            ],
            [
                'key' => 'pick-pack',
                'title' => 'Pick & pack',
                'desc' => 'Orders, kitting and dispatch preparation.',
                'icon_key' => 'outbox',
                'sort_order' => 3,
            ],
            [
                'key' => 'dispatch',
                'title' => 'Dispatch',
                'desc' => 'Freight and delivery requirements.',
                'icon_key' => 'local_shipping',
                'sort_order' => 4,
            ],
        ];

        foreach ($items as $item) {
            WhatWeHandle::updateOrCreate(['key' => $item['key']], $item);
        }
    }
}