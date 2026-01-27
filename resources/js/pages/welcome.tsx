import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    image: string | null;
}

interface Props {
    products: Product[];
}

// Sepetteki her bir ürünün tipini tanımlayalım
interface CartItem extends Product {
    quantity: number;
}

export default function Welcome({ products } : Props ) {
    const [notification, setNotification] = useState<string | null>(null);
    const [cartCount, setCartCount] = useState<number>(0);

    const addToCart = (productName: string) => {
    setCartCount(cartCount + 1); // Sayacı artırır
    setNotification(`${productName} sepete eklendi! 🛒`); // Bildirim metni
    
    // 3 saniye sonra bildirimi ekrandan siler
    setTimeout(() => {
        setNotification(null);
    }, 3000);
};
    return (
        <>
            <Head title="Ürün Kataloğu" />
            {notification && (
    <div className="fixed top-20 right-5 z-[100] animate-bounce">
        <div className="bg-green-600 text-white px-6 py-3 rounded-2xl shadow-2xl font-bold flex items-center gap-2">
            <span>{notification}</span>
        </div>
    </div>
)}
            <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
                
                {/* Navbar Bölümü */}
                <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">
                            <span className="text-2xl font-black text-indigo-600 tracking-tighter">MODERN-STORE</span>
                            <div className="space-x-4">
                                <Link href="/login" className="text-sm font-medium text-gray-500 hover:text-gray-900">Giriş Yap</Link>
                                <Link href="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition">Kayıt Ol</Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero / Başlık Bölümü */}
                <header className="py-12 px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Harika Ürünler, <span className="text-indigo-600">Uygun Fiyatlar</span>
                    </h1>
                    <p className="text-gray-600 max-w-xl mx-auto text-lg">
                        Laravel 12 ve React'ın gücüyle tasarlanmış özel kataloğumuzu keşfedin.
                    </p>
                </header>

                {/* Ürün Listesi Grid Yapısı */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <div key={product.id} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                {/* Ürün Görseli */}
                                <div className="aspect-square overflow-hidden bg-gray-100">
                                    <img 
                                        src={product.image || 'https://via.placeholder.com/400'} 
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                
                                {/* Ürün Detayları */}
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">{product.category}</span>
                                        <span className="text-sm text-green-600 font-semibold">Stok: {product.stock}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                                        {product.description}
                                    </p>
                                    
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-black text-gray-900">{product.price} TL</span>
                                        <button 
                                        onClick={() => addToCart(product.name)}
                                        className="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-600 transition-colors shadow-lg active:scale-95">
                                            Sepete Ekle
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
}