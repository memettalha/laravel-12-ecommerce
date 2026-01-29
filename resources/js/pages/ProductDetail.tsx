import { Head, Link, usePage, router } from '@inertiajs/react';
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

export default function ProductDetail({ product }: { product: Product }) {
    const { props } = usePage();
    const [isAdded, setIsAdded] = useState(false);
    //Paneli açık kapalı tutmak için
    const [isCartOpen, setIsCartOpen] = useState(false);

    const handleAddtoCart = () => {
        router.post('/cart/add', { id: product.id }, {
            preserveScroll: true,
            onSuccess: () => {
                setIsAdded(true);
                // 2 saniye sonra butonu eski haline çevir
                setTimeout(() => {
                    setIsAdded(false);
                }, 2000);
            },
            onError: (errors) => {
                console.error("Sepete eklenirken hata oluştu:", errors);
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title={`${product.name} - Detay`} />

            <nav className="bg-white border-b border-gray-100 p-4 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    <Link href="/" className="text-indigo-600 font-bold flex items-center gap-2 hover:text-indigo-800 transition">
                        ← Kataloğa Dön
                    </Link>
                    {/* Sepet sayısını sağ üstte görelim */}
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="text-sm font-bold bg-gray-100 px-3 py-1 rounded-full">
                        🛒 Sepet: {(props as any).cartCount || 0}
                    </button>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 py-12">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-0">
                    <div className="bg-gray-100 flex items-center justify-center p-8">
                        <img
                            src={product.image || 'https://via.placeholder.com/600'}
                            alt={product.name}
                            className="w-full h-auto max-h-[500px] object-contain rounded-2xl transform hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    <div className="p-12 flex flex-col justify-center">
                        <div className="mb-6">
                            <span className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-widest">
                                {product.category}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                            {product.name}
                        </h1>

                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            {product.description}
                        </p>

                        <div className="border-t border-b border-gray-100 py-8 mb-8 flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-400 uppercase font-bold mb-1">Fiyat</p>
                                <p className="text-4xl font-black text-indigo-600">{product.price} TL</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-400 uppercase font-bold mb-1">Stok Durumu</p>
                                <p className={`text-lg font-bold ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {product.stock > 0 ? `${product.stock} Adet Mevcut` : 'Tükendi'}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={handleAddtoCart}
                            disabled={product.stock <= 0}
                            className={`w-full py-5 rounded-2xl text-xl font-bold transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3 ${isAdded ? 'bg-green-600 text-white' : 'bg-gray-900 text-white hover:bg-indigo-600'
                                } ${product.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isAdded ? (
                                <><span>✅</span> Eklendi!</>
                            ) : (
                                <><span>🛒</span> {product.stock > 0 ? 'Sepete Ekle' : 'Stokta Yok'}</>
                            )}
                        </button>
                    </div>
                </div>
            </main>
            <CartPanel
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={(props as any).cart || {}}
            />
        </div>
    );
}