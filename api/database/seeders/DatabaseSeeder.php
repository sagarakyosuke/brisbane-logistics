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

        $seedCaseStudies    = false;
        $seedArticles       = false;
        $seedCompanyUpdates = false;
        $seedGuideTips      = false;
        $seedBrowseTopics   = true;

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
    }
}