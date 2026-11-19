<?php

namespace Database\Seeders;

use App\Models\CaseStudies\CaseStudy;
use Illuminate\Database\Seeder;

class CaseStudyResultSeeder extends Seeder
{
    public function run(): void
    {
        $study = CaseStudy::where('key', 'urgent-delivery')
            ->firstOrFail();

        $study->result()->updateOrCreate(
            [
                'case_study_id' => $study->id,
            ],
            [
                'challenge_title' => 'The challenge',

                'challenge_description' =>
                    'The client needed fragile tile cases on site early the next morning after other providers were unable to complete the delivery. Each case weighed about 32 kilograms and needed careful handling and manual unloading.',

                'response_title' => 'Our response',

                'response_steps' => [
                    [
                        'title' => 'Dedicated vehicle and crew',
                        'desc' => 'A dedicated vehicle was arranged, with Andy and Mitch assigned to the delivery.',
                    ],
                    [
                        'title' => 'Secure collection',
                        'desc' => 'The freight was collected at about 6:30 am, checked, wrapped and securely strapped.',
                    ],
                    [
                        'title' => 'Careful site delivery',
                        'desc' => 'The team travelled into Brisbane CBD and unloaded the cases by hand at the project site.',
                    ],
                ],

                'result_eyebrow' => 'The result',

                'result_icon_key' => 'access_time',

                'result_title' => 'Around 2 hours early',

                'result_subtitle' =>
                    'Delivery completed at about 7:20 am.',

                'result_points' => [
                    'All cases arrived safely and intact.',
                    'The early arrival helped tradespeople begin work sooner.',
                ],
            ]
        );
    }
}
