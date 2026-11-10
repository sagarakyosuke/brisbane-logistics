<?php

namespace App\Models\CaseStudies;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CaseStudy extends Model
{
    protected $fillable = [
        'key', 'tag', 'title', 'description',
        'main_image', 'top_right_image', 'bottom_right_image',
        'category', 'status', 'icon_key', 'image', 'path',
    ];

    public function points(): HasMany
    {
        return $this->hasMany(CaseStudyPoint::class);
    }
}