<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'user_id' => (string) Str::uuid(),
                'fullname' => 'Paul John M. Sager',
                'email' => 'pauljohn@therightoutsource.com',
                'username' => 'sagara_kyosuke',
                'password' => env('SUPER_ADMIN_PASSWORD'),
                'role' => UserRole::SUPER_ADMIN,
            ],
        ];

        foreach ($users as $user) {
            $existingUser = User::query()
                ->where('username', $user['username'])
                ->first();

            if ($existingUser) {
                unset($user['user_id'], $user['password']);
            }

            User::updateOrCreate(
                ['username' => $user['username']],
                $user
            );
        }
    }
}
