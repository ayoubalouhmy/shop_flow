<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    // ── GET /api/categories ───────────────────────────────────────────────────

    public function index(): JsonResponse
    {
        try {
            $categories = Category::withCount('products')
                ->with('children')
                ->whereNull('parent_id')
                ->get();

            return response()->json(['success' => true, 'data' => $categories]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    // ── GET /api/categories/{category} ───────────────────────────────────────

    public function show(Category $category): JsonResponse
    {
        try {
            $category->load(['children', 'products' => fn($q) => $q->active()->inStock()]);

            return response()->json(['success' => true, 'data' => $category]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    // ── POST /api/admin/categories ────────────────────────────────────────────

    public function store(StoreCategoryRequest $request): JsonResponse
    {
        try {
            $data         = $request->validated();
            $data['slug'] = $data['slug'] ?? Str::slug($data['name']);

            if ($request->hasFile('image')) {
                $data['image'] = $request->file('image')->store('categories', 'public');
            }

            $category = Category::create($data);

            return response()->json([
                'success' => true,
                'message' => 'Catégorie créée.',
                'data'    => $category,
            ], 201);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    // ── PUT /api/admin/categories/{category} ──────────────────────────────────

    public function update(Request $request, Category $category): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name'      => "sometimes|string|max:255|unique:categories,name,{$category->id}",
                'slug'      => "sometimes|string|unique:categories,slug,{$category->id}",
                'parent_id' => 'nullable|exists:categories,id',
                'image'     => 'nullable|image|max:2048',
            ]);

            if (isset($validated['name']) && !isset($validated['slug'])) {
                $validated['slug'] = Str::slug($validated['name']);
            }

            if ($request->hasFile('image')) {
                $validated['image'] = $request->file('image')->store('categories', 'public');
            }

            $category->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Catégorie mise à jour.',
                'data'    => $category->fresh(),
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    // ── DELETE /api/admin/categories/{category} ───────────────────────────────

    public function destroy(Category $category): JsonResponse
    {
        try {
            $category->delete();

            return response()->json(['success' => true, 'message' => 'Catégorie supprimée.']);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
