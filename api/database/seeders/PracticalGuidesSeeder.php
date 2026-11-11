<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\NewsBlogs\PracticalGuides;

class PracticalGuidesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = [
            [
                'slug' => 'warehouse-enquiry',
                'question' => 'What information should I prepare for a warehouse enquiry?',
                'answer' => 'Have your product types and sizes, an estimate of pallet or carton numbers, how long you need storage, how orders reach you, and where your deliveries go. Photos of your stock and current packaging also help our team understand your handling needs.',
                'sort_order' => 1,
            ],
            [
                'slug' => 'stock-reporting',
                'question' => 'What should I ask about stock reporting?',
                'answer' => 'Ask how stock is recorded on arrival, how you can see current stock levels, what reports are available, and how discrepancies are raised. We use CartonCloud as our warehouse management system, and reporting is set up to suit your business.',
                'sort_order' => 2,
            ],
            [
                'slug' => 'before-dispatch',
                'question' => 'What should I check before dispatch?',
                'answer' => 'Confirm your carrier preferences, delivery addresses and timeframes, any packaging or labelling requirements, and the dispatch cut-off times agreed for your operation.',
                'sort_order' => 3,
            ],
        ];

        foreach ($items as $item) {
            PracticalGuides::updateOrCreate(
                ['slug' => $item['slug']],
                $item
            );
        }
    }
}