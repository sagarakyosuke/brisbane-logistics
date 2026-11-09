<?php

namespace App\Http\Resources\CaseStudies;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TheResultResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'challenge' => [
                'title' => 'The challenge',
                'desc' => $this->description,
            ],
            'response' => [
                'title' => 'Our response',
                'steps' => $this->points->map(fn($p, $i) => [
                    'step' => (string) ($i + 1),
                    'title' => $p->label,
                    'desc' => $p->desc,
                ]),
            ],
            'result' => [
                'eyebrow' => 'The result',
                'iconKey' => 'access_time',
                'title' => 'Around 2 hours early',
                'subtitle' => 'Delivery completed at about 7:20 am.',
                'points' => [
                    'All cases arrived safely and intact.',
                    'The early arrival helped tradespeople begin work sooner.',
                ],
            ],
            'images' => [
                'main' => $this->main_image ? asset('storage/' . $this->main_image) : null,
                'topRight' => $this->top_right_image ? asset('storage/' . $this->top_right_image) : null,
                'bottomRight' => $this->bottom_right_image ? asset('storage/' . $this->bottom_right_image) : null,
            ],
        ];
    }
}