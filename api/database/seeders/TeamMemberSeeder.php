<?php

namespace Database\Seeders;

use App\Models\AboutUs\TeamMember;
use Illuminate\Database\Seeder;

class TeamMemberSeeder extends Seeder
{
    public function run(): void
    {
        $members = [
            [
                'key' => 'emily',
                'name' => 'Emily Jackman',
                'role' => 'Owner',
                'initials' => 'EJ',
                'color' => 'navy',
                'image' => 'team/emily.jpg',
                'sort_order' => 1,
            ],
            [
                'key' => 'andrew-w',
                'name' => 'Andrew Wall',
                'role' => 'Operations Manager',
                'initials' => 'AW',
                'color' => 'orange',
                'image' => null,
                'sort_order' => 2,
            ],
            [
                'key' => 'andrew-p',
                'name' => 'Andrew Peal',
                'role' => 'ICT Manager',
                'initials' => 'AP',
                'color' => 'navy',
                'image' => null,
                'sort_order' => 3,
            ],
            [
                'key' => 'dave',
                'name' => 'Dave Cañeda',
                'role' => 'Operations Assistant Team Lead',
                'initials' => 'DC',
                'color' => 'navy',
                'image' => null,
                'sort_order' => 4,
            ],
            [
                'key' => 'geralyn',
                'name' => 'Geralyn Canoy',
                'role' => 'Operations Assistant',
                'initials' => 'GC',
                'color' => 'orange',
                'image' => null,
                'sort_order' => 5,
            ],
            [
                'key' => 'cecile',
                'name' => 'Cecile Sybico',
                'role' => 'Account Administrator',
                'initials' => 'CS',
                'color' => 'navy',
                'image' => null,
                'sort_order' => 6,
            ],
            [
                'key' => 'crisleyn',
                'name' => 'Crisleyn Gabayan',
                'role' => 'Account Administrator',
                'initials' => 'CG',
                'color' => 'navy',
                'image' => null,
                'sort_order' => 7,
            ],
        ];

        foreach ($members as $member) {
            TeamMember::updateOrCreate(['key' => $member['key']], $member);
        }
    }
}