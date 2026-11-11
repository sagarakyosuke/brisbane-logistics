<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
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
    }

    public function down(): void
    {
        Schema::dropIfExists('company_updates');
    }
};