<?php

namespace App\Http\Resources\Faqs;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UsefulGuideResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->key,
            'title' => $this->title,
            'desc' => $this->desc,
            'iconKey' => $this->icon_key,
            'path' => $this->path,
        ];
    }
}