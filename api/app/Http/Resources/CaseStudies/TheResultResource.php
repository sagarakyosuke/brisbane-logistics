<?php

namespace App\Http\Resources\CaseStudies;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TheResultResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $result = $this->result;

        return [
            'challenge' => [
                'title' => $result->challenge_title,
                'desc' => $result->challenge_description,
            ],

            'response' => [
                'title' => $result->response_title,
                'steps' => $this->points->values()->map(fn ($p, $i) => [
                    'step' => (string) ($i + 1),
                    'title' => $p->label,
                    'desc' => $p->desc,
                ]),
            ],

            'result' => [
                'eyebrow' => $result->result_eyebrow,
                'iconKey' => $result->result_icon_key,
                'title' => $result->result_title,
                'subtitle' => $result->result_subtitle,
                'points' => $result->result_points,
            ],

            'images' => [
                'main' => $this->main_image
                    ? asset('storage/' . $this->main_image)
                    : null,

                'topRight' => $this->top_right_image
                    ? asset('storage/' . $this->top_right_image)
                    : null,

                'bottomRight' => $this->bottom_right_image
                    ? asset('storage/' . $this->bottom_right_image)
                    : null,
            ],
        ];
    }
}
