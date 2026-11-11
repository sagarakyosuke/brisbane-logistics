<?php

namespace Database\Seeders;

use App\Models\AboutUs\WhyChoose;
use Illuminate\Database\Seeder;

class WhyChooseSeeder extends Seeder
{
    public function run(): void
    {
        $values = [
            [
                'key' => 'communication',
                'title' => 'Direct communication',
                'desc' => 'You deal with people who understand your business.',
                'icon_key' => 'groups',
                'sort_order' => 1,
            ],
            [
                'key' => 'practical',
                'title' => 'Practical people, real solutions',
                'desc' => 'We focus on getting the job done safely and carefully.',
                'icon_key' => 'wb_sunny',
                'sort_order' => 2,
            ],
            [
                'key' => 'tracking',
                'title' => 'Tracking and accountability',
                'desc' => 'Clear information about your stock and orders.',
                'icon_key' => 'bar_chart',
                'sort_order' => 3,
            ],
            [
                'key' => 'care',
                'title' => 'Care with your stock',
                'desc' => 'Handled carefully, recorded properly and ready when you need it.',
                'icon_key' => 'shield',
                'sort_order' => 4,
            ],
        ];

        foreach ($values as $value) {
            WhyChoose::updateOrCreate(['key' => $value['key']], $value);
        }
    }
}