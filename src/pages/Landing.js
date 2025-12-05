import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const PRODUCT_API = "http://localhost:3001/api/produk"; 

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await fetch(PRODUCT_API);
                if (!res.ok) throw new Error("Gagal mengambil produk");
                const data = await res.json();
                setProducts(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err.message || "Error");
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleProductClick = () => {
        navigate("/auth"); 
    };

    const featured = products.slice(0, 3);
    const newArrivals = products.slice(3, 6);
    const bestSeller = products.slice(6, 9);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Jumbotron - tema kue */}
            <header className="max-w-6xl mx-auto px-6 py-16">
                <div
                    className="bg-white rounded-2xl shadow-2xl p-10 flex flex-col md:flex-row items-center gap-8 overflow-hidden"
                    aria-hidden={false}
                >
                    <div
                        className="flex-1 text-center md:text-left"
                    >
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                            Sajian Kue & Roti Premium
                        </h1>
                        <p className="mt-4 text-gray-600 max-w-2xl">
                            Nikmati koleksi kue buatan tangan kami. Klik produk untuk melihat detail — Anda akan diminta masuk terlebih dahulu.
                        </p>
                        <div className="mt-6 flex items-center justify-center md:justify-start gap-4">
                            <button
                                onClick={() => navigate("/auth")}
                                className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-600 transition-colors"
                            >
                                Masuk / Daftar
                            </button>
                            <button
                                onClick={() => window.scrollTo({ top: 520, behavior: "smooth" })}
                                className="px-6 py-3 border border-gray-200 text-gray-800 rounded-full hover:bg-gray-50 transition-colors"
                            >
                                Lihat Produk
                            </button>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div
                            className="w-full h-56 rounded-xl shadow-inner bg-cover bg-center flex items-end"
                            style={{
                                backgroundImage:
                                    "url('https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,f_auto,q_auto:best,w_640/v1634025439/01h8158tbj9qn5e5ts9nzzxx1x.jpg')",
                            }}
                        >
                            <div className="bg-gradient-to-t from-black/50 to-transparent w-full p-4 rounded-b-xl text-white text-right">
                                <div className="text-sm">Cakes & Pastries</div>
                                <div className="font-semibold">Freshly baked everyday</div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 pb-24 space-y-12">
                {loading && (
                    <div className="text-center text-gray-500">Memuat produk...</div>
                )}
                {error && (
                    <div className="text-center text-red-500">Error: {error}</div>
                )}

                {!loading && !error && (
                    <>
                        {/* Helper to render a section */}
                        {[
                            { key: "featured", title: "Featured Produk", subtitle: "Pilihan terbaik", items: featured },
                            { key: "new", title: "New Arrivals", subtitle: "Baru masuk", items: newArrivals },
                            { key: "best", title: "Best Seller", subtitle: "Favorit pelanggan", items: bestSeller },
                        ].map((section) =>
                            (section.items && section.items.length > 0) ? (
                                <section key={section.key} className="bg-white rounded-2xl shadow-lg p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-800">{section.title}</h2>
                                            <p className="text-sm text-gray-500 mt-1">{section.subtitle}</p>
                                        </div>
                                        <button
                                            onClick={() => navigate("/auth")}
                                            className="text-sm text-amber-600 font-semibold hover:underline"
                                        >
                                            Lihat Semua
                                        </button>
                                    </div>

                                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                                        {section.items.map((p) => (
                                            <article
                                                key={p.id}
                                                onClick={handleProductClick}
                                                className="cursor-pointer bg-gray-50 rounded-xl p-4 hover:shadow-xl transition-shadow"
                                                role="button"
                                            >
                                                <div className="w-full h-36 bg-white rounded-lg shadow-sm flex items-center justify-center text-amber-500 font-semibold overflow-hidden">
                                                    {p.foto_produk ? (
                                                        <img
                                                            src={p.foto_produk}
                                                            alt={p.nama_produk || "produk"}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="p-4 text-center">{p.nama_produk || "Produk"}</div>
                                                    )}
                                                </div>
                                                <div className="mt-4">
                                                    <h3 className="text-lg font-semibold text-gray-800">{p.nama_produk || "Nama Produk"}</h3>
                                                    <p className="text-sm text-gray-500 mt-1">{p.deskripsi || "-"}</p>
                                                    <div className="mt-3 flex items-center justify-between">
                                                        <span className="text-amber-600 font-bold">{p.harga ? `Rp${p.harga}` : "-"}</span>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); navigate("/auth"); }}
                                                            className="px-3 py-1 bg-amber-500 text-white rounded-full text-sm hover:bg-amber-600 transition-colors"
                                                        >
                                                            Lihat
                                                        </button>
                                                    </div>
                                                </div>
                                            </article>
                                        ))}
                                    </div>

                                    <p className="mt-4 text-xs text-gray-400">
                                        Klik produk untuk melihat detail. Anda akan diarahkan ke halaman masuk jika belum terautentikasi.
                                    </p>
                                </section>
                            ) : null
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default Landing;