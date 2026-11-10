<?php

namespace App\Http\Controllers\NewsBlogs;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

/* ── Resources ────────────────────────────────────────────────────── */
use App\Http\Resources\NewsBlogs\ArticleResource;

/* ── Models ───────────────────────────────────────────────────────── */
use App\Models\NewsBlogs\Article;

class NewsBlogsController extends Controller
{
    public function articles(): JsonResponse
    {
        return response()->json([
            'articles' => ArticleResource::collection(Article::all()),
        ]);
    }
}