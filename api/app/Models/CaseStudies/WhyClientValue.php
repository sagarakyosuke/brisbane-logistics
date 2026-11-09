<?php

namespace App\Models\CaseStudies;

use Illuminate\Database\Eloquent\Model;

class WhyClientValue extends Model
{
    protected $table = 'why_client_values';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['id', 'title', 'description', 'icon_key'];
}