<?php

namespace App\Models\AboutUs;

use Illuminate\Database\Eloquent\Model;

class WarehouseGallery extends Model
{
    protected $fillable = [
        'key', 'label', 'image', 'grid_area', 'sort_order',
    ];

    protected $casts = [
        'sort_order' => 'integer',
    ];
}