import { router } from '@inertiajs/react';

export default function CartPanel({ isOpen, onClose, cartItems }: { isOpen: boolean, onClose: () => void, cartItems: any }) {
    if (!isOpen) return null;

    const updateQuantity = (id: string, action: 'increase' | 'decrease') => {
        router.post('/cart/update', { id, action }, { preserveScroll: true });
    };

    const removeItem = (id: string) => {
        router.post('/cart/remove', { id }, { 
            preserveScroll: true,
            onBefore: () => confirm('Bu ürünü sepetten kaldırmak istediğinize emin misiniz?') 
        });
    };

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden">
            {/* Arka Plan: Yumuşak şeffaflık */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity" onClick={onClose} />
            
            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
                <div className="w-screen max-w-md transform transition duration-500 ease-in-out">
                    <div className="flex h-full flex-col bg-white shadow-2xl">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                Sepetim
                            </h2>
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition text-gray-400">✕</button>
                        </div>

                        {/* İçerik Alanı */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {Object.keys(cartItems).length === 0 ? (
                                <div className="text-center py-20 text-gray-400">
                                    <p className="mt-4">Sepetiniz şu an boş.</p>
                                </div>
                            ) : (
                                <ul className="space-y-6">
                                    {Object.entries(cartItems).map(([id, quantity]: any) => (
                                        <li key={id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">Ürün</span>
                                                <span className="font-bold text-gray-800 text-lg">#{id}</span>
                                                
                                                {/* ÖZELLEŞTİRİLMİŞ SİLME BUTONU (Çöp Kutusu İkonu) */}
                                                <button 
                                                    onClick={() => removeItem(id)}
                                                    className="flex items-center gap-1 text-red-400 hover:text-red-600 transition-colors mt-2"
                                                    title="Ürünü Sil"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    <span className="text-xs font-medium uppercase">Kaldır</span>
                                                </button>
                                            </div>

                                            {/* MODERN ADET KONTROLÜ */}
                                            <div className="flex items-center bg-white shadow-sm rounded-xl p-1 border border-gray-200">
                                                <button 
                                                    onClick={() => updateQuantity(id, 'decrease')}
                                                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-lg transition text-gray-500 font-bold"
                                                >
                                                    −
                                                </button>
                                                <span className="w-10 text-center font-black text-gray-800">
                                                    {quantity}
                                                </span>
                                                <button 
                                                    onClick={() => updateQuantity(id, 'increase')}
                                                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-lg transition text-indigo-600 font-bold text-lg"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Footer (Ödeme Butonu) */}
                        <div className="p-6 border-t border-gray-100">
                            <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95">
                                Ödemeye Geç
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}