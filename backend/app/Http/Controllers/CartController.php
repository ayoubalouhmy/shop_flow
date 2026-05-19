<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $items = CartItem::with('product.category')
                ->where('user_id', $request->user()->id)
                ->get();

            $total = $items->sum(fn($item) => $item->quantity * $item->product->price);

            return response()->json([
                'success' => true,
                'data'    => [
                    'items'       => $items,
                    'total'       => round($total, 2),
                    'items_count' => $items->sum('quantity'),
                ],
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function addItem(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'product_id' => 'required|exists:products,id',
                'quantity'   => 'required|integer|min:1',
            ]);

            $product = Product::findOrFail($validated['product_id']);

            if (!$product->is_active) {
                return response()->json(['success' => false, 'message' => 'Produit indisponible.'], 422);
            }

            if ($product->stock < $validated['quantity']) {
                return response()->json(['success' => false, 'message' => "Stock insuffisant. Disponible : {$product->stock}"], 422);
            }

            $cartItem = CartItem::where('user_id', $request->user()->id)
                ->where('product_id', $validated['product_id'])
                ->first();

            if ($cartItem) {
                $newQty = $cartItem->quantity + $validated['quantity'];
                if ($newQty > $product->stock) {
                    return response()->json(['success' => false, 'message' => "Stock insuffisant. Déjà {$cartItem->quantity} dans votre panier."], 422);
                }
                $cartItem->update(['quantity' => $newQty]);
            } else {
                $cartItem = CartItem::create([
                    'user_id'    => $request->user()->id,
                    'product_id' => $validated['product_id'],
                    'quantity'   => $validated['quantity'],
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Produit ajouté au panier.',
                'data'    => $cartItem->load('product'),
            ], 201);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function updateQuantity(Request $request, CartItem $cartItem): JsonResponse
    {
        try {
            if ($cartItem->user_id !== $request->user()->id) {
                return response()->json(['success' => false, 'message' => 'Non autorisé.'], 403);
            }

            $validated = $request->validate(['quantity' => 'required|integer|min:1']);

            if ($cartItem->product->stock < $validated['quantity']) {
                return response()->json(['success' => false, 'message' => "Stock insuffisant. Disponible : {$cartItem->product->stock}"], 422);
            }

            $cartItem->update(['quantity' => $validated['quantity']]);

            return response()->json(['success' => true, 'message' => 'Quantité mise à jour.', 'data' => $cartItem->load('product')]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function removeItem(Request $request, CartItem $cartItem): JsonResponse
    {
        try {
            if ($cartItem->user_id !== $request->user()->id) {
                return response()->json(['success' => false, 'message' => 'Non autorisé.'], 403);
            }

            $cartItem->delete();

            return response()->json(['success' => true, 'message' => 'Article retiré du panier.']);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function clear(Request $request): JsonResponse
    {
        try {
            CartItem::where('user_id', $request->user()->id)->delete();

            return response()->json(['success' => true, 'message' => 'Panier vidé.']);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
