<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\Admin\AdminDashboardController;
use App\Http\Controllers\Api\Admin\AdminUserController;
use App\Http\Controllers\Api\Admin\AdminOrderController;
use App\Http\Controllers\Api\Admin\AdminPaymentController;
use App\Http\Controllers\Api\Admin\AdminProductController;

/*
|--------------------------------------------------------------------------
| API Routes - ShopFlow E-Commerce
|--------------------------------------------------------------------------
*/

// ─────────────────────────────────────────────────────────────────────────────
// ROUTES PUBLIQUES
// ─────────────────────────────────────────────────────────────────────────────

// Test de connectivité
Route::get('/ping', fn() => response()->json(['message' => 'ShopFlow API is running ✅']));

// Authentification (pas de token requis)
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register'])->name('auth.register');
    Route::post('/login',    [AuthController::class, 'login'])->name('auth.login');
});

// Catalogue public (lecture seule)
Route::get('/categories',          [CategoryController::class, 'index'])->name('categories.index');
Route::get('/categories/{category}', [CategoryController::class, 'show'])->name('categories.show');

Route::get('/products',          [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');


// ─────────────────────────────────────────────────────────────────────────────
// ROUTES PROTÉGÉES (auth:sanctum)
// ─────────────────────────────────────────────────────────────────────────────

Route::middleware('auth:sanctum')->group(function () {

    // ── Auth ──────────────────────────────────────────────────────────────────
    Route::prefix('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout');
        Route::get('/profile', [AuthController::class, 'profile'])->name('auth.profile');
        Route::put('/profile', [AuthController::class, 'updateProfile'])->name('auth.profile.update');
    });

    // ── Panier ────────────────────────────────────────────────────────────────
    Route::prefix('cart')->name('cart.')->group(function () {
        Route::get('/',              [CartController::class, 'index'])->name('index');
        Route::post('/',             [CartController::class, 'addItem'])->name('add');
        Route::put('/{cartItem}',    [CartController::class, 'updateQuantity'])->name('update');
        Route::delete('/{cartItem}', [CartController::class, 'removeItem'])->name('remove');
        Route::delete('/',           [CartController::class, 'clear'])->name('clear');
    });

    // ── Commandes utilisateur ─────────────────────────────────────────────────
    Route::prefix('orders')->name('orders.')->group(function () {
        Route::get('/',             [OrderController::class, 'index'])->name('index');
        Route::post('/',            [OrderController::class, 'store'])->name('store');
        Route::get('/{order}',      [OrderController::class, 'show'])->name('show');
        Route::post('/{order}/cancel', [OrderController::class, 'cancel'])->name('cancel');
    });

    // ── Paiements ─────────────────────────────────────────────────────────────
    Route::prefix('payments')->name('payments.')->group(function () {
        Route::post('/checkout',        [PaymentController::class, 'checkout'])->name('checkout');
        Route::post('/success',         [PaymentController::class, 'success'])->name('success');
        Route::post('/failed',          [PaymentController::class, 'failed'])->name('failed');
        Route::post('/{payment}/refund', [PaymentController::class, 'refund'])->name('refund');
    });


    // ─────────────────────────────────────────────────────────────────────────
    // ROUTES ADMIN (auth:sanctum + admin)
    // ─────────────────────────────────────────────────────────────────────────

    Route::middleware('admin')->prefix('admin')->name('admin.')->group(function () {

        // Dashboard
        Route::get('/dashboard', [AdminDashboardController::class, 'stats'])->name('dashboard');

        // Gestion des utilisateurs
        Route::prefix('users')->name('users.')->group(function () {
            Route::get('/',        [AdminUserController::class, 'index'])->name('index');
            Route::get('/{user}',  [AdminUserController::class, 'show'])->name('show');
            Route::put('/{user}',  [AdminUserController::class, 'update'])->name('update');
            Route::delete('/{user}', [AdminUserController::class, 'destroy'])->name('destroy');
            Route::put('/{user}/role', [AdminUserController::class, 'changeRole'])->name('role');
        });

        // Gestion des catégories (CRUD complet)
        Route::apiResource('categories', CategoryController::class)
            ->except(['index', 'show'])
            ->names([
                'store'   => 'categories.store',
                'update'  => 'categories.update',
                'destroy' => 'categories.destroy',
            ]);

        // Gestion des produits (CRUD complet)
        Route::apiResource('products', AdminProductController::class)
            ->except(['index', 'show'])
            ->names([
                'store'   => 'products.store',
                'update'  => 'products.update',
                'destroy' => 'products.destroy',
            ]);

        // Gestion des commandes
        Route::prefix('orders')->name('orders.')->group(function () {
            Route::get('/',                         [AdminOrderController::class, 'index'])->name('index');
            Route::get('/{order}',                  [AdminOrderController::class, 'show'])->name('show');
            Route::put('/{order}/status',           [AdminOrderController::class, 'updateStatus'])->name('status');
            Route::put('/{order}/tracking',         [AdminOrderController::class, 'updateTracking'])->name('tracking');
        });

        // Gestion des paiements
        Route::prefix('payments')->name('payments.')->group(function () {
            Route::get('/',                         [AdminPaymentController::class, 'index'])->name('index');
            Route::get('/{payment}',                [AdminPaymentController::class, 'show'])->name('show');
            Route::post('/{payment}/refund',        [AdminPaymentController::class, 'refund'])->name('refund');
        });
    });
});
