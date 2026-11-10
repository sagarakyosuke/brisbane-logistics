<?php

namespace Database\Seeders;

use App\Models\NewsBlogs\BrowseTopic;
use Illuminate\Database\Seeder;

class BrowseTopicSeeder extends Seeder
{
    public function run(): void
    {
        $topics = [
            [
                'key' => 'warehousing',
                'title' => 'Warehousing',
                'desc' => 'Receiving, storage and warehouse planning.',
                'icon_key' => 'warehouse',
                'path' => '/services/warehousing',
            ],
            [
                'key' => 'fulfilment',
                'title' => 'Fulfilment',
                'desc' => 'Picking, packing and order preparation.',
                'icon_key' => 'inventory',
                'path' => '/services/pick-and-pack',
            ],
            [
                'key' => 'systems',
                'title' => 'Systems & stock',
                'desc' => 'Stock visibility and integration questions.',
                'icon_key' => 'bar_chart',
                'path' => '/news/company',
            ],
            [
                'key' => 'freight',
                'title' => 'Freight & dispatch',
                'desc' => 'Preparing information for delivery planning.',
                'icon_key' => 'local_shipping',
                'path' => '/services/transport',
            ],
        ];

        foreach ($topics as $topic) {
            BrowseTopic::updateOrCreate(['key' => $topic['key']], $topic);
        }
    }
}