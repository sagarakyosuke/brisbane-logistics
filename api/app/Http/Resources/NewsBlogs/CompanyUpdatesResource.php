<?php

namespace App\Http\Resources\NewsBlogs;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CompanyUpdatesResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'category' => $this->category,
            'title' => $this->title,
            'desc' => $this->desc,
            'linkLabel' => $this->link_label,
            'linkPath' => $this->link_path,
            'image' => $this->image ? asset('storage/' . $this->image) : null,
            'iconKey' => $this->icon_key,
        ];
    }
}