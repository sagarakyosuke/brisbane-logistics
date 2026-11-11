<?php

namespace App\Http\Resources\AboutUs;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OurPerspectiveResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'eyebrow' => $this->eyebrow,
            'title' => $this->title,
            'quote' => $this->quote,
            'authorName' => $this->author_name,
            'authorRole' => $this->author_role,
            'initials' => $this->initials,
            'image' => $this->image ? asset('storage/' . $this->image) : null,
        ];
    }
}