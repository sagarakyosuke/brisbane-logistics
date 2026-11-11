<?php

namespace App\Models\Faqs;

use Illuminate\Database\Eloquent\Model;

class UsefulGuide extends Model
{
    protected $fillable = [
        'key', 'title', 'desc', 'icon_key', 'path',
    ];
}