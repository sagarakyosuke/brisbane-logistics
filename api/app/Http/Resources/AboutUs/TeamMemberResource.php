<?php

namespace App\Http\Resources\AboutUs;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeamMemberResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->key,
            'name' => $this->name,
            'role' => $this->role,
            'initials' => $this->initials,
            'color' => $this->color,
            'image' => $this->image ? asset('storage/' . $this->image) : null,
        ];
    }
}