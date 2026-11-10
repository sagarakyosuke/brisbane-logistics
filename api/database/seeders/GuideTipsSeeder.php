<?php

namespace Database\Seeders;

use App\Models\NewsBlogs\GuideTips;
use Illuminate\Database\Seeder;

class GuideTipsSeeder extends Seeder
{
    public function run(): void
    {
        $guide = [
            'key' => 'featured',
            'eyebrow' => 'Featured guide',
            'title' => 'Choosing a warehouse partner?',
            'desc' => 'Use these questions to prepare for your next provider conversation. Tick them off as you go.',
            'icon_key' => 'menu_book',
            'checklist' => [
                'What products am I storing, and do any need special handling?',
                'Roughly how many pallets or cartons do I hold, and how does that change across the year?',
                'How do my orders arrive today, and what system do they come from?',
                'Where do my customers or delivery locations sit: local, interstate or overseas?',
                'What reporting do I need on stock levels and dispatched orders?',
                'When do I need the new arrangement to start?',
            ],
            'modal' => [
                'step' => 'Step 1 of 3',
                'title' => 'What do you need help with?',
                'subtitle' => 'Choose as many as you like.',
                'services' => [
                    ['id' => 'warehousing', 'label' => 'Warehousing', 'iconKey' => 'warehouse'],
                    ['id' => 'pick-pack', 'label' => 'Pick & Pack', 'iconKey' => 'inventory'],
                    ['id' => 'cross-docking', 'label' => 'Cross Docking', 'iconKey' => 'sync_alt'],
                    ['id' => 'ecommerce', 'label' => 'E-Commerce Fulfilment', 'iconKey' => 'laptop'],
                    ['id' => 'transport', 'label' => 'Transport & Distribution', 'iconKey' => 'local_shipping'],
                    ['id' => 'container', 'label' => 'Container Handling', 'iconKey' => 'outbox'],
                    ['id' => 'unsure', 'label' => 'Not sure yet', 'iconKey' => 'chat_bubble_outline'],
                ],
            ],
        ];

        GuideTips::updateOrCreate(['key' => $guide['key']], $guide);
    }
}