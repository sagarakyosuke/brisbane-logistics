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

        $seedUser               = true;
        $seedCaseStudies        = false;
        $seedArticles           = false;
        $seedCompanyUpdates     = false;
        $seedGuideTips          = false;
        $seedBrowseTopics       = false;
        $seedPracticalGuides    = false;
        $seedFaqs               = false;
        $seedOverview           = false;
        $seedOurPerspective     = false;
        $seedOurBeginnings      = false;
        $seedKeyMoments         = false;
        $seedTeamMembers        = false;
        $seedTeamVideos         = false;
        $seedWarehouseGalleries = false;
        $seedCaseStudyResults   = false;


        /* =====================================================================
         * Fresh Seeder
         * ===================================================================== */

        // $seedUser               = true;
        // $seedCaseStudies        = true;
        // $seedArticles           = true;
        // $seedCompanyUpdates     = true;
        // $seedGuideTips          = true;
        // $seedBrowseTopics       = true;
        // $seedPracticalGuides    = true;
        // $seedFaqs               = true;
        // $seedOverview           = true;
        // $seedOurPerspective     = true;
        // $seedOurBeginnings      = true;
        // $seedKeyMoments         = true;
        // $seedTeamMembers        = true;
        // $seedTeamVideos         = true;
        // $seedWarehouseGalleries = true;
        // $seedCaseStudyResults   = true;


        /* =====================================================================
         * Execution
         * ===================================================================== */

        if ($seedUser) {
            $this->call(UserSeeder::class);
        }

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

        if ($seedOurPerspective) {
            $this->call(OurPerspectiveSeeder::class);
        }

        if ($seedOurBeginnings) {
            $this->call(OurBeginningSeeder::class);
        }

        if ($seedKeyMoments) {
            $this->call(KeyMomentSeeder::class);
        }

        if ($seedTeamMembers) {
            $this->call(TeamMemberSeeder::class);
        }

        if ($seedTeamVideos) {
            $this->call(TeamVideoSeeder::class);
        }

        if ($seedWarehouseGalleries) {
            $this->call(WarehouseGallerySeeder::class);
        }

        if ($seedCaseStudyResults) {
            $this->call(CaseStudyResultSeeder::class);
        }
    }
}
