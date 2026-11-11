<?php

namespace App\Models\AboutUs;

use Illuminate\Database\Eloquent\Model;

class OurPerspective extends Model
{
    protected $fillable = [
        'key', 'eyebrow', 'title', 'quote',
        'author_name', 'author_role', 'initials', 'image',
    ];
}