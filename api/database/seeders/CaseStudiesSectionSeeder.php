<?php

namespace Database\Seeders;

use App\Models\CaseStudies\CaseStudy;
use App\Models\CaseStudies\ClientFeedback;
use App\Models\CaseStudies\MoreClientFeedback;
use App\Models\CaseStudies\WhyClientValue;
use Illuminate\Database\Seeder;

class CaseStudiesSectionSeeder extends Seeder
{
    public function run(): void
    {
        /* ── 1. Case Studies ──────────────────────────────────────── */

        $featured = CaseStudy::updateOrCreate(
            ['id' => 'urgent-delivery'],
            [
                'tag' => 'Latest Case Study',
                'title' => 'Urgent delivery in Brisbane CBD.',
                'description' => 'An urgent Brisbane delivery, completed ahead of schedule.',
                'main_image' => 'case-studies/covered-loading-a2.png',
                'top_right_image' => 'case-studies/warehouse-interior-a1.jpg',
                'bottom_right_image' => 'case-studies/warehouse-interior-a2.png',
                'status' => 'published',
                'path' => '/case-studies/urgent-delivery',
            ]
        );

        // Clean up old points so we don't duplicate them on re-run
        $featured->points()->delete();
        
        $featured->points()->createMany([
            ['label' => 'Challenge', 'desc' => 'Fragile tile cases needed at a hotel project on short notice.', 'icon_key' => 'description'],
            ['label' => 'Approach', 'desc' => 'Dedicated vehicle, secured freight and careful manual unloading.', 'icon_key' => 'light_mode'],
            ['label' => 'Result', 'desc' => 'Around two hours early. All cases arrived safely and intact.', 'icon_key' => 'check_circle'],
        ]);

        CaseStudy::upsert([
            [
                'id' => 'container-handling',
                'category' => 'Container Handling',
                'title' => 'Case study coming soon',
                'description' => 'A client story about container handling will appear here once it is approved for publishing.',
                'status' => 'Placeholder',
                'icon_key' => 'inventory',
                'image' => 'case-studies/warehouse-side-a1.jpg',
                'path' => '#',
            ],
            [
                'id' => 'warehousing',
                'category' => 'Warehousing',
                'title' => 'Case study coming soon',
                'description' => 'A client story about warehousing will appear here once it is approved for publishing.',
                'status' => 'Placeholder',
                'icon_key' => 'warehouse',
                'image' => 'case-studies/warehouse-side-a2.jpg',
                'path' => '#',
            ],
            [
                'id' => 'ecommerce',
                'category' => 'E-commerce Fulfilment',
                'title' => 'Case study coming soon',
                'description' => 'A client story about e-commerce fulfilment will appear here once it is approved for publishing.',
                'status' => 'Placeholder',
                'icon_key' => 'shopping_cart',
                'image' => null,
                'path' => '#',
            ],
        ], ['id'], ['category', 'title', 'description', 'status', 'icon_key', 'image', 'path']);

        /* ── 2. Client Feedbacks (Carousel) ───────────────────────── */

        // Since these don't have unique string IDs, the cleanest way to prevent duplicates 
        // is to wipe the table and re-insert the fresh list.
        ClientFeedback::truncate();
        ClientFeedback::insert([
            ['quote' => 'We appreciate a team that listens, keeps us informed and helps us move forward.', 'meta' => 'Sample testimonial · E-commerce retailer', 'created_at' => now(), 'updated_at' => now()],
            ['quote' => 'Thank you for your support and attention to detail.', 'meta' => 'Sample testimonial · Warehousing client', 'created_at' => now(), 'updated_at' => now()],
            ['quote' => 'It is reassuring to know who to contact and what happens next.', 'meta' => 'Sample testimonial · Import & wholesale', 'created_at' => now(), 'updated_at' => now()],
            ['quote' => "We appreciate your team's practical support.", 'meta' => 'Sample testimonial · Small business', 'created_at' => now(), 'updated_at' => now()],
        ]);

        /* ── 3. More Client Feedbacks (Grid) ──────────────────────── */

        MoreClientFeedback::truncate();
        MoreClientFeedback::insert([
            ['quote' => 'Our orders go out on time and the team always lets us know if something needs our attention.', 'author' => 'Online homewares store', 'tag' => 'Pick & pack', 'created_at' => now(), 'updated_at' => now()],
            ['quote' => 'Having our containers unpacked and checked by the same team that stores our stock makes life easier.', 'author' => 'Importer and wholesaler', 'tag' => 'Container handling', 'created_at' => now(), 'updated_at' => now()],
            ['quote' => 'We needed extra space for a seasonal run and it was sorted quickly.', 'author' => 'Retail brand', 'tag' => 'Warehousing', 'created_at' => now(), 'updated_at' => now()],
            ['quote' => 'It is easy to reach someone who knows our account.', 'author' => 'Small business', 'tag' => 'Warehousing', 'created_at' => now(), 'updated_at' => now()],
            ['quote' => 'They helped us move from dropshipping to holding our own stock.', 'author' => 'Online store', 'tag' => 'E-commerce fulfilment', 'created_at' => now(), 'updated_at' => now()],
            ['quote' => 'A last-minute delivery was handled carefully and arrived in good shape.', 'author' => 'Construction supplier', 'tag' => 'Transport', 'created_at' => now(), 'updated_at' => now()],
        ]);

        /* ── 4. Why Clients Stay With Us ──────────────────────────── */

        WhyClientValue::upsert([
            ['id' => 'communication', 'title' => 'Direct communication', 'description' => 'You speak with the people who handle your stock, not a call centre.', 'icon_key' => 'chat'],
            ['id' => 'handling', 'title' => 'Careful handling', 'description' => 'Stock is checked, recorded and handled to your instructions.', 'icon_key' => 'verified_user'],
            ['id' => 'team', 'title' => 'A team you know by name', 'description' => 'The same small team supports your account day to day.', 'icon_key' => 'people'],
        ], ['id'], ['title', 'description', 'icon_key']);
    }
}