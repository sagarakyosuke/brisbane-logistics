<?php

namespace App\Http\Controllers\AboutUs;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

/* ── Models ───────────────────────────────────────────────────────── */
use App\Models\AboutUs\Overview;
use App\Models\AboutUs\WhatWeHandle;
use App\Models\AboutUs\WhyChoose;
use App\Models\AboutUs\OurBeginning;
use App\Models\AboutUs\KeyMoment;
use App\Models\AboutUs\OurPerspective;

/* ── Resources ────────────────────────────────────────────────────── */
use App\Http\Resources\AboutUs\OverviewResource;
use App\Http\Resources\AboutUs\WhatWeHandleResource;
use App\Http\Resources\AboutUs\WhyChooseResource;
use App\Http\Resources\AboutUs\OurBeginningResource;
use App\Http\Resources\AboutUs\KeyMomentResource;
use App\Http\Resources\AboutUs\OurPerspectiveResource;
use App\Http\Resources\AboutUs\TeamMemberResource;
use App\Http\Resources\AboutUs\TeamVideoResource;
use App\Http\Resources\AboutUs\WarehouseDetailResource;
use App\Http\Resources\AboutUs\WarehouseGalleryResource;
use App\Models\AboutUs\TeamMember;
use App\Models\AboutUs\TeamVideo;
use App\Models\AboutUs\WarehouseDetail;
use App\Models\AboutUs\WarehouseGallery;

class AboutUsController extends Controller
{
    public function overview(): JsonResponse
    {
        $overview = Overview::where('key', 'main')->first();

        return response()->json([
            'overview' => $overview ? new OverviewResource($overview) : null,
        ]);
    }

    public function whatWeHandle(): JsonResponse
    {
        return response()->json([
            'eyebrow' => 'What we handle',
            'title' => 'From goods arriving to orders going out.',
            'items' => WhatWeHandleResource::collection(
                WhatWeHandle::orderBy('sort_order')->get()
            ),
        ]);
    }

    public function whyChoose(): JsonResponse
    {
        return response()->json([
            'eyebrow' => 'Why choose Brisbane Logistics',
            'title' => 'Our values, in practice.',
            'values' => WhyChooseResource::collection(
                WhyChoose::orderBy('sort_order')->get()
            ),
        ]);
    }

    public function ourBeginnings(): JsonResponse
    {
        return response()->json([
            'eyebrow' => 'Our beginnings',
            'title' => 'Where it began.',
            'description1' => 'Brisbane Logistics was founded to deliver practical, people-focused 3PL solutions for Australian businesses.',
            'description2' => "Our story is one of steady growth, strong partnerships and a commitment to looking after our clients' stock as if it were our own.",
            'badge' => 'Founding details to be confirmed',
            'values' => OurBeginningResource::collection(
                OurBeginning::orderBy('sort_order')->get()
            ),
        ]);
    }

    public function keyMoments(): JsonResponse
    {
        return response()->json([
            'eyebrow' => 'Key moments',
            'title' => 'The moments that shaped the business.',
            'subtitle' => 'A timeline of important milestones in the Brisbane Logistics story.',
            'moments' => KeyMomentResource::collection(
                KeyMoment::orderBy('sort_order')->get()
            ),
        ]);
    }

    public function ourPerspective(): JsonResponse
    {
        $perspective = OurPerspective::where('key', 'main')->first();

        return response()->json([
            'perspective' => $perspective ? new OurPerspectiveResource($perspective) : null,
        ]);
    }

    public function meetOurTeam(): JsonResponse
    {
        return response()->json([
            'eyebrow' => 'Meet our team',
            'title' => 'Meet your Brisbane Logistics team.',
            'members' => TeamMemberResource::collection(
                TeamMember::orderBy('sort_order')->get()
            ),
        ]);
    }

    public function seeTheTeam(): JsonResponse
    {
        return response()->json([
            'eyebrow' => 'See the team at work',
            'title' => 'A closer look at our people and operations.',
            'videos' => TeamVideoResource::collection(
                TeamVideo::orderBy('sort_order')->get()
            ),
        ]);
    }

    public function warehouseGalleries(): JsonResponse
    {
        return response()->json([
            'images' => WarehouseGalleryResource::collection(
                WarehouseGallery::orderBy('sort_order')->get()
            ),
        ]);
    }

    public function warehouseDetails(): JsonResponse
    {
        return response()->json([
            'details' => WarehouseDetailResource::collection(
                WarehouseDetail::orderBy('sort_order')->get()
            ),
        ]);
    }
}