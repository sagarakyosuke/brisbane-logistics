<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
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
    }

    public function down(): void
    {
        Schema::dropIfExists('guide_tips');
    }
};