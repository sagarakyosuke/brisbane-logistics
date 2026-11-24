<?php

namespace App\Http\Controllers\Users;

use App\Exceptions\ErrorHandlerException;
use App\Http\Controllers\Controller;
use App\Http\Resources\Users\AuthenticationResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticationController extends Controller
{
    /**
     * Authenticate user.
     */
    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'username' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        $guard = Auth::guard('web');

        // Authenticate credentials.
        if (!$guard->attempt($validated)) {
            throw new ErrorHandlerException(
                'The provided credentials are incorrect.',
                Response::HTTP_UNAUTHORIZED
            );
        }

        // Regenerate session ID to prevent session fixation.
        $request->session()->regenerate();

        $user = $guard->user();

        return response()->json([
            'message' => 'Login successful.',
            'user' => new AuthenticationResource($user),
        ], Response::HTTP_OK);
    }

    /**
     * Retrieve authenticated user.
     */
    public function me(Request $request): JsonResponse
    {
        $user = $request->user();

        if (!$user) {
            throw new ErrorHandlerException(
                'Unauthenticated.',
                Response::HTTP_UNAUTHORIZED
            );
        }

        return response()->json([
            'message' => 'User information retrieved successfully.',
            'user' => new AuthenticationResource($user),
        ], Response::HTTP_OK);
    }

    /**
     * Logout authenticated user.
     */
    public function logout(Request $request): JsonResponse
    {
        // Logout authentication guard.
        Auth::guard('web')->logout();

        // Invalidate current session.
        $request->session()->invalidate();

        // Generate a new CSRF token.
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Logout successful.',
        ], Response::HTTP_OK);
    }
}
