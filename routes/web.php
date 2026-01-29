<?php

use App\Models\Product; // Ürünleri çekmek için modelimizi ekledik
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

// Ana Sayfa Rotası - Ürünleri burada listeliyoruz
Route::get('/', function () {
    return Inertia::render('welcome', [
        'products' => Product::all(), // Veritabanındaki tüm ürünleri React'a gönderiyoruz
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Ürün Detay Rotası 
Route::get('/product/{id}', function ($id) {
    $product = Product::findOrFail($id); // Ürünü bul, bulamazsan 404 ver
    return Inertia::render('ProductDetail', [
        'product' => $product
    ]);
})->name('product.detail');

// Dashboard Rotası (Giriş yapanlar için)
Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

//Sepete eklemek için 
Route::post('/cart/add',[App\Http\Controllers\CartController::class, 'add'])->name('cart.add');

require __DIR__.'/settings.php';