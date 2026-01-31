<?php

use App\Models\Product;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\CartController; // Buraya çektik

// 1. Önce tüm ana sayfayı ezecek rotaları kontrol etmek için 
// Laravel'in önbelleğini temizlemeyi unutma.

Route::get('/', function () {
    return Inertia::render('welcome', [ // Welcome.tsx dosyanın ismiyle birebir aynı olsun
        'products' => Product::all(),
        'canRegister' => Features::enabled(Features::registration()),
        'cart' => session()->get('cart', []),
    ]);
})->name('home');

// Ürün Detay Rotası 
Route::get('/product/{id}', function ($id) {
    $product = Product::findOrFail($id);
    return Inertia::render('ProductDetail', [
        'product' => $product
    ]);
})->name('product.detail');

// Dashboard
Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Sepet İşlemleri
Route::post('/cart/add', [CartController::class, 'add'])->name('cart.add');
Route::post('/cart/update', [CartController::class, 'update'])->name('cart.update');
Route::post('/cart/remove', [CartController::class, 'remove'])->name('cart.remove');

//require __DIR__.'/settings.php';