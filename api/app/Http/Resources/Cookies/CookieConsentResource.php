<?php

namespace App\Http\Resources\Cookies;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CookieConsentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'preferences' => [
                'necessary' => $this->necessary,
                'analytics' => $this->analytics,
                'marketing' => $this->marketing,
                'functional' => $this->functional,
            ],

            'consentedAt' => $this->consented_at?->toISOString(),

            'expiresAt' => $this->expires_at?->toISOString(),
        ];
    }
}