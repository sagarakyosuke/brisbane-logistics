<?php

namespace App\Http\Controllers\Security\Encryption;

use App\Http\Controllers\Controller;
use App\Services\ApiEncryptionService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Throwable;

class EncryptionController extends Controller
{
    public function __construct(
        protected ApiEncryptionService $encryptionService
    ) {
    }

    /*
    * Encrypt
    * -------------------------------------------------------------
    * Receives plain data and returns encrypted data.
    */

    public function encrypt(Request $request): JsonResponse
    {
        $payload = $request->input('payload');

        if ($payload === null || $payload === '') {
            return response()->json([
                'error' => 'Please provide a payload to encrypt.',
            ], 422);
        }

        try {
            $encrypted = $this->encryptionService->encrypt($payload);

            return response()->json([
                'encrypted_data' => $encrypted,
            ]);

        } catch (Throwable $exception) {
            return response()->json([
                'error' => 'Unable to encrypt payload.',
            ], 500);
        }
    }

    /*
    * Decrypt
    * -------------------------------------------------------------
    * Receives encrypted data and returns decrypted data.
    */

    public function decrypt(Request $request): JsonResponse
    {
        $payload = $request->input('payload');

        if (!is_string($payload) || $payload === '') {
            return response()->json([
                'error' => 'Please provide an encrypted payload to decrypt.',
            ], 422);
        }

        try {
            $decrypted = $this->encryptionService->decrypt($payload);

            if ($decrypted === null || $decrypted === false) {
                return response()->json([
                    'error' => 'Invalid encrypted payload.',
                ], 400);
            }

            return response()->json([
                'decrypted_data' => $decrypted,
            ]);

        } catch (Throwable $exception) {
            return response()->json([
                'error' => 'Unable to decrypt payload.',
            ], 400);
        }
    }
}
