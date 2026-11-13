<?php

namespace App\Models\AboutUs;

use Illuminate\Database\Eloquent\Model;

class TeamVideo extends Model
{
    protected $fillable = [
        'key', 'title', 'video_url', 'sort_order',
    ];

    protected $casts = [
        'sort_order' => 'integer',
    ];
}