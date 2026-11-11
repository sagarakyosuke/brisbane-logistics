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
    }

    public function down(): void
    {
        Schema::dropIfExists('case_studies');
    }
};