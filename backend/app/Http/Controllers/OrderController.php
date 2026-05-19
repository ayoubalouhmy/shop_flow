<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    // ── GET /api/orders ───────────────────────────────────────────────────────

    public function index(Request $request): JsonResponse
    {
        try {
            $orders = Order::with('items.product', 'payment')
                ->where('user_id', $request->user()->id)
                ->when($request->status, fn($q) => $q->where('status', $request->status))
                ->latest()
                ->paginate($request->get('per_page', 10));

            return response()->json(['success' => true, 'data' => $orders]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    // ── GET /api/orders/{order} ───────────────────────────────────────────────

    public function show(Request $request, Order $order): JsonResponse
    {
        try {
            if ($order->user_id !== $request->user()->id) {
                return response()->json(['success' => false, 'message' => 'Non autorisé.'], 403);
            }

            $order->load('items.product', 'payment', 'user');

            return response()->json(['success' => true, 'data' => $order]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    // ── POST /api/orders ──────────────────────────────────────────────────────

    public function store(StoreOrderRequest $request): JsonResponse
    {
        try {
            return DB::transaction(function () use ($request) {
                $total      = 0;
                $orderItems = [];

                foreach ($request->items as $item) {
                    $product = Product::lockForUpdate()->findOrFail($item['product_id']);

                    if ($product->stock < $item['quantity']) {
                        abort(422, "Stock insuffisant pour « {$product->name} ».");
                    }

                    $product->decrement('stock', $item['quantity']);
                    $total       += $product->price * $item['quantity'];
                    $orderItems[] = [
                        'product_id' => $product->id,
                        'quantity'   => $item['quantity'],
                        'unit_price' => $product->price,
                    ];
                }

                $order = Order::create([
                    'user_id'          => $request->user()->id,
                    'status'           => 'pending',
                    'total_amount'     => $total,
                    'shipping_address' => $request->shipping_address,
                    'notes'            => $request->notes,
                ]);

                $order->items()->createMany($orderItems);

                return response()->json([
                    'success' => true,
                    'message' => 'Commande créée.',
                    'data'    => $order->load('items.product'),
                ], 201);
            });
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    // ── POST /api/orders/{order}/cancel ───────────────────────────────────────

    public function cancel(Request $request, Order $order): JsonResponse
    {
        try {
            if ($order->user_id !== $request->user()->id) {
                return response()->json(['success' => false, 'message' => 'Non autorisé.'], 403);
            }

            if (!$order->isCancellable()) {
                return response()->json(['success' => false, 'message' => 'Commande non annulable.'], 422);
            }

            DB::transaction(function () use ($order) {
                foreach ($order->items as $item) {
                    $item->product->increment('stock', $item->quantity);
                }
                $order->update(['status' => 'cancelled']);
            });

            return response()->json([
                'success' => true,
                'message' => 'Commande annulée.',
                'data'    => $order->fresh(),
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    // ── PUT /api/admin/orders/{order}/status ──────────────────────────────────

    public function updateStatus(Request $request, Order $order): JsonResponse
    {
        try {
            $request->validate([
                'status' => ['required', 'in:pending,confirmed,shipped,delivered,cancelled'],
            ]);

            $order->update(['status' => $request->status]);

            return response()->json([
                'success' => true,
                'message' => 'Statut mis à jour.',
                'data'    => $order->fresh(),
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    // ── DELETE /api/admin/orders/{order} ──────────────────────────────────────

    public function destroy(Order $order): JsonResponse
    {
        try {
            $order->delete();

            return response()->json(['success' => true, 'message' => 'Commande supprimée.']);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
