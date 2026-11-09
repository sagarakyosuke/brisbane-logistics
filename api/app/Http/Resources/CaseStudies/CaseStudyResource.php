<?php

namespace App\Http\Resources\CaseStudies;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CaseStudyResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'tag' => $this->tag,
            'title' => $this->title,
            'description' => $this->description,
            'path' => $this->path,
            'images' => [
                'main' => $this->main_image ? asset('storage/' . $this->main_image) : null,
                'topRight' => $this->top_right_image ? asset('storage/' . $this->top_right_image) : null,
                'bottomRight' => $this->bottom_right_image ? asset('storage/' . $this->bottom_right_image) : null,
            ],
            'points' => $this->points->map(fn($p) => [
                'id' => $p->id,
                'label' => $p->label,
                'desc' => $p->desc,
                'iconKey' => $p->icon_key,
            ]),
        ];
    }
}