<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    // ── GET /api/products ─────────────────────────────────────────────────────

    public function index(Request $request): JsonResponse
    {
        try {
            $products = Product::with('category')
                ->active()
                ->when($request->category_id, fn($q) => $q->where('category_id', $request->category_id))
                ->when($request->search, fn($q) => $q->where('name', 'like', "%{$request->search}%"))
                ->when($request->min_price, fn($q) => $q->where('price', '>=', $request->min_price))
                ->when($request->max_price, fn($q) => $q->where('price', '<=', $request->max_price))
                ->when($request->in_stock, fn($q) => $q->inStock())
                ->orderBy($request->get('sort_by', 'created_at'), $request->get('order', 'desc'))
                ->paginate($request->get('per_page', 15));

            return response()->json(['success' => true, 'data' => $products]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    // ── GET /api/products/{product} ───────────────────────────────────────────

    public function show(Product $product): JsonResponse
    {
        try {
            $product->load('category');

            return response()->json(['success' => true, 'data' => $product]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    // ── POST /api/admin/products ──────────────────────────────────────────────

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

            return response()->json([
                'success' => true,
                'message' => 'Produit créé.',
                'data'    => $product->load('category'),
            ], 201);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    // ── PUT /api/admin/products/{product} ─────────────────────────────────────

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

            return response()->json([
                'success' => true,
                'message' => 'Produit mis à jour.',
                'data'    => $product->fresh()->load('category'),
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    // ── DELETE /api/admin/products/{product} ──────────────────────────────────

    public function destroy(Product $product): JsonResponse
    {
        try {
            $product->delete();

            return response()->json(['success' => true, 'message' => 'Produit supprimé.']);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
