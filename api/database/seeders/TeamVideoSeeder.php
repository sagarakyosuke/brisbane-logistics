<?php

namespace Database\Seeders;

use App\Models\AboutUs\TeamVideo;
use Illuminate\Database\Seeder;

class TeamVideoSeeder extends Seeder
{
    public function run(): void
    {
        $videos = [
            [
                'key' => 'order-prep',
                'title' => 'Order preparation at work',
                'video_url' => null,
                'sort_order' => 1,
            ],
            [
                'key' => 'warehouse-ops',
                'title' => 'Inside daily warehouse operations',
                'video_url' => null,
                'sort_order' => 2,
            ],
        ];

        foreach ($videos as $video) {
            TeamVideo::updateOrCreate(['key' => $video['key']], $video);
        }
    }
}