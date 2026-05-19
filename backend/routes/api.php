<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Admin\PaymentController as AdminPaymentController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;

/*
|--------------------------------------------------------------------------
| API Routes - ShopFlow E-Commerce
|--------------------------------------------------------------------------
*/

// ─────────────────────────────────────────────────────────────────────────────
// ROUTES PUBLIQUES
// ─────────────────────────────────────────────────────────────────────────────

Route::get('/ping', fn() => response()->json(['message' => 'ShopFlow API is running ✅']));

// Authentification
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register'])->name('auth.register');
    Route::post('/login',    [AuthController::class, 'login'])->name('auth.login');
});

// Catalogue public
Route::get('/categories',             [CategoryController::class, 'index'])->name('categories.index');
Route::get('/categories/{category}',  [CategoryController::class, 'show'])->name('categories.show');
Route::get('/products',               [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{product}',     [ProductController::class, 'show'])->name('products.show');

// ─────────────────────────────────────────────────────────────────────────────
// ROUTES PROTÉGÉES (auth:sanctum)
// ─────────────────────────────────────────────────────────────────────────────

Route::middleware('auth:sanctum')->group(function () {

    // ── Auth ──────────────────────────────────────────────────────────────────
    Route::prefix('auth')->group(function () {
        Route::post('/logout',  [AuthController::class, 'logout'])->name('auth.logout');
        Route::get('/profile',  [AuthController::class, 'profile'])->name('auth.profile');
        Route::put('/profile',  [AuthController::class, 'updateProfile'])->name('auth.profile.update');
    });

    // ── Panier ────────────────────────────────────────────────────────────────
    Route::prefix('cart')->name('cart.')->group(function () {
        Route::get('/',               [CartController::class, 'index'])->name('index');
        Route::post('/',              [CartController::class, 'addItem'])->name('add');
        Route::put('/{cartItem}',     [CartController::class, 'updateQuantity'])->name('update');
        Route::delete('/{cartItem}',  [CartController::class, 'removeItem'])->name('remove');
        Route::delete('/',            [CartController::class, 'clear'])->name('clear');
    });

    // ── Commandes ─────────────────────────────────────────────────────────────
    Route::prefix('orders')->name('orders.')->group(function () {
        Route::get('/',                    [OrderController::class, 'index'])->name('index');
        Route::post('/',                   [OrderController::class, 'store'])->name('store');
        Route::get('/{order}',             [OrderController::class, 'show'])->name('show');
        Route::post('/{order}/cancel',     [OrderController::class, 'cancel'])->name('cancel');
    });

    // ── Paiements ─────────────────────────────────────────────────────────────
    Route::prefix('payments')->name('payments.')->group(function () {
        Route::post('/checkout',            [PaymentController::class, 'checkout'])->name('checkout');
        Route::post('/success',             [PaymentController::class, 'success'])->name('success');
        Route::post('/failed',              [PaymentController::class, 'failed'])->name('failed');
        Route::post('/{payment}/refund',    [PaymentController::class, 'refund'])->name('refund');
    });

    // ─────────────────────────────────────────────────────────────────────────
    // ROUTES ADMIN (auth:sanctum + admin)
    // ─────────────────────────────────────────────────────────────────────────

    Route::middleware('admin')->prefix('admin')->name('admin.')->group(function () {

        // Dashboard
        Route::get('/dashboard', [DashboardController::class, 'stats'])->name('dashboard');

        // Gestion des utilisateurs
        Route::prefix('users')->name('users.')->group(function () {
            Route::get('/',              [AdminUserController::class, 'index'])->name('index');
            Route::get('/{user}',        [AdminUserController::class, 'show'])->name('show');
            Route::put('/{user}',        [AdminUserController::class, 'update'])->name('update');
            Route::delete('/{user}',     [AdminUserController::class, 'destroy'])->name('destroy');
            Route::put('/{user}/role',   [AdminUserController::class, 'changeRole'])->name('role');
        });

        // Gestion des catégories
        Route::prefix('categories')->name('categories.')->group(function () {
            Route::post('/',              [CategoryController::class, 'store'])->name('store');
            Route::put('/{category}',     [CategoryController::class, 'update'])->name('update');
            Route::delete('/{category}',  [CategoryController::class, 'destroy'])->name('destroy');
        });

        // Gestion des produits
        Route::prefix('products')->name('products.')->group(function () {
            Route::get('/',               [AdminProductController::class, 'index'])->name('index');
            Route::get('/{product}',      [AdminProductController::class, 'show'])->name('show');
            Route::post('/',              [AdminProductController::class, 'store'])->name('store');
            Route::put('/{product}',      [AdminProductController::class, 'update'])->name('update');
            Route::delete('/{product}',   [AdminProductController::class, 'destroy'])->name('destroy');
            Route::post('/{id}/restore',  [AdminProductController::class, 'restore'])->name('restore');
        });

        // Gestion des commandes
        Route::prefix('orders')->name('orders.')->group(function () {
            Route::get('/',                     [AdminOrderController::class, 'index'])->name('index');
            Route::get('/{order}',              [AdminOrderController::class, 'show'])->name('show');
            Route::put('/{order}/status',       [AdminOrderController::class, 'updateStatus'])->name('status');
            Route::put('/{order}/tracking',     [AdminOrderController::class, 'updateTracking'])->name('tracking');
            Route::delete('/{order}',           [AdminOrderController::class, 'destroy'])->name('destroy');
        });

        // Gestion des paiements
        Route::prefix('payments')->name('payments.')->group(function () {
            Route::get('/',                      [AdminPaymentController::class, 'index'])->name('index');
            Route::get('/{payment}',             [AdminPaymentController::class, 'show'])->name('show');
            Route::post('/{payment}/refund',     [AdminPaymentController::class, 'refund'])->name('refund');
            Route::delete('/{payment}',          [AdminPaymentController::class, 'destroy'])->name('destroy');
        });
    });
});
