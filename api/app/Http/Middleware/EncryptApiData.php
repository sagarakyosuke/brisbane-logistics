<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Services\ApiEncryptionService;

class EncryptApiData
{
    protected ApiEncryptionService $encryptionService;

    public function __construct(ApiEncryptionService $encryptionService)
    {
        $this->encryptionService = $encryptionService;
    }

    public function handle(Request $request, Closure $next): Response
    {
        if ($request->is('api/cipher')) {
            return $next($request);
        }

        // 1. Decrypt incoming Request Payload (if present)
        if ($request->has('payload')) {
            $decrypted = $this->encryptionService->decrypt($request->input('payload'));
            
            if ($decrypted) {
                $request->replace($decrypted);
            } else {
                return response()->json(['error' => 'Invalid encrypted payload'], 400);
            }
        }

        // 2. Get the Response from the Controller
        $response = $next($request);

        // 3. Encrypt the Response Payload
        if ($response->getStatusCode() < 400) {
            $content = $response->getContent();
            
            if (!empty($content)) {
                $data = json_decode($content, true);
                
                if (json_last_error() === JSON_ERROR_NONE) {
                    $encrypted = $this->encryptionService->encrypt($data);
                    return response()->json(['response' => $encrypted]);
                }
            }
        }

        return $response;
    }
}