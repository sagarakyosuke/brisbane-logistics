<?php

namespace App\Models\NewsBlogs;

use Illuminate\Database\Eloquent\Model;

class BrowseTopic extends Model
{
    protected $fillable = [
        'key', 'title', 'desc', 'icon_key', 'path',
    ];
}