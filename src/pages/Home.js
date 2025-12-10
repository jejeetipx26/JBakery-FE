import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";

const Home = () => {
    const [userName, setUserName] = useState("");
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
    const navigate = useNavigate();
    const [bestSellers, setBestSellers] = useState([]);

    const PRODUCT_API = "http://localhost:3001/api/produk";
    const CATEGORY_API = "http://localhost:3001/api/kategori";
    const BEST_SELLER_API = "http://localhost:3001/api/produk/best-seller";

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserName(decodedToken.nama);
            } catch (error) {
                console.error(
                    "Token tidak valid, mengarahkan ke login.",
                    error
                );
                handleLogout();
            }
        } else {
            navigate("/auth");
        }
    }, [navigate]);

    useEffect(() => {
        // Fetch produk dan kategori
        const fetchData = async () => {
            setLoading(true);
            try {
                const [prodRes, katRes, bestRes] = await Promise.all([
                    fetch(PRODUCT_API),
                    fetch(CATEGORY_API),
                    fetch(BEST_SELLER_API),
                ]);

                if (!prodRes.ok || !katRes.ok)
                    throw new Error("Gagal mengambil data");

                const prodData = await prodRes.json();
                const katData = await katRes.json();
                const bestData = await bestRes.json();

                setProducts(Array.isArray(prodData) ? prodData : []);
                setCategories(Array.isArray(katData) ? katData : []);
                setBestSellers(Array.isArray(bestData) ? bestData : []);
            } catch (err) {
                setError(err.message || "Error");
                setProducts([]);
                setCategories([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        // Auto slide carousel setiap 5 detik
        const interval = setInterval(() => {
            setCurrentCarouselIndex(
                (prev) => (prev + 1) % Math.max(products.length, 1)
            );
        }, 5000);
        return () => clearInterval(interval);
    }, [products.length]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/auth");
    };

    if (!userName) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                Loading...
            </div>
        );
    }

    const getLatestProducts = () => products.slice(0, 6);
    const getProductsByCategory = (categoryId) =>
        products.filter((p) => p.kategoriId === categoryId).slice(0, 6);

    const ProductCard = ({ product }) => (
        <div
            onClick={() => navigate(`/product/${product.id}`)}
            className="flex-shrink-0 w-48 bg-gray-50 rounded-xl p-4 hover:shadow-xl transition-shadow hover:scale-105 duration-300 cursor-pointer"
        >
            <div className="w-full h-32 bg-white rounded-lg shadow-sm flex items-center justify-center text-amber-500 font-semibold overflow-hidden mb-3">
                {product.foto_produk ? (
                    <img
                        src={product.foto_produk}
                        alt={product.nama_produk}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="p-2 text-center text-sm">
                        {product.nama_produk}
                    </div>
                )}
            </div>
            <div>
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                    {product.nama_produk}
                </h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                    {product.deskripsi || "-"}
                </p>
                <div className="mt-3 flex items-center justify-between">
                    <span className="text-amber-600 font-bold text-sm">
                        {product.harga
                            ? `Rp${(product.harga / 1000).toFixed(0)}k`
                            : "-"}
                    </span>
                    <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            product.stok > 0
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                        }`}
                    >
                        {product.stok > 0 ? `${product.stok}` : "Habis"}
                    </span>
                </div>
            </div>
        </div>
    );

    const HorizontalSection = ({
        id,
        title,
        products: sectionProducts,
        icon,
    }) => (
        <section
            id={id}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8 scroll-mt-24"
        >
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    {icon} {title}
                </h2>
                <span className="text-sm text-gray-500">
                    Geser ke kanan untuk lihat lebih banyak
                </span>
            </div>

            <div className="overflow-x-auto pb-4 flex gap-6">
                {sectionProducts && sectionProducts.length > 0 ? (
                    sectionProducts.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))
                ) : (
                    <p className="text-gray-500 text-center w-full">
                        Tidak ada produk
                    </p>
                )}
            </div>
        </section>
    );

    return (
        <>
            <UserNavbar />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Carousel Produk */}
                    {!loading && !error && products.length > 0 && (
                        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden mb-12 h-96">
                            <div className="relative w-full h-full">
                                {/* Carousel Items */}
                                {products.slice(0, 6).map((product, index) => (
                                    <div
                                        key={product.id}
                                        className={`absolute w-full h-full transition-opacity duration-1000 ${
                                            index === currentCarouselIndex
                                                ? "opacity-100"
                                                : "opacity-0"
                                        }`}
                                    >
                                        <div className="flex items-center justify-between h-full px-8">
                                            {/* Image */}
                                            <div className="w-1/2 flex items-center justify-center">
                                                {product.foto_produk ? (
                                                    <img
                                                        src={
                                                            product.foto_produk
                                                        }
                                                        alt={
                                                            product.nama_produk
                                                        }
                                                        className="h-80 object-cover rounded-xl"
                                                    />
                                                ) : (
                                                    <div className="w-full h-80 bg-amber-100 rounded-xl flex items-center justify-center text-amber-700 font-semibold">
                                                        {product.nama_produk}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="w-1/2 pl-8">
                                                <h2 className="text-4xl font-bold text-gray-900 mb-2">
                                                    {product.nama_produk}
                                                </h2>
                                                <p className="text-gray-600 text-lg mb-4 line-clamp-3">
                                                    {product.deskripsi ||
                                                        "Produk pilihan dari koleksi kami"}
                                                </p>
                                                <div className="flex items-center gap-4 mb-6">
                                                    <span className="text-3xl font-bold text-amber-600">
                                                        {product.harga
                                                            ? `Rp${product.harga.toLocaleString()}`
                                                            : "-"}
                                                    </span>
                                                    <span
                                                        className={`px-4 py-2 rounded-full font-semibold ${
                                                            product.stok > 0
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-red-100 text-red-800"
                                                        }`}
                                                    >
                                                        {product.stok > 0
                                                            ? `Stok: ${product.stok}`
                                                            : "Habis"}
                                                    </span>
                                                </div>
                                                <button className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-full hover:bg-amber-700 transition-colors">
                                                    Lihat Detail
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Navigation Buttons */}
                            <button
                                onClick={() =>
                                    setCurrentCarouselIndex((prev) =>
                                        prev === 0
                                            ? Math.min(products.length - 1, 5)
                                            : prev - 1
                                    )
                                }
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-amber-50 rounded-full p-3 shadow-lg z-10 transition-colors"
                            >
                                ❮
                            </button>
                            <button
                                onClick={() =>
                                    setCurrentCarouselIndex(
                                        (prev) =>
                                            (prev + 1) %
                                            Math.min(products.length, 6)
                                    )
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-amber-50 rounded-full p-3 shadow-lg z-10 transition-colors"
                            >
                                ❯
                            </button>

                            {/* Dots Indicator */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                {products.slice(0, 6).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() =>
                                            setCurrentCarouselIndex(index)
                                        }
                                        className={`w-3 h-3 rounded-full transition-all ${
                                            index === currentCarouselIndex
                                                ? "bg-amber-600 w-8"
                                                : "bg-gray-300 hover:bg-gray-400"
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Main Content */}
                    {loading && (
                        <div className="text-center text-gray-500 py-12">
                            Memuat produk...
                        </div>
                    )}
                    {error && (
                        <div className="text-center text-red-500 py-12">
                            Error: {error}
                        </div>
                    )}

                    {!loading && !error && (
                        <>
                            {/* All Menu */}
                            {products.length > 0 && (
                                <HorizontalSection
                                    id="all-menu"
                                    title="All Menu"
                                    products={products.slice(0, 6)}
                                    icon=""
                                />
                            )}

                            {/* Best Seller (Updated Logic) */}
                            {bestSellers.length > 0 && (
                                <HorizontalSection
                                    id="best-seller"
                                    title="Best Seller"
                                    products={bestSellers}
                                    icon=""
                                />
                            )}

                            {/* Latest */}
                            {getLatestProducts().length > 0 && (
                                <HorizontalSection
                                    id="latest"
                                    title="Latest"
                                    products={getLatestProducts()}
                                    icon=""
                                />
                            )}

                            {/* Kategori Sections */}
                            {categories.length > 0 && (
                                <>
                                    <div className="my-12 border-t-2 border-gray-200 pt-8">
                                        <h2 className="text-3xl font-bold text-gray-800 mb-8">
                                            Jelajahi Kategori
                                        </h2>
                                    </div>

                                    {categories.map((category) => {
                                        const categoryProducts =
                                            getProductsByCategory(category.id);
                                        return categoryProducts.length > 0 ? (
                                            <HorizontalSection
                                                key={category.id}
                                                id={`section-category-${category.id}`}
                                                title={category.nama_kategori}
                                                products={categoryProducts}
                                                icon=""
                                            />
                                        ) : null;
                                    })}
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gradient-to-r from-amber-700 to-amber-800 text-white py-12 px-6 mt-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3
                            className="text-xl font-bold mb-4 cursor-pointer hover:text-amber-200 transition-colors"
                            onClick={() => navigate("/home")}
                        >
                            <img
                                src="/logo.png"
                                alt="Logo"
                                className="w-8 h-8"
                            />
                        </h3>
                        <p className="text-sm text-amber-100">
                            Sajian kue dan roti premium untuk setiap momen
                            spesial Anda.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3">Menu</h4>
                        <ul className="text-sm space-y-2 text-amber-100">
                            <li
                                className="cursor-pointer hover:text-white transition-colors"
                                onClick={() => {
                                    navigate("/home");
                                    setTimeout(() => {
                                        document
                                            .getElementById("all-menu")
                                            ?.scrollIntoView({
                                                behavior: "smooth",
                                            });
                                    }, 100);
                                }}
                            >
                                All Products
                            </li>
                            <li
                                className="cursor-pointer hover:text-white transition-colors"
                                onClick={() => {
                                    navigate("/home");
                                    setTimeout(() => {
                                        document
                                            .getElementById("best-seller")
                                            ?.scrollIntoView({
                                                behavior: "smooth",
                                            });
                                    }, 100);
                                }}
                            >
                                Best Seller
                            </li>
                            <li
                                className="cursor-pointer hover:text-white transition-colors"
                                onClick={() => {
                                    navigate("/home");
                                    setTimeout(() => {
                                        document
                                            .getElementById("latest")
                                            ?.scrollIntoView({
                                                behavior: "smooth",
                                            });
                                    }, 100);
                                }}
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
                            <li
                                className="cursor-pointer hover:text-white transition-colors"
                                onClick={() => navigate("/faq")}
                            >
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
        </>
    );
};

export default Home;
