<?php

namespace Database\Seeders;

use App\Models\NewsBlogs\Article;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        $articles = [
            [
                'key' => 'wh',
                'slug' => 'what-do-warehousing-services-include',
                'category' => 'Warehousing',
                'title' => 'What do warehousing services include?',
                'description' => 'Receiving, storage, stock tracking and dispatch: what to compare when choosing a warehouse provider.',
                'content' => 'When evaluating a warehouse provider, it is crucial to look beyond just the square footage. A true 3PL partner handles the entire lifecycle of your stock. This includes seamless receiving (checking goods in and reporting discrepancies), optimized storage (maximizing space while keeping SKUs accessible), real-time stock tracking through a WMS, and efficient dispatch preparation. Ask potential providers about their reporting capabilities, how they handle damaged stock, and what their cut-off times are for same-day dispatch.',
                'image' => 'articles/warehouse-side-a2.jpg',
                'is_featured' => true,
            ],
            [
                'key' => 'peaks',
                'slug' => 'planning-stock-for-retail-peaks',
                'category' => 'Warehousing',
                'title' => 'Planning stock for retail peaks',
                'description' => 'How to forecast demand and prepare your inventory for busy periods.',
                'content' => 'Retail peaks like Black Friday or Christmas can make or break your year. Preparation starts months in advance. Work with your 3PL to forecast space requirements and labor needs. Ensure your inbound freight is scheduled well ahead of the rush to avoid port delays. Consider sending stock in stages rather than all at once, and make sure your packaging supplies are overstocked to handle the increased volume.',
                'image' => 'articles/warehouse-side-a2.jpg',
                'is_featured' => false,
            ],
            [
                'key' => '3pl',
                'slug' => 'what-to-consider-when-choosing-a-3pl',
                'category' => 'Fulfilment',
                'title' => 'What to consider when choosing a 3PL',
                'description' => 'Key factors to help you find the right 3PL partner for your business.',
                'content' => "Choosing a 3PL is a partnership. You need to consider their location relative to your suppliers and customers, their technology stack (do they integrate with your Shopify or WooCommerce store?), their pricing structure (transparent or hidden fees?), and their communication style. The cheapest option isn't always the best—reliability, accuracy, and a team that answers the phone when you have a crisis are often worth a premium.",
                'image' => 'articles/warehouse-side-a2.jpg',
                'is_featured' => false,
            ],
            [
                'key' => 'sys',
                'slug' => 'connecting-your-systems-with-warehouse-operations',
                'category' => 'Systems',
                'title' => 'Connecting your systems with warehouse operations',
                'description' => 'How the right systems and integrations can improve visibility and efficiency.',
                'content' => "The modern supply chain is built on data. Integrating your e-commerce platform or ERP with your 3PL's Warehouse Management System (WMS) means orders flow directly to the warehouse floor without manual data entry. This eliminates human error, speeds up fulfillment, and provides you with real-time visibility into your stock levels. At Brisbane Logistics, we use CartonCloud to ensure seamless integration and reporting.",
                'image' => 'articles/warehouse-side-a2.jpg',
                'is_featured' => false,
            ],
            [
                'key' => 'drop',
                'slug' => 'from-dropshipping-to-holding-your-own-stock',
                'category' => 'Fulfilment',
                'title' => 'From dropshipping to holding your own stock',
                'description' => 'Signs your online store is ready for a 3PL, and what changes when you make the move.',
                'content' => 'Dropshipping is a great way to start, but margins are often thin and quality control is out of your hands. If you are seeing consistent sales, frequent stockouts, or customer complaints about shipping times, it might be time to hold your own inventory. Moving to a 3PL allows you to buy in bulk (increasing margins), control the packaging experience, and offer faster shipping to your local customers.',
                'image' => 'articles/warehouse-side-a2.jpg',
                'is_featured' => false,
            ],
            [
                'key' => 'pallet',
                'slug' => 'pallet-storage-explained-for-small-businesses',
                'category' => 'Warehousing',
                'title' => 'Pallet storage explained for small businesses',
                'description' => 'How pallet storage works, what to ask, and how to estimate the space you need.',
                'content' => 'A standard pallet footprint is 1.2m x 1.0m. Most warehouses charge based on "pallet positions" per week. To estimate your needs, consider how many cartons fit on a pallet and how fast they sell. If you have slow-moving SKUs, you might need more storage space. If you turn over stock quickly, you might need less space but more handling (pick and pack) labor. Always ask if there are minimum monthly storage fees.',
                'image' => 'articles/warehouse-side-a2.jpg',
                'is_featured' => false,
            ],
            [
                'key' => 'freight',
                'slug' => 'what-rising-freight-costs-mean-for-small-businesses',
                'category' => 'Business Insights',
                'title' => 'What rising freight costs mean for small businesses',
                'description' => 'Practical ways to plan around changing freight costs without hurting your margins.',
                'content' => 'Freight costs are volatile. To protect your margins, consider consolidating shipments. Instead of sending small orders weekly, send a larger pallet load fortnightly. Optimize your packaging to reduce dimensional weight. Finally, communicate early with your freight partners—locking in rates and capacity ahead of peak seasons can save you from painful surcharges later.',
                'image' => 'articles/warehouse-side-a2.jpg',
                'is_featured' => false,
            ],
            [
                'key' => 'eoy',
                'slug' => 'planning-your-logistics-for-the-end-of-year-rush',
                'category' => 'Business Insights',
                'title' => 'Planning your logistics for the end-of-year rush',
                'description' => 'When to book space, how to prepare stock and what to agree with your 3PL before peak season.',
                'content' => "End-of-year planning should start in August. Book your warehouse space early. Confirm your carrier pickup schedules and public holiday cut-offs. Ensure your customer service team is aligned with the warehouse's dispatch times. The more you communicate with your 3PL, the smoother the peak season will be for your customers.",
                'image' => 'articles/warehouse-side-a2.jpg',
                'is_featured' => false,
            ],
            [
                'key' => 'cont',
                'slug' => 'preparing-paperwork-for-a-container-unpack',
                'category' => 'Systems',
                'title' => 'Preparing paperwork for a container unpack',
                'description' => 'The details your warehouse team needs before your container arrives.',
                'content' => "Before a container arrives, the warehouse needs a Packing List, Commercial Invoice, and clear instructions on how to handle the goods. Are there special requirements for unloading? Do you need palletizing? Are there multiple SKUs that need to be split? Providing clear paperwork in advance ensures the unpack is efficient and that you don't incur unnecessary detention fees.",
                'image' => 'articles/warehouse-side-a2.jpg',
                'is_featured' => false,
            ],
        ];

        foreach ($articles as $article) {
            Article::updateOrCreate(['key' => $article['key']], $article);
        }
    }
}