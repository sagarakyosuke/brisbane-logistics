<?php

use App\Http\Controllers\AboutUs\AboutUsController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CaseStudies\CaseStudiesController;
use App\Http\Controllers\NewsBlogs\NewsBlogsController;
use App\Http\Controllers\Faqs\FaqsController;

/* =====================================================================
 * Case Studies API
 * ===================================================================== */

Route::prefix('case-studies')->group(function () {
    // ── Main Content ──
    Route::get('/latest-case-studies',   [CaseStudiesController::class, 'latestCaseStudies']);
    Route::get('/previous-case-studies', [CaseStudiesController::class, 'previousCaseStudies']);
    Route::get('/the-result',            [CaseStudiesController::class, 'theResult']);

    // ── Testimonials & Values ──
    Route::get('/client-feedbacks',         [CaseStudiesController::class, 'clientFeedbacks']);
    Route::get('/more-client-feedbacks',    [CaseStudiesController::class, 'moreClientFeedbacks']);
    Route::get('/why-clients-stay-with-us', [CaseStudiesController::class, 'whyClientsStayWithUs']);
});

/* =====================================================================
 * News & Blogs API
 * ===================================================================== */

Route::prefix('news-and-blogs')->group(function () {
    // ── News & Blogs ──
    Route::get('/articles',        [NewsBlogsController::class, 'articles']);
    Route::get('/company-updates', [NewsBlogsController::class, 'companyUpdates']);

    // ── Guides & Tips ──
    Route::get('/featured-guide',   [NewsBlogsController::class, 'featuredGuide']);
    Route::get('/browse-by-topic',  [NewsBlogsController::class, 'browseByTopic']);
    Route::get('/practical-guides', [NewsBlogsController::class, 'practicalGuides']);
});

/* =====================================================================
 * FAQs API
 * ===================================================================== */

Route::prefix('faqs')->group(function () {
    // ── FAQs ──
    Route::get('/what-do-you-need', [FaqsController::class, 'whatDoYouNeed']);

    // ── Useful Guides ──
    Route::get('/useful-guide',     [FaqsController::class, 'usefulGuide']);
});

/* =====================================================================
 * About Us API
 * ===================================================================== */

Route::prefix('about-us')->group(function () {
    // ── Overview ──
    Route::get('/overview', [AboutUsController::class, 'overview']);

    // ── What We Handle ──
    Route::get('/what-we-handle', [AboutUsController::class, 'whatWeHandle']);

    // ── Why Choose Us ──
    Route::get('/why-choose', [AboutUsController::class, 'whyChoose']);

    // ── Our Beginnings ──
    Route::get('/our-beginnings', [AboutUsController::class, 'ourBeginnings']);

    // ── Key Moments ──
    Route::get('/key-moments', [AboutUsController::class, 'keyMoments']);

    // ── Our Perspective ──
    Route::get('/our-perspective', [AboutUsController::class, 'ourPerspective']);
});