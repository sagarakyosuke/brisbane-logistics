<?php

namespace App\Models\Cookies;

use Illuminate\Database\Eloquent\Model;

class CookieConsent extends Model
{
    protected $fillable = [
        'visitor_id',
        'necessary',
        'analytics',
        'marketing',
        'functional',
        'consented_at',
        'expires_at',
    ];

    protected function casts(): array
    {
        return [
            'necessary' => 'boolean',
            'analytics' => 'boolean',
            'marketing' => 'boolean',
            'functional' => 'boolean',
            'consented_at' => 'datetime',
            'expires_at' => 'datetime',
        ];
    }
}