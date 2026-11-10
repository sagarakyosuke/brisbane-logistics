<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->string('slug')->unique();
            $table->string('category');
            $table->string('title');
            $table->text('description');
            $table->longText('content');
            $table->string('image')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });

        Schema::create('company_updates', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->string('category');
            $table->string('title');
            $table->text('desc');
            $table->string('link_label');
            $table->string('link_path');
            $table->string('image')->nullable();
            $table->string('icon_key');
            $table->timestamps();
        });

        Schema::create('guide_tips', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->string('eyebrow');
            $table->string('title');
            $table->text('desc');
            $table->string('icon_key');
            $table->json('checklist');
            $table->json('modal');
            $table->timestamps();
        });

        Schema::create('browse_topics', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->string('title');
            $table->text('desc');
            $table->string('icon_key');
            $table->string('path');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('browse_topics');
        Schema::dropIfExists('guide_tips');
        Schema::dropIfExists('company_updates');
        Schema::dropIfExists('articles');
    }
};