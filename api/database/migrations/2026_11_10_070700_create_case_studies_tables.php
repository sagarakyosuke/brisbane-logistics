<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('case_studies', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->string('tag')->nullable();
            $table->string('title');
            $table->text('description');
            $table->string('main_image')->nullable();
            $table->string('top_right_image')->nullable();
            $table->string('bottom_right_image')->nullable();
            $table->string('category')->nullable();
            $table->string('status')->default('published');
            $table->string('icon_key')->nullable();
            $table->string('image')->nullable();
            $table->string('path')->nullable();
            $table->timestamps();
        });

        Schema::create('case_study_points', function (Blueprint $table) {
            $table->id();
            $table->foreignId('case_study_id')->constrained('case_studies')->cascadeOnDelete();
            $table->string('label');
            $table->text('desc');
            $table->string('icon_key');
            $table->timestamps();
        });

        Schema::create('client_feedbacks', function (Blueprint $table) {
            $table->id();
            $table->text('quote');
            $table->string('meta');
            $table->timestamps();
        });

        Schema::create('more_client_feedbacks', function (Blueprint $table) {
            $table->id();
            $table->text('quote');
            $table->string('author');
            $table->string('tag');
            $table->timestamps();
        });

        Schema::create('why_client_values', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->string('title');
            $table->text('description');
            $table->string('icon_key');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('why_client_values');
        Schema::dropIfExists('more_client_feedbacks');
        Schema::dropIfExists('client_feedbacks');
        Schema::dropIfExists('case_study_points');
        Schema::dropIfExists('case_studies');
    }
};