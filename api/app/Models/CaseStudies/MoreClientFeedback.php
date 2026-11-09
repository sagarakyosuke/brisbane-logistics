<?php

namespace App\Models\CaseStudies;

use Illuminate\Database\Eloquent\Model;

class MoreClientFeedback extends Model
{
    protected $table = 'more_client_feedbacks';

    protected $fillable = ['quote', 'author', 'tag'];
}