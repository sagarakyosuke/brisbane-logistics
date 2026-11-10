<?php

namespace App\Models\CaseStudies;

use Illuminate\Database\Eloquent\Model;

class ClientFeedback extends Model
{
    protected $table = 'client_feedbacks';
    protected $fillable = ['quote', 'meta'];
}