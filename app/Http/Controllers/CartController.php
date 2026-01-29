<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CartController extends Controller
{
    // Mevcut ekleme fonksiyonun (Dokunmadık)
    public function add(Request $request)
    {
        $cart = session()->get('cart', []);
        $productId = $request->id;
        $cart[$productId] = ($cart[$productId] ?? 0) + 1;
        session()->put('cart', $cart);

        return back();
    }


    // Adet artırma ve azaltma işlemi
    public function update(Request $request)
    {
        $cart = session()->get('cart', []);
        $id = $request->id;

        if (isset($cart[$id])) {
            if ($request->action === 'increase') {
                $cart[$id]++;
            } else {
                // Adet 1'den büyükse azalt
                if ($cart[$id] > 1) {
                    $cart[$id]--;
                }
            }
            session()->put('cart', $cart);
        }

        return back();
    }

    // Ürünü sepetten tamamen kaldırma işlemi
    public function remove(Request $request)
    {
        $cart = session()->get('cart', []);
        $id = $request->id;

        if (isset($cart[$id])) {
            unset($cart[$id]);
            session()->put('cart', $cart);
        }

        return back();
    }
}