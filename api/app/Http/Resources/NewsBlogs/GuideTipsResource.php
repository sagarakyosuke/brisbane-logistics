<?php

namespace App\Http\Resources\NewsBlogs;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GuideTipsResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => (string) $this->id,
            'key' => $this->key,
            'eyebrow' => $this->eyebrow,
            'title' => $this->title,
            'desc' => $this->desc,
            'iconKey' => $this->icon_key,
            'checklist' => $this->checklist ?? [],
            'modal' => $this->modal,
        ];
    }
}