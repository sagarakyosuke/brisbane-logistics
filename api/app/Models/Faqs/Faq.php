<?php

namespace App\Models\Faqs;

use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    protected $fillable = [
        'category_id', 'category_title', 'category_desc',
        'icon_key', 'question', 'answer',
    ];
}