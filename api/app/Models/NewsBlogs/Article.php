<?php

namespace App\Models\NewsBlogs;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'slug', 'category', 'title', 'description',
        'content', 'image', 'is_featured',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
    ];
}