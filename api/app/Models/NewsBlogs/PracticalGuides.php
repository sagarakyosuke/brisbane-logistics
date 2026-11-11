<?php

namespace App\Models\NewsBlogs;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PracticalGuides extends Model
{
    use HasFactory;

    protected $table = 'practical_guides_items';

    protected $fillable = [
        'slug',
        'question',
        'answer',
        'sort_order',
    ];

    protected $casts = [
        'sort_order' => 'integer',
    ];
}