<?php

namespace App\Http\Controllers\NewsBlogs;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

/* ── Resources ────────────────────────────────────────────────────── */
use App\Http\Resources\NewsBlogs\ArticleResource;
use App\Http\Resources\NewsBlogs\BrowseTopicResource;
use App\Http\Resources\NewsBlogs\CompanyUpdatesResource;
use App\Http\Resources\NewsBlogs\GuideTipsResource;

/* ── Models ───────────────────────────────────────────────────────── */
use App\Models\NewsBlogs\Article;
use App\Models\NewsBlogs\BrowseTopic;
use App\Models\NewsBlogs\CompanyUpdates;
use App\Models\NewsBlogs\GuideTips;

class NewsBlogsController extends Controller
{
    public function articles(): JsonResponse
    {
        return response()->json([
            'articles' => ArticleResource::collection(Article::all()),
        ]);
    }

    public function companyUpdates(): JsonResponse
    {
        return response()->json([
            'updates' => CompanyUpdatesResource::collection(CompanyUpdates::all()),
        ]);
    }

    public function featuredGuide(): JsonResponse
    {        
        $guide = GuideTips::where('key', 'featured')->first();

        return response()->json([
            'guide' => $guide ? new GuideTipsResource($guide) : null,
        ]);
    }

    public function browseByTopic(): JsonResponse
    {
        // Return a title and the topics array
        return response()->json([
            'title' => 'Browse by topic',
            'topics' => BrowseTopicResource::collection(BrowseTopic::all()),
        ]);
    }
}