<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('our_perspectives', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->string('eyebrow');
            $table->string('title');
            $table->text('quote');
            $table->string('author_name');
            $table->string('author_role');
            $table->string('initials');
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('our_perspectives');
    }
};