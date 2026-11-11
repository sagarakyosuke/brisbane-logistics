<?php

namespace Database\Seeders;

use App\Models\AboutUs\Overview;
use Illuminate\Database\Seeder;

class OverviewSeeder extends Seeder
{
    public function run(): void
    {
        $overview = [
            'key' => 'main',
            'eyebrow' => 'Tailored warehousing and 3PL solutions',
            'title' => 'A partner that understands your business.',
            'description' => 'Every business is different. Our team works with you to understand your products, volumes and delivery requirements, then builds an arrangement that fits. From short-term needs to long-term growth, we provide flexible warehousing and 3PL services in Brisbane and South East Queensland.',
            'cta_label' => 'Explore our services',
            'cta_path' => '/services',
            'image' => 'about-us/warehouse-interior-a1.jpg',
            'image_alt' => 'Inside the Brisbane Logistics warehouse',
        ];

        Overview::updateOrCreate(['key' => $overview['key']], $overview);
    }
}