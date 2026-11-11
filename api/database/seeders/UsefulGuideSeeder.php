<?php

namespace Database\Seeders;

use App\Models\Faqs\UsefulGuide;
use Illuminate\Database\Seeder;

class UsefulGuideSeeder extends Seeder
{
    public function run(): void
    {
        $guides = [
            [
                'key' => 'choosing-3pl',
                'title' => 'Choosing a 3PL partner',
                'desc' => 'Key considerations when comparing a 3PL for your business.',
                'icon_key' => 'description',
                'path' => '/news/guides',
            ],
            [
                'key' => 'cross-docking',
                'title' => 'Cross docking vs warehousing',
                'desc' => 'Understand the difference and when to use each.',
                'icon_key' => 'inventory',
                'path' => '/services/cross-docking',
            ],
            [
                'key' => 'ecommerce',
                'title' => 'E-commerce fulfilment',
                'desc' => 'How we support online stores from storage to delivery.',
                'icon_key' => 'shopping_cart',
                'path' => '/services/ecommerce',
            ],
        ];

        foreach ($guides as $guide) {
            UsefulGuide::updateOrCreate(['key' => $guide['key']], $guide);
        }
    }
}