import { Book, ClipboardList, Cookie, LogOut, Tag } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
    const location = useLocation();

    const navItems = [
        { name: "Produk", icon: <Book size={20} />, path: "/produk" },
        { name: "Rasa", icon: <Cookie size={20} />, path: "/rasa" },
        { name: "Kategori", icon: <Tag size={20} />, path: "/kategori" },
        { name: "Pesanan", icon: <ClipboardList size={20} />, path: "/orders" },
    ];

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/auth";
    };

    return (
        <div className="w-64 h-screen bg-gray-800 text-white flex flex-col fixed">

            {/* Logo Sidebar */}
            <div className="p-5 border-b border-gray-700">
                <h1 className="text-2xl font-bold">JBakery</h1>
                <p className="text-sm text-gray-400">Dashboard Admin</p>
            </div>

            {/* Menu Navigasi */}
            <nav className="flex-grow p-4">
                <ul>
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <li key={item.name} className="mb-2">
                                <Link
                                    to={item.path}
                                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                                        isActive
                                            ? "bg-amber-500 text-white"
                                            : "text-gray-300 hover:bg-gray-700"
                                    }`}
                                >
                                    {item.icon}
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer Sidebar */}
            <div className="p-5 border-t border-gray-700">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
                >
                    <LogOut size={18} />
                    Logout
                </button>

                <p className="text-xs text-gray-500 mt-2">&copy; 2025 JBakery</p>
            </div>
        </div>
    );
};

export default Sidebar;