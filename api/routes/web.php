<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/invoke/csrf', function (\Illuminate\Http\Request $request) {
    return response()->json([
        'csrf_token' => $request->session()->token(),
    ]);
});