<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create a main test user
        User::factory()->create([
            'name' => 'Ayoub Alouhmy',
            'email' => 'ayoub@example.com',
            'password' => '123456',
            'role' => 'admin',
        ]);

        // 2. Create 10 more fake users
        User::factory(10)->create();

        // 3. Seed real clothing categories and products
        $this->call(ProductSeeder::class);
    }
}
