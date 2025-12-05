import { useNavigate } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar';

const Contact = () => {
    const navigate = useNavigate();
    const ADMIN_PHONE = "628888888888"; // Ubah dengan nomor admin Anda (format internasional tanpa +)

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

                    <h1 className="text-5xl font-bold text-gray-900 mb-12 text-center">
                        Hubungi <span className="text-amber-600">JBakery</span>
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {/* WhatsApp */}
                        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center hover:shadow-3xl transition-shadow">
                            <div className="text-6xl mb-4">💬</div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">WhatsApp</h2>
                            <p className="text-gray-600 mb-6">Hubungi kami via WhatsApp untuk pertanyaan cepat dan order</p>
                            <a
                                href={`https://wa.me/${ADMIN_PHONE}?text=Halo%20JBakery%2C%20saya%20ingin%20bertanya...`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors font-semibold"
                            >
                                Chat WhatsApp
                            </a>
                        </div>

                        {/* Email */}
                        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center hover:shadow-3xl transition-shadow">
                            <div className="text-6xl mb-4">📧</div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Email</h2>
                            <p className="text-gray-600 mb-6">Kirim email untuk pertanyaan atau saran</p>
                            <a
                                href="mailto:info@jbakery.com"
                                className="inline-block px-6 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors font-semibold"
                            >
                                Kirim Email
                            </a>
                            <p className="text-gray-700 font-semibold mt-4">info@jbakery.com</p>
                        </div>

                        {/* Telepon */}
                        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center hover:shadow-3xl transition-shadow">
                            <div className="text-6xl mb-4">📞</div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Telepon</h2>
                            <p className="text-gray-600 mb-6">Hubungi kami melalui telepon</p>
                            <a
                                href="tel:+628888888888"
                                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-semibold"
                            >
                                Hubungi
                            </a>
                            <p className="text-gray-700 font-semibold mt-4">+62 888 8888 8888</p>
                        </div>
                    </div>

                    {/* Sosial Media */}
                    <div className="bg-white rounded-2xl shadow-2xl p-12 mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Ikuti Kami di Media Sosial</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Facebook */}
                            <a
                                href="https://facebook.com/jbakery"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-8 text-center transition-colors"
                            >
                                <div className="text-5xl mb-4">f</div>
                                <h3 className="text-2xl font-bold mb-2">Facebook</h3>
                                <p className="text-blue-100">Ikuti halaman Facebook kami</p>
                            </a>

                            {/* Instagram */}
                            <a
                                href="https://instagram.com/jbakery"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl p-8 text-center transition-colors"
                            >
                                <div className="text-5xl mb-4">📷</div>
                                <h3 className="text-2xl font-bold mb-2">Instagram</h3>
                                <p className="text-pink-100">@jbakery - Lihat koleksi terbaru</p>
                            </a>

                            {/* Twitter */}
                            <a
                                href="https://twitter.com/jbakery"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-sky-500 hover:bg-sky-600 text-white rounded-2xl p-8 text-center transition-colors"
                            >
                                <div className="text-5xl mb-4">𝕏</div>
                                <h3 className="text-2xl font-bold mb-2">Twitter</h3>
                                <p className="text-sky-100">@jbakery - Update & promo</p>
                            </a>
                        </div>
                    </div>

                    {/* Map/Address */}
                    <div className="bg-white rounded-2xl shadow-2xl p-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">📍 Lokasi Kami</h2>
                        <div className="bg-gray-200 rounded-xl h-80 flex items-center justify-center text-gray-600 font-semibold">
                            <div className="text-center">
                                <p className="text-2xl mb-4">🏪</p>
                                <p className="text-lg">Jl. Bakery No. 123, Kota Anda</p>
                                <p className="text-lg">Indonesia 12345</p>
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
                        <li className="cursor-pointer hover:text-white transition-colors">All Products</li>
                        <li className="cursor-pointer hover:text-white transition-colors">Best Seller</li>
                        <li className="cursor-pointer hover:text-white transition-colors">Latest</li>
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

export default Contact;