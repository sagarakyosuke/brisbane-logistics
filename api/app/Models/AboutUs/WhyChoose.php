<?php

namespace App\Models\AboutUs;

use Illuminate\Database\Eloquent\Model;

class WhyChoose extends Model
{
    protected $fillable = [
        'key', 'title', 'desc', 'icon_key', 'sort_order',
    ];

    protected $casts = [
        'sort_order' => 'integer',
    ];
}