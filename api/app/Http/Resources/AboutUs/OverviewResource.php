<?php

namespace App\Http\Resources\AboutUs;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OverviewResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'eyebrow' => $this->eyebrow,
            'title' => $this->title,
            'description' => $this->description,
            'ctaLabel' => $this->cta_label,
            'ctaPath' => $this->cta_path,
            'image' => $this->image ? asset('storage/' . $this->image) : null,
            'imageAlt' => $this->image_alt,
        ];
    }
}