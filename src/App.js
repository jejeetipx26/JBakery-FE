
import { Navigate, Route, Routes } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import MainLayout from "./layouts/MainLayout";
import AboutUs from "./pages/AboutUs";
import AuthForm from "./pages/AuthForm";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Home from "./pages/Home";
import Kategori from "./pages/Kategori";
import Landing from "./pages/Landing";
import OrderHistory from "./pages/OrderHistory";
import OrdersPage from "./pages/Orders";
import Payment from "./pages/Payment";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import Rasa from "./pages/Rasa";

function App() {
    return (
        <Routes>
            {/* ===== Halaman Landing Publik ===== */}
            <Route path="/" element={<Landing />} />

            {/* ===== Rute Publik (Tidak perlu login) ===== */}
            <Route path="/auth" element={<AuthForm />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} /> {/* Tambah ini */}

            {/* ===== Rute Terproteksi (Harus login) ===== */}
            <Route element={<RequireAuth />}>
                
                {/* Rute HANYA UNTUK PENGGUNA BIASA (dan admin juga bisa) */}
                <Route path="/home" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/history" element={<OrderHistory />} />

                {/* Grup rute HANYA UNTUK ADMIN */}
                <Route element={<RequireAuth adminOnly={true} />}>
                    <Route element={<MainLayout />}>
                        <Route path="/produk" element={<Product />} />
                        <Route path="/kategori" element={<Kategori />} />
                        <Route path="/rasa" element={<Rasa />} />
                        <Route path="/orders" element={<OrdersPage />} />
                    </Route>
                </Route>

                {/* Redirect dari /internal ke halaman yang sesuai */}
                <Route path="/internal" element={<Navigate to="/home" replace />} />

            </Route>

            {/* ===== Rute Fallback (Jika URL tidak ditemukan) ===== */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;