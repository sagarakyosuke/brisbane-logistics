<?php

namespace App\Services;

use App\Models\Cookies\CookieConsent;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CookiesService
{
    private const COOKIE_NAME = 'bl_cookie_visitor';

    private const CONSENT_LIFETIME_DAYS = 180;

    /**
     * Resolve the visitor using their identification cookie.
     */
    public function resolveVisitor(Request $request): array
    {
        $visitorToken = $request->cookie(self::COOKIE_NAME);

        $isValidToken = is_string($visitorToken)
            && preg_match('/\A[A-Za-z0-9]{64}\z/', $visitorToken) === 1;

        $shouldSetCookie = !$isValidToken;

        if ($shouldSetCookie) {
            $visitorToken = Str::random(64);
        }

        return [
            'visitorToken' => $visitorToken,
            'visitorId' => hash('sha256', $visitorToken),
            'shouldSetCookie' => $shouldSetCookie,
        ];
    }

    /**
     * Retrieve valid consent preferences.
     */
    public function getConsent(string $visitorId): ?CookieConsent
    {
        return CookieConsent::query()
            ->where('visitor_id', $visitorId)
            ->where(function ($query) {
                $query->whereNull('expires_at')
                    ->orWhere('expires_at', '>', now());
            })
            ->first();
    }

    /**
     * Create or update visitor consent.
     */
    public function saveConsent(
        string $visitorId,
        array $preferences
    ): CookieConsent {
        return CookieConsent::updateOrCreate(
            ['visitor_id' => $visitorId],
            [
                'necessary' => true,
                'analytics' => $preferences['analytics'],
                'marketing' => $preferences['marketing'],
                'functional' => $preferences['functional'],
                'consented_at' => now(),
                'expires_at' => now()->addDays(
                    self::CONSENT_LIFETIME_DAYS
                ),
            ]
        );
    }

    /**
     * Withdraw optional cookie consent.
     */
    public function withdrawConsent(string $visitorId): CookieConsent
    {
        return $this->saveConsent($visitorId, [
            'analytics' => false,
            'marketing' => false,
            'functional' => false,
        ]);
    }

    public function getCookieName(): string
    {
        return self::COOKIE_NAME;
    }

    public function getCookieLifetime(): int
    {
        return self::CONSENT_LIFETIME_DAYS * 24 * 60;
    }
}