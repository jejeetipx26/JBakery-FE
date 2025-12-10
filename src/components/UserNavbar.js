import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserNavbar = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    let user;
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                user = jwtDecode(token);
                setIsAdmin(user.role === "admin");
            } catch {
                console.error("Token tidak valid");
            }
        }

        const fetchCartCount = async () => {
            try {
                const res = await fetch("http://localhost:3001/api/cart/count?id=" + user.id)
                const data = await res.json();
                setCartCount(data.count);
            }catch(error){
                console.error("Gagal mengambil data cart count:", error);
            }
        }

        fetchCartCount();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/auth");
    };

    const scrollToSection = (id) => {
        navigate("/home");
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="w-full bg-gradient-to-r from-amber-50 to-yellow-50 py-4 px-6 flex justify-center shadow-sm">
            <nav className="w-full max-w-6xl bg-white rounded-full shadow-md px-6 py-3 flex items-center justify-between border-2 border-amber-100">
                
                {/* Left */}
                <div className="flex items-center gap-8">
                    <div
                        className="flex items-center gap-2 cursor-pointer hover:opacity-80"
                        onClick={() => navigate("/home")}
                    >
                        <img src="/logo.png" alt="Logo" className="h-8 w-auto rounded-xl" />
                        <span className="text-xl font-semibold text-amber-700">JBakery</span>
                    </div>

                    <ul className="hidden md:flex items-center gap-8 text-amber-700 font-medium">
                        <li onClick={() => scrollToSection("all-menu")} className="cursor-pointer hover:text-amber-900">All Menu</li>
                        <li onClick={() => scrollToSection("best-seller")} className="cursor-pointer hover:text-amber-900">Best Seller</li>
                        <li onClick={() => scrollToSection("latest")} className="cursor-pointer hover:text-amber-900">Latest</li>
                    </ul>
                </div>

                {/* Right */}
                <div className="flex items-center gap-4">

                    <button onClick={() => navigate("/history")} className="relative hidden md:flex w-10 h-10 text-2xl text-amber-700 hover:text-amber-900">
                        📋
                    </button>

                    <button onClick={() => navigate("/cart")} className="relative hidden md:flex w-10 h-10 text-2xl text-amber-700 hover:text-amber-900">
                        🛒
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {isAdmin && (
                        <button
                            onClick={() => navigate("/produk")}
                            className="hidden md:block px-4 py-2 font-bold text-amber-900 rounded-full hover:bg-amber-50 border-r-2 border-amber-300"
                        >
                            📊 Dashboard
                        </button>
                    )}

                    <button
                        onClick={handleLogout}
                        className="hidden md:block bg-red-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default UserNavbar;