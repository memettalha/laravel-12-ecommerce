<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CartController extends Controller
{
    public function add(Request $request)
    {
        // Session'dan mevcut sepeti al, yoksa boş dizi döndür
        $cart = session()->get('cart', []);

        // Ürün ID'sini al ve sepet dizisine ekle
        $productId = $request->id;
        $cart[$productId] = ($cart[$productId] ?? 0) + 1;

        // Güncel sepeti session'a geri yükle
        session()->put('cart', $cart);

        // React tarafına "işlem tamam, propsları yenile" mesajı gönderir
        return back();
    }
}