<?php

namespace App\Http\Resources\AboutUs;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WarehouseDetailResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'key' => $this->key,
            'title' => $this->title,
            'desc' => $this->desc,
            'iconKey' => $this->icon_key,
        ];
    }
}