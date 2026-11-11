<?php

namespace App\Models\AboutUs;

use Illuminate\Database\Eloquent\Model;

class KeyMoment extends Model
{
    protected $fillable = [
        'key', 'title', 'badge', 'icon_key', 'sort_order',
    ];

    protected $casts = [
        'sort_order' => 'integer',
    ];
}