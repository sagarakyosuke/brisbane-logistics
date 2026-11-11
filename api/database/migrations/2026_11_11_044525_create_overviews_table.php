<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('overviews', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->string('eyebrow');
            $table->string('title');
            $table->text('description');
            $table->string('cta_label');
            $table->string('cta_path');
            $table->string('image')->nullable();
            $table->string('image_alt');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('overviews');
    }
};