<?php

namespace App\Http\Resources\AboutUs;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class KeyMomentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->key,
            'title' => $this->title,
            'badge' => $this->badge,
            'iconKey' => $this->icon_key,
        ];
    }
}