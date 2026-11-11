<?php

namespace Database\Seeders;

use App\Models\AboutUs\KeyMoment;
use Illuminate\Database\Seeder;

class KeyMomentSeeder extends Seeder
{
    public function run(): void
    {
        $moments = [
            [
                'key' => 'beginning',
                'title' => 'The beginning',
                'badge' => 'Details to be confirmed',
                'icon_key' => 'agriculture',
                'sort_order' => 1,
            ],
            [
                'key' => 'turning-point',
                'title' => 'A key turning point',
                'badge' => 'Details to be confirmed',
                'icon_key' => 'bar_chart',
                'sort_order' => 2,
            ],
            [
                'key' => 'next-chapter',
                'title' => 'The next chapter',
                'badge' => 'Details to be confirmed',
                'icon_key' => 'flag',
                'sort_order' => 3,
            ],
        ];

        foreach ($moments as $moment) {
            KeyMoment::updateOrCreate(['key' => $moment['key']], $moment);
        }
    }
}