<?php

namespace App\Models\NewsBlogs;

use Illuminate\Database\Eloquent\Model;

class CompanyUpdates extends Model
{
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id', 'category', 'title', 'desc',
        'link_label', 'link_path', 'image', 'icon_key',
    ];
}