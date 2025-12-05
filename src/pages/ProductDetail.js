import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    let user;
    const token = localStorage.getItem('token');
    if (token) {
            try {
                user = jwtDecode(token);
            } catch {
                console.error("Token tidak valid");
            }
        }

    const PRODUCT_API = `http://localhost:3001/api/produk/${id}`;

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const res = await fetch(PRODUCT_API);
                if (!res.ok) throw new Error("Produk tidak ditemukan");
                const data = await res.json();
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id, PRODUCT_API]);

    const handleAddToCart = async () => {
        if (!product) return;

        const res = await fetch('http://localhost:3001/api/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: user.id,
                produkId: product.id,
                quantity,
            }),
        });

        const data = await res.json();
        if (res.ok) {
            alert('Produk berhasil ditambahkan ke keranjang!');
            navigate('/cart');  
        } else {
            alert(`Gagal menambahkan ke keranjang: ${data.error}`);
        }
    };

    if (loading) return <div className="flex items-center justify-center min-h-screen">Memuat...</div>;
    if (error) return <div className="flex items-center justify-center min-h-screen text-red-500">Error: {error}</div>;
    if (!product) return <div className="flex items-center justify-center min-h-screen">Produk tidak ditemukan</div>;

    return (
        <>
            <UserNavbar />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6">
                <div className="max-w-6xl mx-auto">
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-6 px-4 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors"
                    >
                        ← Kembali
                    </button>

                    <div className="bg-white rounded-2xl shadow-2xl p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Gambar Produk */}
                            <div className="flex items-center justify-center">
                                {product.foto_produk ? (
                                    <img
                                        src={product.foto_produk}
                                        alt={product.nama_produk}
                                        className="w-full h-96 object-cover rounded-xl"
                                    />
                                ) : (
                                    <div className="w-full h-96 bg-amber-100 rounded-xl flex items-center justify-center text-amber-700 font-semibold text-xl">
                                        {product.nama_produk}
                                    </div>
                                )}
                            </div>

                            {/* Detail Produk */}
                            <div>
                                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                    {product.nama_produk}
                                </h1>

                                <p className="text-gray-600 text-lg mb-6 line-clamp-5">
                                    {product.deskripsi || "Tidak ada deskripsi"}
                                </p>

                                {/* Harga */}
                                <div className="mb-6">
                                    <p className="text-sm text-gray-500 mb-2">Harga</p>
                                    <p className="text-4xl font-bold text-amber-600">
                                        Rp{product.harga?.toLocaleString() || "-"}
                                    </p>
                                </div>

                                {/* Stok */}
                                <div className="mb-6">
                                    <p className={`text-lg font-semibold px-4 py-2 rounded-full w-fit ${
                                        product.stok > 0 
                                            ? "bg-green-100 text-green-800" 
                                            : "bg-red-100 text-red-800"
                                    }`}>
                                        {product.stok > 0 ? `Stok: ${product.stok}` : "Produk Habis"}
                                    </p>
                                </div>

                                {/* Kategori */}
                                {product.kategori && (
                                    <div className="mb-6">
                                        <p className="text-sm text-gray-500 mb-2">Kategori</p>
                                        <p className="text-lg font-semibold text-amber-700">
                                            {product.kategori.nama_kategori}
                                        </p>
                                    </div>
                                )}

                                {/* Rasa */}
                                {product.rasas && product.rasas.length > 0 && (
                                    <div className="mb-6">
                                        <p className="text-sm text-gray-500 mb-3">Pilihan Rasa</p>
                                        <div className="flex flex-wrap gap-3">
                                            {product.rasas.map((rasa) => (
                                                <span
                                                    key={rasa.id}
                                                    className="px-4 py-2 bg-amber-50 text-amber-800 rounded-full border-2 border-amber-300 font-medium"
                                                >
                                                    {rasa.nama_rasa}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Quantity & Add to Cart */}
                                <div className="mb-8">
                                    <p className="text-sm text-gray-500 mb-3">Jumlah</p>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors font-bold"
                                        >
                                            −
                                        </button>
                                        <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors font-bold"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Add to Cart Button */}
                                <button
                                    onClick={handleAddToCart}
                                    disabled={product.stok <= 0}
                                    className={`w-full py-4 rounded-full font-bold text-lg transition-colors ${
                                        product.stok > 0
                                            ? "bg-amber-600 text-white hover:bg-amber-700"
                                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    }`}
                                >
                                    🛒 Tambah ke Keranjang
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </>
    );
};

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer className="bg-gradient-to-r from-amber-700 to-amber-800 text-white py-12 px-6 mt-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-4">JBakery</h3>
                    <p className="text-sm text-amber-100">Sajian kue dan roti premium untuk setiap momen spesial Anda.</p>
                </div>

                <div>
                    <h4 className="font-semibold mb-3">Menu</h4>
                    <ul className="text-sm space-y-2 text-amber-100">
                        <li className="cursor-pointer hover:text-white transition-colors" onClick={() => navigate("/home")}>All Products</li>
                        <li className="cursor-pointer hover:text-white transition-colors" onClick={() => navigate("/home")}>Best Seller</li>
                        <li className="cursor-pointer hover:text-white transition-colors" onClick={() => navigate("/home")}>Latest</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-3">Customer</h4>
                    <ul className="text-sm space-y-2 text-amber-100">
                        <li className="cursor-pointer hover:text-white transition-colors" onClick={() => navigate('/about-us')}>About Us</li>
                        <li className="cursor-pointer hover:text-white transition-colors" onClick={() => navigate('/contact')}>Contact</li>
                        <li className="cursor-pointer hover:text-white transition-colors">FAQ</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-3">Follow Us</h4>
                    <div className="flex gap-4 text-sm">
                        <a href="https://facebook.com/jbakery" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-yellow-200 transition-colors">Facebook</a>
                        <a href="https://instagram.com/jbakery" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-yellow-200 transition-colors">Instagram</a>
                        <a href="https://twitter.com/jbakery" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-yellow-200 transition-colors">Twitter</a>
                    </div>
                </div>
            </div>

            <div className="border-t border-amber-600 mt-8 pt-8 text-center text-sm text-amber-100">
                <p>&copy; 2025 JBakery. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default ProductDetail;