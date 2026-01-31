<?php

use App\Models\Product;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\CartController;
use Illuminate\Http\Request; // Request'i en üste ekledik

// Ana Sayfa Rotası - Filtreleme Özelliği Eklendi
Route::get('/', function (Request $request) {
    // 1. Sorgu tenceresini hazırla
    $query = Product::query();

    // 2. Eğer kategori seçilmişse ve "all" (hepsi) değilse filtreyi tencereye ekle
    if ($request->has('category') && $request->category !== 'all') {
        $query->where('category', $request->category);
    }

    // 3. Masayı kur ve React'e her şeyi gönder
    return Inertia::render('welcome', [
        'products'    => $query->get(), // Filtrelenmiş veya tüm ürünler
        'categories'  => Product::distinct()->pluck('category'), // Tekrarsız kategori listesi
        'filters'     => $request->only(['category']), // Seçili kategori (React'ta butonu mavi yapmak için)
        'canRegister' => Features::enabled(Features::registration()),
        'cart'        => session()->get('cart', []),
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

// require __DIR__.'/settings.php';