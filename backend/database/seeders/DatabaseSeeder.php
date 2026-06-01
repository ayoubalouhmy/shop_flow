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
            'role' => 'admin',
        ]);

        // 2. Create 10 more fake users
        User::factory(10)->create();

        // 3. Create 5 Categories
        $categories = \App\Models\Category::factory(5)->create();

        // 4. Create 30 Products across these categories
        foreach($categories as $category) {
            \App\Models\Product::factory(6)->create([
                'category_id' => $category->id
            ]);
        }
    }
}
