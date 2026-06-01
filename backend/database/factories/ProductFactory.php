<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->unique()->sentence(3);
        return [
            'category_id' => Category::factory(),
            'name'        => $name,
            'slug'        => str($name)->slug(),
            'description' => fake()->paragraphs(2, true),
            'price'       => fake()->randomFloat(2, 29, 999),
            'stock'       => fake()->numberBetween(0, 50),
            'images'      => [
                'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
            ],
            'is_active'   => true,
        ];
    }
}
