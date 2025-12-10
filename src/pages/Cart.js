import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";

const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    let user;
    const token = localStorage.getItem("token");
    if (token) {
        try {
            user = jwtDecode(token);
        } catch {
            console.error("Token tidak valid");
        }
    }
    useEffect(() => {
        loadCart();
    }, []);

    useEffect(() => {
        calculateTotal();
    }, [cartItems]);

    const loadCart = async () => {
        const res = await fetch(`http://localhost:3001/api/cart?id=${user.id}`);
        const cart = await res.json();
        setCartItems(cart);
    };

    console.log("Cart data:", cartItems);
    const calculateTotal = () => {
        const sum = cartItems.reduce(
            (acc, item) => acc + item.produk.harga * item.quantity,
            0
        );
        setTotal(sum);
    };

    const handleRemoveItem = async (id) => {
        const res = await fetch(
            `http://localhost:3001/api/cart/${user.id}/${id}`,
            {
                method: "DELETE",
            }
        );
        const data = await res.json();
        const newCart = cartItems.filter((item) => item.id !== id);
        setCartItems(newCart);
        toast.success("Item dihapus");
    };

    const handleUpdateQuantity = async (id, newQuantity) => {
        if (newQuantity <= 0) {
            handleRemoveItem(id);
            return;
        }

        const res = await fetch(
            `http://localhost:3001/api/cart/${user.id}/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ quantity: newQuantity }),
            }
        );

        const updatedCart = cartItems.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCart);
    };

    const handleClearCart = () => {
        const clear = async () => {
            const res = await fetch(
                `http://localhost:3001/api/cart?id=${user.id}`,
                {
                    method: "DELETE",
                }
            );
            setCartItems([]);
        };
        clear();
    };

    const handleCheckout = async () => {
        const toastId = toast.loading("Memproses pesanan...");

        try {
            const res = await fetch(
                `http://localhost:3001/api/order/create?id=${user.id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        items: cartItems.map((item) => ({
                            produkId: item.produkId,
                            nama_produk: item.produk.nama_produk,
                            harga: item.produk.harga,
                            quantity: item.quantity,
                        })),
                    }),
                }
            );

            const data = await res.json();

            if (res.ok) {
                // Update loading jadi sukses
                toast.success("Order berhasil dibuat!", { id: toastId });

                setCartItems([]);

                // Beri jeda sedikit agar user sempat baca notif sebelum pindah halaman
                setTimeout(() => {
                    navigate("/payment", {
                        state: {
                            total: total,
                            cartItems: cartItems,
                        },
                    });
                }, 1000);
            } else {
                // Update loading jadi error
                toast.error(`Gagal: ${data.error}`, { id: toastId });
            }
        } catch (error) {
            toast.error("Terjadi kesalahan koneksi", { id: toastId });
        }
    };

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

                    <h1 className="text-4xl font-bold text-gray-900 mb-8">
                        🛒 Keranjang Belanja
                    </h1>

                    {cartItems.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
                            <p className="text-2xl text-gray-500 mb-6">
                                Keranjang Anda kosong
                            </p>
                            <button
                                onClick={() => navigate("/home")}
                                className="px-6 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors font-semibold"
                            >
                                Lanjut Belanja
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Items List */}
                            <div className="lg:col-span-2 space-y-4">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-white rounded-2xl shadow-lg p-6 flex gap-6"
                                    >
                                        {/* Gambar */}
                                        <div className="w-32 h-32 flex-shrink-0">
                                            {item.produk.foto_produk ? (
                                                <img
                                                    src={
                                                        item.produk.foto_produk
                                                    }
                                                    alt={
                                                        item.produk.nama_produk
                                                    }
                                                    className="w-full h-full object-cover rounded-xl"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-amber-100 rounded-xl flex items-center justify-center text-amber-700 font-semibold text-center p-2">
                                                    {item.produk.nama_produk}
                                                </div>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900">
                                                {item.produk.nama_produk}
                                            </h3>
                                            <p className="text-amber-600 font-bold text-lg mt-2">
                                                Rp
                                                {item.produk.harga?.toLocaleString()}
                                            </p>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-3 mt-4">
                                                <button
                                                    onClick={() =>
                                                        handleUpdateQuantity(
                                                            item.id,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                    className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors font-bold"
                                                >
                                                    −
                                                </button>
                                                <span className="text-lg font-bold w-8 text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        handleUpdateQuantity(
                                                            item.id,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                    className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors font-bold"
                                                >
                                                    +
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleRemoveItem(
                                                            item.id
                                                        )
                                                    }
                                                    className="ml-auto px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors font-semibold text-sm"
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        </div>

                                        {/* Subtotal */}
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500 mb-2">
                                                Subtotal
                                            </p>
                                            <p className="text-2xl font-bold text-amber-600">
                                                Rp
                                                {(
                                                    item.produk.harga *
                                                    item.quantity
                                                ).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Summary */}
                            <div className="bg-white rounded-2xl shadow-2xl p-8 h-fit">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    Ringkasan Pesanan
                                </h2>

                                <div className="space-y-4 mb-6 border-t-2 border-gray-200 pt-4">
                                    <div className="flex justify-between text-gray-700">
                                        <span>Total Harga</span>
                                        <span>Rp{total.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-700">
                                        <span>Ongkos Kirim</span>
                                        <span className="text-amber-600 font-semibold">
                                            Gratis
                                        </span>
                                    </div>
                                </div>

                                <div className="border-t-2 border-gray-200 pt-4 mb-6">
                                    <div className="flex justify-between text-xl font-bold text-gray-900">
                                        <span>Total</span>
                                        <span className="text-amber-600">
                                            Rp{total.toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    className="w-full py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors font-bold text-lg mb-3"
                                >
                                    Lanjut ke Pembayaran
                                </button>

                                <button
                                    onClick={handleClearCart}
                                    className="w-full py-3 border-2 border-red-500 text-red-500 rounded-full hover:bg-red-50 transition-colors font-semibold"
                                >
                                    Kosongkan Keranjang
                                </button>
                            </div>
                        </div>
                    )}
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
                    <p className="text-sm text-amber-100">
                        Sajian kue dan roti premium untuk setiap momen spesial
                        Anda.
                    </p>
                </div>

                <div>
                    <h4 className="font-semibold mb-3">Menu</h4>
                    <ul className="text-sm space-y-2 text-amber-100">
                        <li
                            className="cursor-pointer hover:text-white transition-colors"
                            onClick={() => navigate("/home")}
                        >
                            All Products
                        </li>
                        <li
                            className="cursor-pointer hover:text-white transition-colors"
                            onClick={() => navigate("/home")}
                        >
                            Best Seller
                        </li>
                        <li
                            className="cursor-pointer hover:text-white transition-colors"
                            onClick={() => navigate("/home")}
                        >
                            Latest
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-3">Customer</h4>
                    <ul className="text-sm space-y-2 text-amber-100">
                        <li
                            className="cursor-pointer hover:text-white transition-colors"
                            onClick={() => navigate("/about-us")}
                        >
                            About Us
                        </li>
                        <li
                            className="cursor-pointer hover:text-white transition-colors"
                            onClick={() => navigate("/contact")}
                        >
                            Contact
                        </li>
                        <li className="cursor-pointer hover:text-white transition-colors">
                            FAQ
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-3">Follow Us</h4>
                    <div className="flex gap-4 text-sm">
                        <a
                            href="https://facebook.com/jbakery"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cursor-pointer hover:text-yellow-200 transition-colors"
                        >
                            Facebook
                        </a>
                        <a
                            href="https://instagram.com/jbakery"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cursor-pointer hover:text-yellow-200 transition-colors"
                        >
                            Instagram
                        </a>
                        <a
                            href="https://twitter.com/jbakery"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cursor-pointer hover:text-yellow-200 transition-colors"
                        >
                            Twitter
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-amber-600 mt-8 pt-8 text-center text-sm text-amber-100">
                <p>&copy; 2025 JBakery. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Cart;
