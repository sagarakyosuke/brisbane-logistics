<?php

namespace App\Exceptions;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use RuntimeException;
use Throwable;

class ErrorHandlerException extends RuntimeException
{
    /**
     * HTTP response status code.
     */
    protected int $statusCode;

    /**
     * Additional validation or error details.
     */
    protected array $errors;

    /**
     * Create a new exception instance.
     */
    public function __construct(
        string $message = 'An unexpected error occurred. Please try again later.',
        int $statusCode = Response::HTTP_INTERNAL_SERVER_ERROR,
        array $errors = [],
        ?Throwable $previous = null
    ) {
        parent::__construct($message, 0, $previous);

        $this->statusCode = $statusCode;
        $this->errors = $errors;
    }

    /**
     * Get the HTTP status code.
     */
    public function getStatusCode(): int
    {
        return $this->statusCode;
    }

    /**
     * Get additional error details.
     */
    public function getErrors(): array
    {
        return $this->errors;
    }

    /**
     * Render the exception as a JSON response.
     */
    public function render(Request $request): ?JsonResponse
    {
        if (!$request->is('api/*')) {
            return null;
        }

        $response = [
            'message' => $this->getMessage(),
        ];

        if (!empty($this->errors)) {
            $response['errors'] = $this->errors;
        }

        return response()->json(
            $response,
            $this->statusCode
        );
    }
}
