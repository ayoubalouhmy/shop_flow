<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->unique()->word();
        return [
            'name'      => ucfirst($name),
            'slug'      => str($name)->slug(),
            'parent_id' => null,
            'image'     => 'https://images.unsplash.com/photo-1513519247388-4e28dc356612?auto=format&fit=crop&w=800&q=80',
        ];
    }
}
