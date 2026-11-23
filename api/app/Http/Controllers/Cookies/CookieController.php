<?php

namespace App\Http\Controllers\Cookies;

use App\Http\Controllers\Controller;
use App\Http\Resources\Cookies\CookieConsentResource;
use App\Services\CookiesService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CookieController extends Controller
{
    public function __construct(
        private readonly CookiesService $cookiesService
    ) {}

    /**
     * Retrieve the current visitor's consent.
     */
    public function show(Request $request): JsonResponse
    {
        $visitor = $this->cookiesService->resolveVisitor($request);

        $consent = $this->cookiesService->getConsent(
            $visitor['visitorId']
        );

        $response = response()->json([
            'hasConsent' => $consent !== null,
            'consent' => $consent
                ? new CookieConsentResource($consent)
                : null,
        ]);

        return $this->attachVisitorCookie($response, $visitor);
    }

    /**
     * Save visitor consent preferences.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'analytics' => ['required', 'boolean'],
            'marketing' => ['required', 'boolean'],
            'functional' => ['required', 'boolean'],
        ]);

        $visitor = $this->cookiesService->resolveVisitor($request);

        $consent = $this->cookiesService->saveConsent(
            $visitor['visitorId'],
            $validated
        );

        $response = response()->json([
            'message' => 'Cookie preferences saved successfully.',
            'hasConsent' => true,
            'consent' => new CookieConsentResource($consent),
        ]);

        return $this->attachVisitorCookie($response, $visitor);
    }

    /**
     * Update visitor consent preferences.
     */
    public function update(Request $request): JsonResponse
    {
        return $this->store($request);
    }

    /**
     * Withdraw optional cookie consent.
     */
    public function destroy(Request $request): JsonResponse
    {
        $visitor = $this->cookiesService->resolveVisitor($request);

        $consent = $this->cookiesService->withdrawConsent(
            $visitor['visitorId']
        );

        $response = response()->json([
            'message' => 'Optional cookie consent has been withdrawn.',
            'hasConsent' => true,
            'consent' => new CookieConsentResource($consent),
        ]);

        return $this->attachVisitorCookie($response, $visitor);
    }

    /**
     * Attach the visitor identification cookie when needed.
     */
    private function attachVisitorCookie(
        JsonResponse $response,
        array $visitor
    ): JsonResponse {
        if (!$visitor['shouldSetCookie']) {
            return $response;
        }

        return $response->withCookie(cookie(
            $this->cookiesService->getCookieName(),
            $visitor['visitorToken'],
            $this->cookiesService->getCookieLifetime(),
            '/',
            config('session.domain'),
            (bool) config('session.secure', false),
            true,
            false,
            config('session.same_site', 'lax')
        ));
    }
}