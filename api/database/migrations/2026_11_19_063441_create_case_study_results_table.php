
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('case_study_results', function (Blueprint $table) {
            $table->id();

            $table->foreignId('case_study_id')
                ->unique()
                ->constrained('case_studies')
                ->cascadeOnDelete();

            // Challenge
            $table->string('challenge_title');
            $table->text('challenge_description');

            // Response
            $table->string('response_title');
            $table->json('response_steps');

            // Result
            $table->string('result_eyebrow');
            $table->string('result_icon_key')->nullable();
            $table->string('result_title');
            $table->text('result_subtitle');
            $table->json('result_points');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('case_study_results');
    }
};
