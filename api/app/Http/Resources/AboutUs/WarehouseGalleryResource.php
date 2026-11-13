<?php

namespace App\Http\Resources\AboutUs;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WarehouseGalleryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'key' => $this->key,
            'label' => $this->label,
            'image' => $this->image ? asset('storage/' . $this->image) : null,
            'gridArea' => $this->grid_area,
        ];
    }
}