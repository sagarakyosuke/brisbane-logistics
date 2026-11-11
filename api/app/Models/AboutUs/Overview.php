<?php

namespace App\Models\AboutUs;

use Illuminate\Database\Eloquent\Model;

class Overview extends Model
{
    protected $fillable = [
        'key', 'eyebrow', 'title', 'description',
        'cta_label', 'cta_path', 'image', 'image_alt',
    ];
}