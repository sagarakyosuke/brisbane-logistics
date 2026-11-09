<?php

namespace App\Http\Resources\CaseStudies;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PreviousCaseStudyResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'category' => $this->category,
            'title' => $this->title,
            'description' => $this->description,
            'status' => $this->status,
            'iconKey' => $this->icon_key,
            'image' => $this->image ? asset('storage/' . $this->image) : null,
            'path' => $this->path,
        ];
    }
}