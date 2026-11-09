<?php

namespace App\Http\Resources\CaseStudies;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClientFeedbackResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'quote' => $this->quote,
            'meta' => $this->meta,
        ];
    }
}