<?php

namespace App\Models\NewsBlogs;

use Illuminate\Database\Eloquent\Model;

class GuideTips extends Model
{
    protected $fillable = [
        'key', 'eyebrow', 'title', 'desc',
        'icon_key', 'checklist', 'modal',
    ];

    protected $casts = [
        'checklist' => 'array',
        'modal' => 'array',
    ];
}