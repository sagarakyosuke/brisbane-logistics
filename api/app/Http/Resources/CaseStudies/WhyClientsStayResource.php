<?php

namespace App\Http\Resources\CaseStudies;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WhyClientsStayResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'eyebrow' => 'Why Clients Stay With Us',
            'title' => 'What sits behind the feedback.',
            'values' => collect($this->resource)->map(fn($v) => [
                'id' => $v->id,
                'title' => $v->title,
                'description' => $v->description,
                'iconKey' => $v->icon_key,
            ]),
            'cta' => [
                'title' => 'See the work behind the feedback',
                'description' => 'Read how we handle real logistics challenges.',
                'linkLabel' => 'View case studies',
                'linkHref' => '/case-studies',
                'iconKey' => 'description',
            ],
        ];
    }
}