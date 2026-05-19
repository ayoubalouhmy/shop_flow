<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $payments = Payment::with('order.user')
                ->when($request->status, fn($q) => $q->where('status', $request->status))
                ->when($request->provider, fn($q) => $q->where('provider', $request->provider))
                ->when($request->from, fn($q) => $q->whereDate('paid_at', '>=', $request->from))
                ->when($request->to, fn($q) => $q->whereDate('paid_at', '<=', $request->to))
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

    public function refund(Payment $payment): JsonResponse
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
