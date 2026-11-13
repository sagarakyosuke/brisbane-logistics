<?php

namespace App\Models\AboutUs;

use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    protected $fillable = [
        'key', 'name', 'role', 'initials', 'color', 'image', 'sort_order',
    ];

    protected $casts = [
        'sort_order' => 'integer',
    ];
}