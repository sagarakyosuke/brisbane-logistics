<?php

namespace App\Models\CaseStudies;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CaseStudyPoint extends Model
{
    protected $fillable = ['case_study_id', 'label', 'desc', 'icon_key'];

    public function caseStudy(): BelongsTo
    {
        return $this->belongsTo(CaseStudy::class);
    }
}