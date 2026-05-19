<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $orders = Order::with('user')->withCount('items')
                ->when($request->status, fn($q) => $q->where('status', $request->status))
                ->when($request->user_id, fn($q) => $q->where('user_id', $request->user_id))
                ->when($request->from, fn($q) => $q->whereDate('created_at', '>=', $request->from))
                ->when($request->to, fn($q) => $q->whereDate('created_at', '<=', $request->to))
                ->latest()->paginate($request->get('per_page', 20));

            return response()->json(['success' => true, 'data' => $orders]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function show(Order $order): JsonResponse
    {
        try {
            $order->load('user', 'items.product', 'payment');

            return response()->json(['success' => true, 'data' => $order]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function updateStatus(Request $request, Order $order): JsonResponse
    {
        try {
            $request->validate(['status' => 'required|in:pending,confirmed,shipped,delivered,cancelled']);

            if ($request->status === 'cancelled' && $order->status !== 'cancelled') {
                DB::transaction(function () use ($order, $request) {
                    foreach ($order->items as $item) {
                        $item->product->increment('stock', $item->quantity);
                    }
                    $order->update(['status' => $request->status]);
                });
            } else {
                $order->update(['status' => $request->status]);
            }

            return response()->json(['success' => true, 'message' => 'Statut mis à jour.', 'data' => $order->fresh()]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function updateTracking(Request $request, Order $order): JsonResponse
    {
        try {
            $request->validate(['tracking_number' => "required|string|unique:orders,tracking_number,{$order->id}"]);
            $order->update(['tracking_number' => $request->tracking_number]);

            return response()->json(['success' => true, 'message' => 'Numéro de suivi mis à jour.', 'data' => $order->fresh()]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

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
