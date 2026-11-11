<?php

namespace Database\Seeders;

use App\Models\Faqs\Faq;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    public function run(): void
    {
        $faqs = [
            [
                'category_id' => 'getting-to-know-us',
                'category_title' => 'Getting to know us',
                'category_desc' => 'Services and business fit',
                'icon_key' => 'business',
                'question' => 'What does Brisbane Logistics do?',
                'answer' => 'We provide third-party logistics in Brisbane: warehousing and pallet storage, pick and pack, e-commerce fulfilment, cross docking, container handling, and transport and distribution.',
            ],
            [
                'category_id' => 'getting-to-know-us',
                'category_title' => 'Getting to know us',
                'category_desc' => 'Services and business fit',
                'icon_key' => 'business',
                'question' => 'Do you work with small businesses?',
                'answer' => 'Yes. We work with businesses of different sizes, including small businesses and sole traders. Tell us about your stock and volumes and we will talk through what fits.',
            ],
            [
                'category_id' => 'getting-to-know-us',
                'category_title' => 'Getting to know us',
                'category_desc' => 'Services and business fit',
                'icon_key' => 'business',
                'question' => 'Are you connected with Kenter?',
                'answer' => 'Kenter International Logistics is our sister company. Kenter supports international freight, customs clearance and port transport, which can connect with our warehousing and distribution services.',
            ],
            [
                'category_id' => 'warehousing',
                'category_title' => 'Warehousing & storage',
                'category_desc' => 'Pallets and stock handling',
                'icon_key' => 'warehouse',
                'question' => 'Do you offer short-term and long-term storage?',
                'answer' => 'Yes. We offer both short-term and long-term warehouse storage, with flexible options for seasonal peaks, project work or ongoing requirements.',
            ],
            [
                'category_id' => 'warehousing',
                'category_title' => 'Warehousing & storage',
                'category_desc' => 'Pallets and stock handling',
                'icon_key' => 'warehouse',
                'question' => 'Can you help with seasonal or overflow stock?',
                'answer' => 'Yes. Short-term and overflow storage is available for seasonal stock, promotions or temporary overflow.',
            ],
            [
                'category_id' => 'pick-pack',
                'category_title' => 'Pick, pack & e-commerce',
                'category_desc' => 'Orders and fulfilment',
                'icon_key' => 'shopping_cart',
                'question' => 'Which e-commerce platforms can you work with?',
                'answer' => 'We work with platforms including Shopify, WooCommerce and Maropost Commerce Cloud. Integration requirements are confirmed for each business.',
            ],
            [
                'category_id' => 'pick-pack',
                'category_title' => 'Pick, pack & e-commerce',
                'category_desc' => 'Orders and fulfilment',
                'icon_key' => 'shopping_cart',
                'question' => 'What are your order cut-off times?',
                'answer' => 'Dispatch arrangements and cut-off times are confirmed for your operation during setup.',
            ],
            [
                'category_id' => 'delivery',
                'category_title' => 'Delivery planning & freight',
                'category_desc' => 'Local and national distribution',
                'icon_key' => 'local_shipping',
                'question' => 'Do you deliver locally and nationally?',
                'answer' => 'We offer local delivery options and coordinate national and international freight through our fleet and freight partner network.',
            ],
            [
                'category_id' => 'delivery',
                'category_title' => 'Delivery planning & freight',
                'category_desc' => 'Local and national distribution',
                'icon_key' => 'local_shipping',
                'question' => 'Can you handle urgent deliveries?',
                'answer' => 'Talk to us about time-critical freight. Availability depends on the freight, locations and timeframe.',
            ],
            [
                'category_id' => 'containers',
                'category_title' => 'Containers & cross-docking',
                'category_desc' => 'Unpacking and onward movement',
                'icon_key' => 'inventory',
                'question' => 'Do you unpack containers?',
                'answer' => 'Yes. We unpack containers, palletise goods, and can re-label and shrink wrap stock. Any visible damage is recorded with photos.',
            ],
            [
                'category_id' => 'containers',
                'category_title' => 'Containers & cross-docking',
                'category_desc' => 'Unpacking and onward movement',
                'icon_key' => 'inventory',
                'question' => 'What is cross docking?',
                'answer' => 'Cross docking moves incoming freight through sorting and onto outbound vehicles without long-term storage.',
            ],
            [
                'category_id' => 'systems',
                'category_title' => 'Systems & integrations',
                'category_desc' => 'Platforms and stock reporting',
                'icon_key' => 'settings',
                'question' => 'What warehouse management system do you use?',
                'answer' => 'We use CartonCloud as our warehouse management system to help manage stock, orders and reporting.',
            ],
            [
                'category_id' => 'systems',
                'category_title' => 'Systems & integrations',
                'category_desc' => 'Platforms and stock reporting',
                'icon_key' => 'settings',
                'question' => 'Can I see my stock levels?',
                'answer' => 'Talk to us about stock visibility and reporting. Reporting is set up to suit your business.',
            ],
            [
                'category_id' => 'quotes',
                'category_title' => 'Quotes & pricing',
                'category_desc' => 'Costs and requirements',
                'icon_key' => 'description',
                'question' => 'How do I get a quote?',
                'answer' => 'Use the Get a 3PL Quote button and tell us about your products, volumes and delivery requirements.',
            ],
            [
                'category_id' => 'quotes',
                'category_title' => 'Quotes & pricing',
                'category_desc' => 'Costs and requirements',
                'icon_key' => 'description',
                'question' => 'What affects the cost?',
                'answer' => 'Pricing depends on factors such as storage volume and duration, handling requirements, order volumes and delivery destinations.',
            ],
            [
                'category_id' => 'getting-started',
                'category_title' => 'Getting started & support',
                'category_desc' => 'Switching and contacting us',
                'icon_key' => 'headset',
                'question' => 'How do I switch to Brisbane Logistics from another provider?',
                'answer' => 'Start with a conversation about your current setup. We will agree the service scope, handling instructions and any platform connections before your stock moves.',
            ],
            [
                'category_id' => 'getting-started',
                'category_title' => 'Getting started & support',
                'category_desc' => 'Switching and contacting us',
                'icon_key' => 'headset',
                'question' => 'How do I contact the team?',
                'answer' => 'Call 07 3348 2100, email sales@brisbanelogistics.com.au, or use the Book a Call button.',
            ],
        ];

        foreach ($faqs as $faq) {
            Faq::updateOrCreate(
                ['category_id' => $faq['category_id'], 'question' => $faq['question']],
                $faq
            );
        }
    }
}