
<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AboutUs\AboutUsController;
use App\Http\Controllers\CaseStudies\CaseStudiesController;
use App\Http\Controllers\NewsBlogs\NewsBlogsController;
use App\Http\Controllers\Faqs\FaqsController;
use App\Http\Controllers\Security\Encryption\EncryptionController;
use App\Http\Middleware\EncryptApiData;

/*
*--------------------------------------------------------------------------
* Public APIs
*--------------------------------------------------------------------------
*/

Route::middleware([EncryptApiData::class])->group(function () {

    /*
    *--------------------------------------------------------------------------
    * Case Studies API
    *--------------------------------------------------------------------------
    */

    Route::prefix('case-studies')->group(function () {
        Route::get('/latest-case-studies', [CaseStudiesController::class, 'latestCaseStudies']);
        Route::get('/previous-case-studies', [CaseStudiesController::class, 'previousCaseStudies']);
        Route::get('/the-result', [CaseStudiesController::class, 'theResult']);
        Route::get('/client-feedbacks', [CaseStudiesController::class, 'clientFeedbacks']);
        Route::get('/more-client-feedbacks', [CaseStudiesController::class, 'moreClientFeedbacks']);
        Route::get('/why-clients-stay-with-us', [CaseStudiesController::class, 'whyClientsStayWithUs']);
    });

    /*
    *--------------------------------------------------------------------------
    * News & Blogs API
    *--------------------------------------------------------------------------
    */

    Route::prefix('news-and-blogs')->group(function () {
        Route::get('/articles', [NewsBlogsController::class, 'articles']);
        Route::get('/company-updates', [NewsBlogsController::class, 'companyUpdates']);
        Route::get('/featured-guide', [NewsBlogsController::class, 'featuredGuide']);
        Route::get('/browse-by-topic', [NewsBlogsController::class, 'browseByTopic']);
        Route::get('/practical-guides', [NewsBlogsController::class, 'practicalGuides']);
    });

    /*
    *--------------------------------------------------------------------------
    * FAQs API
    *--------------------------------------------------------------------------
    */

    Route::prefix('faqs')->group(function () {
        Route::get('/what-do-you-need', [FaqsController::class, 'whatDoYouNeed']);
        Route::get('/useful-guide', [FaqsController::class, 'usefulGuide']);
    });

    /*
    *--------------------------------------------------------------------------
    * About Us API
    *--------------------------------------------------------------------------
    */

    Route::prefix('about-us')->group(function () {
        Route::get('/overview', [AboutUsController::class, 'overview']);
        Route::get('/what-we-handle', [AboutUsController::class, 'whatWeHandle']);
        Route::get('/why-choose', [AboutUsController::class, 'whyChoose']);
        Route::get('/our-beginnings', [AboutUsController::class, 'ourBeginnings']);
        Route::get('/key-moments', [AboutUsController::class, 'keyMoments']);
        Route::get('/our-perspective', [AboutUsController::class, 'ourPerspective']);
        Route::get('/meet-our-team', [AboutUsController::class, 'meetOurTeam']);
        Route::get('/see-the-team', [AboutUsController::class, 'seeTheTeam']);
        Route::get('/warehouse-galleries', [AboutUsController::class, 'warehouseGalleries']);
        Route::get('/warehouse-details', [AboutUsController::class, 'warehouseDetails']);
    });


    /* =================================================================
    * API Encryption Testing
    * ================================================================= */

    Route::prefix('cipher')->group(function () {

        /*
        * Encrypt
        * -------------------------------------------------------------
        * Receives plain data and returns encrypted data.
        */

        Route::post('/encrypt', [EncryptionController::class, 'encrypt']);

        /*
        * Decrypt
        * -------------------------------------------------------------
        * Receives encrypted data and returns decrypted data.
        */

        Route::post('/decrypt', [EncryptionController::class, 'decrypt']);

    });

});
