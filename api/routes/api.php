<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CaseStudies\CaseStudiesController;

/* =====================================================================
 * Case Studies API
 * ===================================================================== */

Route::prefix('case-studies')->group(function () {
    // ── Main Content ──
    Route::get('/latest-case-studies', [CaseStudiesController::class, 'latestCaseStudies']);
    Route::get('/previous-case-studies', [CaseStudiesController::class, 'previousCaseStudies']);
    Route::get('/the-result', [CaseStudiesController::class, 'theResult']);

    // ── Testimonials & Values ──
    Route::get('/client-feedbacks', [CaseStudiesController::class, 'clientFeedbacks']);
    Route::get('/more-client-feedbacks', [CaseStudiesController::class, 'moreClientFeedbacks']);
    Route::get('/why-clients-stay-with-us', [CaseStudiesController::class, 'whyClientsStayWithUs']);
});