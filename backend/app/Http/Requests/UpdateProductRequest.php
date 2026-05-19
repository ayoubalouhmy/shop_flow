<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        $productId = $this->route('product')?->id;

        return [
            'category_id' => ['sometimes', 'exists:categories,id'],
            'name'        => ['sometimes', 'string', 'max:255', "unique:products,name,{$productId}"],
            'slug'        => ['sometimes', 'string', "unique:products,slug,{$productId}"],
            'description' => ['nullable', 'string'],
            'price'       => ['sometimes', 'numeric', 'min:0'],
            'stock'       => ['sometimes', 'integer', 'min:0'],
            'images'      => ['nullable', 'array'],
            'images.*'    => ['string'],
            'is_active'   => ['sometimes', 'boolean'],
        ];
    }
}
