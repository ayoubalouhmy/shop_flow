<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function stats(): JsonResponse
    {
        try {
            $stats = [
                'users' => [
                    'total'          => User::count(),
                    'admins'         => User::where('role', 'admin')->count(),
                    'clients'        => User::where('role', 'client')->count(),
                    'new_this_month' => User::whereMonth('created_at', now()->month)->count(),
                ],
                'products' => [
                    'total'        => Product::count(),
                    'active'       => Product::where('is_active', true)->count(),
                    'inactive'     => Product::where('is_active', false)->count(),
                    'out_of_stock' => Product::where('stock', 0)->count(),
                ],
                'orders' => [
                    'total'     => Order::count(),
                    'pending'   => Order::where('status', 'pending')->count(),
                    'confirmed' => Order::where('status', 'confirmed')->count(),
                    'shipped'   => Order::where('status', 'shipped')->count(),
                    'delivered' => Order::where('status', 'delivered')->count(),
                    'cancelled' => Order::where('status', 'cancelled')->count(),
                ],
                'revenue' => [
                    'total' => Payment::where('status', 'success')->sum('amount'),
                    'today' => Payment::where('status', 'success')->whereDate('paid_at', today())->sum('amount'),
                    'month' => Payment::where('status', 'success')->whereMonth('paid_at', now()->month)->sum('amount'),
                    'year'  => Payment::where('status', 'success')->whereYear('paid_at', now()->year)->sum('amount'),
                ],
                'recent_orders' => Order::with('user')
                    ->latest()->limit(5)
                    ->get(['id', 'user_id', 'status', 'total_amount', 'created_at']),
                'top_products' => Product::withCount('orderItems')
                    ->orderByDesc('order_items_count')->limit(5)
                    ->get(['id', 'name', 'price', 'stock']),
                'monthly_revenue' => Payment::where('status', 'success')
                    ->whereYear('paid_at', now()->year)
                    ->selectRaw('MONTH(paid_at) as month, SUM(amount) as total')
                    ->groupBy('month')->orderBy('month')->get(),
            ];

            return response()->json(['success' => true, 'data' => $stats]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
