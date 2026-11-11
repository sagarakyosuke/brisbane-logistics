<?php

namespace App\Http\Resources\NewsBlogs;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PracticalGuidesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->slug,
            'question' => $this->question,
            'answer' => $this->answer,
        ];
    }
}