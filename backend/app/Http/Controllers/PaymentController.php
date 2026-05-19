<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheckoutRequest;
use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function checkout(CheckoutRequest $request): JsonResponse
    {
        try {
            $order = Order::findOrFail($request->order_id);

            if ($order->user_id !== $request->user()->id) {
                return response()->json(['success' => false, 'message' => 'Non autorisé.'], 403);
            }

            $payment = Payment::create([
                'order_id'       => $order->id,
                'provider'       => $request->provider,
                'transaction_id' => $request->transaction_id,
                'amount'         => $order->total_amount,
                'status'         => 'pending',
            ]);

            return response()->json(['success' => true, 'message' => 'Paiement initié.', 'data' => $payment], 201);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function success(Request $request): JsonResponse
    {
        try {
            $request->validate(['transaction_id' => 'required|string|exists:payments,transaction_id']);
            $payment = Payment::where('transaction_id', $request->transaction_id)->firstOrFail();
            $payment->update(['status' => 'success', 'paid_at' => now()]);
            $payment->order->update(['status' => 'confirmed']);

            return response()->json(['success' => true, 'message' => 'Paiement confirmé.', 'data' => $payment->load('order')]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function failed(Request $request): JsonResponse
    {
        try {
            $request->validate(['transaction_id' => 'required|string|exists:payments,transaction_id']);
            $payment = Payment::where('transaction_id', $request->transaction_id)->firstOrFail();
            $payment->update(['status' => 'failed']);

            return response()->json(['success' => true, 'message' => 'Paiement échoué.', 'data' => $payment]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function refund(Request $request, Payment $payment): JsonResponse
    {
        try {
            if (!$payment->isRefundable()) {
                return response()->json(['success' => false, 'message' => 'Paiement non remboursable.'], 422);
            }
            $payment->update(['status' => 'refunded']);
            $payment->order->update(['status' => 'cancelled']);

            return response()->json(['success' => true, 'message' => 'Remboursement effectué.', 'data' => $payment->fresh()]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function index(Request $request): JsonResponse
    {
        try {
            $payments = Payment::with('order.user')
                ->when($request->status, fn($q) => $q->where('status', $request->status))
                ->when($request->provider, fn($q) => $q->where('provider', $request->provider))
                ->latest()->paginate($request->get('per_page', 20));

            return response()->json(['success' => true, 'data' => $payments]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function show(Payment $payment): JsonResponse
    {
        try {
            $payment->load('order.user', 'order.items.product');

            return response()->json(['success' => true, 'data' => $payment]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function destroy(Payment $payment): JsonResponse
    {
        try {
            $payment->delete();

            return response()->json(['success' => true, 'message' => 'Paiement supprimé.']);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
