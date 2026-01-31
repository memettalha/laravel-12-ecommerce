import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import CartPanel from '@/components/CartPanel';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    image: string | null;
}

// Props arayüzünü güncelledik: cart ve canRegister eklendi
interface Props {
    products: Product[];
    cart: Record<number, number>; // { ürün_id: adet } şeklinde bir obje
    canRegister: boolean;
}

export default function Welcome({ products, cart, canRegister }: Props) {
    const [notification, setNotification] = useState<string | null>(null);
    // Sepet panelinin açık/kapalı durumunu tutan state
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Sepetteki toplam ürün adedini hesapla (cart boşsa hata vermemesi için || {} ekledik)
    const totalItems = Object.values(cart || {}).reduce((acc: number, curr: number) => acc + curr, 0);

    const addToCart = (productName: string) => {
        // Not: Gerçek sepete ekleme işlemi ProductDetail sayfasındaki gibi 
        // bir router.post isteği gerektirir. Şimdilik sadece bildirim gösteriyoruz.
        setNotification(`${productName} sepete eklendi! 🛒`);

        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };
  
    return (
        <>
            <Head title="Ürün Kataloğu" />
            
            {/* Bildirim */}
            {notification && (
                <div className="fixed top-20 right-5 z-[100] animate-bounce">
                    <div className="bg-green-600 text-white px-6 py-3 rounded-2xl shadow-2xl font-bold flex items-center gap-2">
                        <span>{notification}</span>
                    </div>
                </div>
            )}

            <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
                {/* Navbar Bölümü */}
                <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            {/* Logo */}
                            <div className="text-2xl font-black text-indigo-600 tracking-tighter">
                                MODERN<span className="text-gray-900">SHOP</span>
                            </div>

                            {/* Sağ Taraf: Üye Ol & Sepet */}
                            <div className="flex items-center gap-6">
                                {canRegister && (
                                    <Link href="/register" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition">
                                        Üye Ol
                                    </Link>
                                )}
                                
                                {/* ÖZELLEŞTİRİLMİŞ SEPET BUTONU */}
                                <button 
                                    onClick={() => setIsCartOpen(true)}
                                    className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-all group"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    
                                    {totalItems > 0 && (
                                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-[10px] font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full border-2 border-white">
                                            {totalItems}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                <header className="py-12 px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Harika Ürünler, <span className="text-indigo-600">Uygun Fiyatlar</span>
                    </h1>
                    <p className="text-gray-600 max-w-xl mx-auto text-lg">
                        Laravel 12 ve React'ın gücüyle tasarlanmış özel kataloğumuzu keşfedin.
                    </p>
                </header>

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <div key={product.id} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                <div className="aspect-square overflow-hidden bg-gray-100">
                                    <Link href={`/product/${product.id}`}>
                                        <img
                                            src={product.image || 'https://via.placeholder.com/400'}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </Link>
                                </div>

                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">{product.category}</span>
                                        <span className="text-sm text-green-600 font-semibold">Stok: {product.stock}</span>
                                    </div>
                                    <Link href={`/product/${product.id}`}>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                                    </Link>
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

                {/* SEPET PANELİ BİLEŞENİ */}
                <CartPanel 
                    isOpen={isCartOpen} 
                    onClose={() => setIsCartOpen(false)} 
                    cartItems={cart} 
                />
            </div>
        </>
    );
}