<?php

namespace Database\Seeders;

use App\Models\NewsBlogs\CompanyUpdates;
use Illuminate\Database\Seeder;

class CompanyUpdatesSeeder extends Seeder
{
    public function run(): void
    {
        $updates = [
            [
                'key' => 'team',
                'category' => 'Team',
                'title' => 'Meet the people behind your logistics',
                'desc' => 'Get to know the Brisbane Logistics team handling receiving, storage, order preparation and dispatch.',
                'link_label' => 'Meet the team',
                'link_path' => '/about/team',
                'image' => 'articles/warehouse-interior-a1.jpg',
                'icon_key' => 'groups',
            ],
            [
                'key' => 'case-study',
                'category' => 'Client story',
                'title' => 'Case study: an urgent Brisbane CBD delivery',
                'desc' => 'How a dedicated vehicle and careful handling supported a short-notice delivery of fragile tile cases.',
                'link_label' => 'Read the story',
                'link_path' => '/case-studies/urgent-delivery',
                'image' => 'articles/warehouse-side-a2.jpg',
                'icon_key' => 'local_shipping',
            ],
            [
                'key' => 'guide',
                'category' => 'Guides',
                'title' => 'New guide: preparing for a warehouse enquiry',
                'desc' => 'A practical checklist of the details to have ready before you talk to a 3PL provider.',
                'link_label' => 'Read the guide',
                'link_path' => '/news/guides',
                'image' => 'articles/warehouse-interior-a2.png',
                'icon_key' => 'menu_book',
            ],
        ];

        foreach ($updates as $update) {
            CompanyUpdates::updateOrCreate(['key' => $update['key']], $update);
        }
    }
}