import { useNavigate } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar';

const AboutUs = () => {
    const navigate = useNavigate();

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

                    <div className="bg-white rounded-2xl shadow-2xl p-12 mb-12">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6 text-center">
                            Tentang <span className="text-amber-600">JBakery</span>
                        </h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
                            {/* Gambar */}
                            <div className="flex items-center justify-center">
                                <div className="w-full h-80 bg-gradient-to-br from-amber-200 to-yellow-200 rounded-2xl flex items-center justify-center text-amber-700 font-bold text-5xl">
                                    🍰
                                </div>
                            </div>

                            {/* Konten */}
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">Cerita JBakery</h2>
                                <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                                    JBakery adalah toko kue online yang didirikan dengan passion untuk menghadirkan kue berkualitas premium ke setiap rumah Anda. Kami berkomitmen menggunakan bahan-bahan pilihan terbaik dan resep autentik untuk menciptakan cita rasa yang tak terlupakan.
                                </p>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Sejak awal berdiri, JBakery telah melayani ribuan pelanggan setia dengan produk berkualitas tinggi dan layanan terbaik. Setiap kue yang kami buat adalah hasil karya seni yang dibuat dengan penuh cinta dan dedikasi.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            <div className="bg-amber-50 rounded-xl p-8 text-center">
                                <h3 className="text-4xl font-bold text-amber-600 mb-2">500+</h3>
                                <p className="text-gray-700 font-semibold">Pelanggan Puas</p>
                            </div>
                            <div className="bg-amber-50 rounded-xl p-8 text-center">
                                <h3 className="text-4xl font-bold text-amber-600 mb-2">50+</h3>
                                <p className="text-gray-700 font-semibold">Varian Produk</p>
                            </div>
                            <div className="bg-amber-50 rounded-xl p-8 text-center">
                                <h3 className="text-4xl font-bold text-amber-600 mb-2">5★</h3>
                                <p className="text-gray-700 font-semibold">Rating Rata-rata</p>
                            </div>
                        </div>

                        <div className="border-t-2 border-gray-200 pt-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">Nilai-Nilai Kami</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div>
                                    <h3 className="text-xl font-bold text-amber-600 mb-3">🎯 Kualitas</h3>
                                    <p className="text-gray-600">Kami tidak pernah berkompromi dengan kualitas. Setiap produk melalui quality control yang ketat.</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-amber-600 mb-3">💝 Kepedulian</h3>
                                    <p className="text-gray-600">Kami peduli dengan kepuasan pelanggan dan selalu siap memberikan layanan terbaik.</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-amber-600 mb-3">🌟 Inovasi</h3>
                                    <p className="text-gray-600">Kami terus berinovasi menghadirkan rasa dan desain kue yang unik dan menarik.</p>
                                </div>
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

export default AboutUs;