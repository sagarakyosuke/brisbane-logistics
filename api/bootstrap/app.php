
<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use App\Http\Middleware\EncryptApiData;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {

        // Enable Laravel Sanctum SPA authentication.
        $middleware->statefulApi();

        // Prevent API authentication redirects to a missing login route.
        $middleware->redirectGuestsTo(
            fn (Request $request) => null
        );

        // Run API encryption after Sanctum's stateful middleware.
        $middleware->api(
            append: [
                EncryptApiData::class,
            ],
        );

    })
    ->withExceptions(function (Exceptions $exceptions): void {

        // Always return JSON for API requests.
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) =>
                $request->is('api/*') || $request->expectsJson(),
        );

    })
    ->create();
