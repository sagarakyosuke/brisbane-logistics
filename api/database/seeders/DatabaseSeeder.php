<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        /* =====================================================================
         * Seed Configuration
         * Toggle true/false to choose which seeders run.
         * ===================================================================== */

        $seedCaseStudies     = false;
        $seedArticles        = false;
        $seedCompanyUpdates  = false;
        $seedGuideTips       = false;
        $seedBrowseTopics    = false;
        $seedPracticalGuides = false;
        $seedFaqs = false;
        $seedOverview = true;

        /* =====================================================================
         * Execution
         * ===================================================================== */

        if ($seedCaseStudies) {
            $this->call(CaseStudiesSectionSeeder::class);
        }

        if ($seedArticles) {
            $this->call(ArticleSeeder::class);
        }

        if ($seedCompanyUpdates) {
            $this->call(CompanyUpdatesSeeder::class);
        }

        if ($seedGuideTips) {
            $this->call(GuideTipsSeeder::class);
        }

        if ($seedBrowseTopics) {
            $this->call(BrowseTopicSeeder::class);
        }

        if ($seedPracticalGuides) {
            $this->call(PracticalGuidesSeeder::class);
        }

        if ($seedFaqs) {
            $this->call(FaqSeeder::class);
        }

        if ($seedOverview) {
            $this->call(OverviewSeeder::class);
        }
    }
}