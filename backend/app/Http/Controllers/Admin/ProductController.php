<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $products = Product::withTrashed()->with('category')->withCount('orderItems')
                ->when($request->category_id, fn($q) => $q->where('category_id', $request->category_id))
                ->when($request->search, fn($q) => $q->where('name', 'like', "%{$request->search}%"))
                ->when($request->has('is_active'), fn($q) => $q->where('is_active', $request->boolean('is_active')))
                ->when($request->trashed === 'true', fn($q) => $q->onlyTrashed())
                ->latest()->get();

            return response()->json(['success' => true, 'data' => $products]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function show(Product $product): JsonResponse
    {
        try {
            $product->load('category')->loadCount('orderItems');

            return response()->json(['success' => true, 'data' => $product]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function store(StoreProductRequest $request): JsonResponse
    {
        try {
            $data         = $request->validated();
            $data['slug'] = $data['slug'] ?? Str::slug($data['name']);

            if ($request->hasFile('image_files')) {
                $paths = [];
                foreach ($request->file('image_files') as $file) {
                    $paths[] = $file->store('products', 'public');
                }
                $data['images'] = $paths;
            }

            $product = Product::create($data);

            return response()->json(['success' => true, 'message' => 'Produit créé.', 'data' => $product->load('category')], 201);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function update(UpdateProductRequest $request, Product $product): JsonResponse
    {
        try {
            $data = $request->validated();

            if (isset($data['name']) && !isset($data['slug'])) {
                $data['slug'] = Str::slug($data['name']);
            }

            if ($request->hasFile('image_files')) {
                $paths = [];
                foreach ($request->file('image_files') as $file) {
                    $paths[] = $file->store('products', 'public');
                }
                $data['images'] = array_merge($product->images ?? [], $paths);
            }

            $product->update($data);

            return response()->json(['success' => true, 'message' => 'Produit mis à jour.', 'data' => $product->fresh()->load('category')]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function destroy(Product $product): JsonResponse
    {
        try {
            $product->delete();

            return response()->json(['success' => true, 'message' => 'Produit archivé.']);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function restore(int $id): JsonResponse
    {
        try {
            $product = Product::withTrashed()->findOrFail($id);
            $product->restore();

            return response()->json(['success' => true, 'message' => 'Produit restauré.', 'data' => $product->load('category')]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
