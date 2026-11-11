<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('client_feedbacks', function (Blueprint $table) {
            $table->id();
            $table->text('quote');
            $table->string('meta');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('client_feedbacks');
    }
};