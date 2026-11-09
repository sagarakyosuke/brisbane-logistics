<?php

namespace App\Http\Controllers\CaseStudies;

use App\Http\Controllers\Controller;
use App\Http\Resources\CaseStudies\CaseStudyResource;
use App\Http\Resources\CaseStudies\ClientFeedbackResource;
use App\Http\Resources\CaseStudies\MoreClientFeedbackResource;
use App\Http\Resources\CaseStudies\PreviousCaseStudyResource;
use App\Http\Resources\CaseStudies\TheResultResource;
use App\Models\CaseStudies\CaseStudy;
use App\Models\CaseStudies\ClientFeedback;
use App\Models\CaseStudies\MoreClientFeedback;
use Illuminate\Http\JsonResponse;

class CaseStudiesController extends Controller
{
    public function latestCaseStudies(): JsonResponse
    {
        $latest = CaseStudy::with('points')->where('status', 'published')->first();
        return response()->json([
            'latest' => $latest ? new CaseStudyResource($latest) : null,
        ]);
    }

    public function previousCaseStudies(): JsonResponse
    {
        $previous = CaseStudy::where('status', 'Placeholder')->get();
        return response()->json([
            'previous' => PreviousCaseStudyResource::collection($previous),
        ]);
    }

    public function theResult(): JsonResponse
    {
        $study = CaseStudy::with('points')->findOrFail('urgent-delivery');
        return response()->json(new TheResultResource($study));
    }

    public function clientFeedbacks(): JsonResponse
    {
        return response()->json([
            'feedbacks' => ClientFeedbackResource::collection(ClientFeedback::all()),
        ]);
    }

    public function moreClientFeedbacks(): JsonResponse
    {
        return response()->json([
            'feedbacks' => MoreClientFeedbackResource::collection(MoreClientFeedback::all()),
        ]);
    }
}