
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        /*
        |--------------------------------------------------------------------------
        | Rename Existing Column
        |--------------------------------------------------------------------------
        */

        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn('name', 'fullname');
        });

        /*
        |--------------------------------------------------------------------------
        | Add New User Columns
        |--------------------------------------------------------------------------
        */

        Schema::table('users', function (Blueprint $table) {
            $table->string('user_id')->nullable()->after('id');
            $table->string('username')->nullable()->after('email');
            $table->enum('role', [
                'super_admin',
                'admin',
                'staff',
            ])->default('staff')->after('password');
        });

        /*
        |--------------------------------------------------------------------------
        | Populate Existing User Records
        |--------------------------------------------------------------------------
        */

        DB::table('users')
            ->orderBy('id')
            ->chunkById(100, function ($users) {
                foreach ($users as $user) {
                    $emailPrefix = Str::before($user->email, '@');

                    $username = Str::of($emailPrefix)
                        ->lower()
                        ->replaceMatches('/[^a-z0-9_]/', '_')
                        ->trim('_')
                        ->value();

                    if ($username === '') {
                        $username = 'user';
                    }

                    DB::table('users')
                        ->where('id', $user->id)
                        ->update([
                            'user_id' => (string) Str::uuid(),
                            'username' => $username . '_' . $user->id,
                        ]);
                }
            });

        /*
        |--------------------------------------------------------------------------
        | Apply Required Constraints
        |--------------------------------------------------------------------------
        */

        Schema::table('users', function (Blueprint $table) {
            $table->string('user_id')
                ->nullable(false)
                ->unique()
                ->change();

            $table->string('username')
                ->nullable(false)
                ->unique()
                ->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'user_id',
                'username',
                'role',
            ]);

            $table->renameColumn('fullname', 'name');
        });
    }
};
