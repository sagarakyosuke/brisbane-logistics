<?php

namespace App\Http\Resources\CaseStudies;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WhyClientsStayResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => (string) $this->id,
            'key' => $this->key,
            'title' => $this->title,
            'description' => $this->description,
            'iconKey' => $this->icon_key,
        ];
    }
}