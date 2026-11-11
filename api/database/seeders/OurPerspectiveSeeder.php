<?php

namespace Database\Seeders;

use App\Models\AboutUs\OurPerspective;
use Illuminate\Database\Seeder;

class OurPerspectiveSeeder extends Seeder
{
    public function run(): void
    {
        $perspective = [
            'key' => 'main',
            'eyebrow' => 'A perspective from our people',
            'title' => 'A message from Emily.',
            'quote' => 'Approved message to be supplied.',
            'author_name' => 'Emily Jackman',
            'author_role' => 'Owner',
            'initials' => 'EJ',
            'image' => null, // or 'about-us/emily-photo.jpg' if you have the image
        ];

        OurPerspective::updateOrCreate(['key' => $perspective['key']], $perspective);
    }
}