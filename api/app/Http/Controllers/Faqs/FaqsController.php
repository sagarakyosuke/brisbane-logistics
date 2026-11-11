<?php

namespace App\Http\Controllers\Faqs;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

/* ── Models ───────────────────────────────────────────────────────── */
use App\Models\Faqs\Faq;
use App\Models\Faqs\UsefulGuide;

/* ── Resources ────────────────────────────────────────────────────── */
use App\Http\Resources\Faqs\UsefulGuideResource;

class FaqsController extends Controller
{
    public function whatDoYouNeed(): JsonResponse
    {
        $faqs = Faq::all();

        $topics = $faqs->groupBy('category_id')->map(function ($group) {
            $first = $group->first();

            return [
                'id' => $first->category_id,
                'title' => $first->category_title,
                'desc' => $first->category_desc,
                'iconKey' => $first->icon_key,
                'questions' => $group->map(function ($item) {
                    return [
                        'question' => $item->question,
                        'answer' => $item->answer,
                    ];
                })->values(),
            ];
        })->values();

        return response()->json([
            'title' => 'What do you need answers about?',
            'subtitle' => 'Eight topics. Pick one or search above.',
            'topics' => $topics,
        ]);
    }

    public function usefulGuide(): JsonResponse
    {
        return response()->json([
            'eyebrow' => 'Useful guides',
            'title' => 'A little more detail, if you need it.',
            'guides' => UsefulGuideResource::collection(UsefulGuide::all()),
        ]);
    }
}