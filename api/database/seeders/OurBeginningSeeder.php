<?php

namespace Database\Seeders;

use App\Models\AboutUs\OurBeginning;
use Illuminate\Database\Seeder;

class OurBeginningSeeder extends Seeder
{
    public function run(): void
    {
        $values = [
            [
                'key' => 'relationships',
                'title' => 'Relationships first',
                'desc' => 'Most of our work comes from long-standing client relationships, built one conversation at a time.',
                'icon_key' => 'handshake',
                'sort_order' => 1,
            ],
            [
                'key' => 'team',
                'title' => 'A team you know by name',
                'desc' => 'Clients talk to the same people who handle their stock every day.',
                'icon_key' => 'groups',
                'sort_order' => 2,
            ],
            [
                'key' => 'growth',
                'title' => 'Growing with our clients',
                'desc' => 'As our clients have grown, so has the range of services we offer.',
                'icon_key' => 'agriculture',
                'sort_order' => 3,
            ],
        ];

        foreach ($values as $value) {
            OurBeginning::updateOrCreate(['key' => $value['key']], $value);
        }
    }
}