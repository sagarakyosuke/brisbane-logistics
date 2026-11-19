<?php

namespace App\Models\CaseStudies;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CaseStudyResult extends Model
{
    protected $fillable = [
        'case_study_id',
        'challenge_title',
        'challenge_description',
        'response_title',
        'response_steps',
        'result_eyebrow',
        'result_icon_key',
        'result_title',
        'result_subtitle',
        'result_points',
    ];

    protected function casts(): array
    {
        return [
            'response_steps' => 'array',
            'result_points' => 'array',
        ];
    }

    public function caseStudy(): BelongsTo
    {
        return $this->belongsTo(CaseStudy::class);
    }
}