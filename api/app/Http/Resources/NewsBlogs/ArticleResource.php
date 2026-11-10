<?php

namespace App\Http\Resources\NewsBlogs;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => (string) $this->id,
            'slug' => $this->slug,
            'category' => $this->category,
            'title' => $this->title,
            'description' => $this->description,
            'content' => $this->content,
            'image' => $this->image ? asset('storage/' . $this->image) : null,
            'isFeatured' => $this->is_featured,
        ];
    }
}