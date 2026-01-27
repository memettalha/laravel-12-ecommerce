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

// Dashboard Rotası (Giriş yapanlar için)
Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/settings.php';