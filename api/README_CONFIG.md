# 1. Migration
php artisan make:migration create_case_studies_section_tables

# 2. Models (in CaseStudies folder)
php artisan make:model CaseStudies/CaseStudy
php artisan make:model CaseStudies/CaseStudyPoint
php artisan make:model CaseStudies/ClientFeedback
php artisan make:model CaseStudies/MoreClientFeedback
php artisan make:model CaseStudies/WhyClientValue

# 3. Seeder
php artisan make:seeder CaseStudiesSectionSeeder

# 4. Register + Run
php artisan migrate:fresh --seed