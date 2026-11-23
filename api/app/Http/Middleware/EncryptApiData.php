<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

/* ── Services ─────────────────────────────────────────────────────── */
use App\Services\ApiEncryptionService;

class EncryptApiData
{
    /**
     * Create a new middleware instance.
     */
    public function __construct(
        protected ApiEncryptionService $encryptionService
    ) {}

    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // 1. Skip cipher endpoints
        if ($this->isCipherEndpoint($request)) {
            return $next($request);
        }

        // 2. Decrypt incoming request payload
        if ($request->exists('payload')) {
            $decryptionError = $this->decryptRequest($request);

            if ($decryptionError !== null) {
                return $decryptionError;
            }
        }

        // 3. Process the request
        $response = $next($request);

        // 4. Encrypt successful JSON responses
        return $this->encryptResponse($response);
    }

    /* ── Request Helpers ──────────────────────────────────────────────── */

    /**
     * Check if the request is targeting a cipher endpoint.
     */
    private function isCipherEndpoint(Request $request): bool
    {
        return $request->is('api/cipher', 'api/cipher/*');
    }

    /**
     * Decrypt the incoming payload and replace the request data.
     * Returns a Response on failure, or null on success.
     */
    private function decryptRequest(Request $request): ?Response
    {
        $payload = $request->input('payload');

        if (!is_string($payload) || $payload === '') {
            return $this->errorResponse('Invalid encrypted payload.', 400);
        }

        try {
            $decrypted = $this->encryptionService->decrypt($payload);

            if ($decrypted === null || $decrypted === false) {
                return $this->errorResponse('Invalid encrypted payload.', 400);
            }

            $request->replace($this->normalizePayload($decrypted));

            return null; // Success

        } catch (Throwable $exception) {
            return $this->errorResponse('Unable to decrypt request payload.', 400);
        }
    }

    /* ── Response Helpers ─────────────────────────────────────────────── */


    /**
     * Encrypt successful JSON responses while preserving
     * the original response headers and cookies.
     */
    private function encryptResponse(Response $response): Response
    {
        if (!$this->isSuccessfulJsonResponse($response)) {
            return $response;
        }

        $content = $response->getContent();

        if ($content === '') {
            return $response;
        }

        $data = json_decode($content, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            return $response;
        }

        try {
            $encrypted = $this->encryptionService->encrypt($data);

            $response->setContent(json_encode(
                ['response' => $encrypted],
                JSON_THROW_ON_ERROR
            ));

            // Remove any stale content length after changing the body.
            $response->headers->remove('Content-Length');

            // Return the original response, preserving Set-Cookie
            // and all other existing headers.
            return $response;

        } catch (Throwable $exception) {
            return $this->errorResponse(
                'Unable to encrypt response payload.',
                500
            );
        }
    }


    /**
     * Determine if the response is a 2xx JSON response.
     */
    private function isSuccessfulJsonResponse(Response $response): bool
    {
        $statusCode = $response->getStatusCode();
        $contentType = $response->headers->get('Content-Type', '');

        return $statusCode >= 200
            && $statusCode < 300
            && str_contains($contentType, 'application/json');
    }

    /* ── Shared Helpers ───────────────────────────────────────────────── */

    /**
     * Ensure the decrypted payload is formatted as an array.
     */
    private function normalizePayload(mixed $decrypted): array
    {
        return is_array($decrypted) ? $decrypted : ['payload' => $decrypted];
    }

    /**
     * Generate a standard JSON error response.
     */
    private function errorResponse(string $message, int $statusCode): Response
    {
        return response()->json(['error' => $message], $statusCode);
    }
}