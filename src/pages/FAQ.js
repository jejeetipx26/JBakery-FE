import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar';

const FAQ = () => {
    const navigate = useNavigate();
    const [openIndex, setOpenIndex] = useState(null);

    const faqData = [
        {
            question: 'Berapa lama waktu pengiriman?',
            answer: 'Pengiriman dilakukan dalam 1-3 hari kerja tergantung lokasi. Untuk area Jakarta dan sekitarnya biasanya 1-2 hari kerja. Anda akan mendapatkan notifikasi tracking saat pesanan dikirim.'
        },
        {
            question: 'Apakah produk JBakery menggunakan bahan berkualitas?',
            answer: 'Iya, semua produk JBakery dibuat menggunakan bahan-bahan pilihan premium. Kami bekerja sama dengan supplier terpercaya dan memiliki standar kualitas yang ketat untuk memastikan setiap produk memenuhi ekspektasi pelanggan.'
        },
        {
            question: 'Bagaimana cara memesan?',
            answer: 'Cara memesan sangat mudah: 1) Login ke akun Anda, 2) Pilih produk yang ingin dibeli, 3) Tambahkan ke keranjang, 4) Lanjutkan ke checkout, 5) Isi data pengiriman dan pembayaran, 6) Selesaikan pembayaran.'
        },
        {
            question: 'Metode pembayaran apa saja yang tersedia?',
            answer: 'Kami menerima berbagai metode pembayaran termasuk: Transfer Bank, GCash, Credit Card, dan Debit Card. Pilih metode yang paling nyaman untuk Anda saat proses checkout.'
        },
        {
            question: 'Apakah saya bisa membatalkan pesanan?',
            answer: 'Pembatalan pesanan bisa dilakukan jika pesanan masih berstatus "Pending". Setelah pesanan dikonfirmasi oleh admin, pembatalan tidak dapat dilakukan. Hubungi customer service kami untuk informasi lebih lanjut.'
        },
        {
            question: 'Bagaimana cara mengetahui status pesanan saya?',
            answer: 'Anda bisa melihat status pesanan di menu "Riwayat Pesanan" atau "History". Status akan diperbarui secara real-time dari Pending → Dikonfirmasi → Dikirim → Diterima.'
        },
        {
            question: 'Apakah ada garansi kualitas produk?',
            answer: 'Ya, kami memberikan garansi kualitas produk. Jika produk yang Anda terima tidak sesuai dengan deskripsi atau rusak saat pengiriman, silakan hubungi customer service kami dalam 24 jam untuk penggantian atau refund.'
        },
        {
            question: 'Bagaimana cara menghubungi customer service?',
            answer: 'Anda bisa menghubungi kami melalui: WhatsApp: +62 812-3456-7890, Email: info@jbakery.com, atau kunjungi halaman Contact kami. Tim kami siap membantu 24/7.'
        },
        {
            question: 'Apakah ada diskon atau promo khusus?',
            answer: 'Kami secara berkala mengadakan promo dan diskon spesial. Ikuti media sosial kami (Facebook, Instagram, Twitter) untuk mendapatkan informasi terbaru tentang promo dan penawaran eksklusif.'
        },
        {
            question: 'Bisa pesan custom cake atau roti sesuai keinginan?',
            answer: 'Tentu bisa! Kami menerima pesanan custom. Hubungi customer service kami melalui WhatsApp untuk mendiskusikan detail pesanan custom Anda termasuk desain, rasa, dan tanggal pengiriman.'
        }
    ];

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            <UserNavbar />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white py-16 px-6">
                    <div className="max-w-6xl mx-auto">
                        <button
                            onClick={() => navigate(-1)}
                            className="mb-6 px-4 py-2 bg-white text-amber-600 rounded-full hover:bg-gray-100 transition-colors font-semibold"
                        >
                            ← Kembali
                        </button>
                        <h1 className="text-4xl font-bold mb-4">Pertanyaan yang Sering Diajukan</h1>
                        <p className="text-lg text-amber-100">Temukan jawaban atas pertanyaan Anda di sini</p>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-4xl mx-auto py-16 px-6">
                    {/* Search Bar */}
                    <div className="mb-12">
                        <input
                            type="text"
                            placeholder="Cari pertanyaan..."
                            className="w-full px-6 py-4 border-2 border-gray-300 rounded-full focus:border-amber-600 focus:outline-none transition-colors shadow-lg"
                        />
                    </div>

                    {/* FAQ Accordion */}
                    <div className="space-y-4">
                        {faqData.map((item, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full px-8 py-6 flex items-center justify-between hover:bg-amber-50 transition-colors"
                                >
                                    <h3 className="text-lg font-semibold text-gray-900 text-left">
                                        {item.question}
                                    </h3>
                                    <span className={`text-2xl text-amber-600 transition-transform duration-300 flex-shrink-0 ml-4 ${
                                        openIndex === index ? 'rotate-180' : ''
                                    }`}>
                                        ▼
                                    </span>
                                </button>

                                {openIndex === index && (
                                    <div className="px-8 py-6 bg-amber-50 border-t-2 border-amber-100">
                                        <p className="text-gray-700 leading-relaxed">
                                            {item.answer}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Still Have Questions */}
                    <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Masih Ada Pertanyaan?</h2>
                        <p className="text-gray-700 mb-6">
                            Jika Anda tidak menemukan jawaban yang Anda cari, silakan hubungi tim customer service kami.
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            <button
                                onClick={() => navigate('/contact')}
                                className="px-8 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors font-semibold"
                            >
                                Hubungi Kami
                            </button>
                            <a
                                href="https://wa.me/6281234567890"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-semibold inline-block"
                            >
                                Chat WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gradient-to-r from-amber-700 to-amber-800 text-white py-12 px-6 mt-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 
                            className="text-xl font-bold mb-4 cursor-pointer hover:text-amber-200 transition-colors"
                            onClick={() => navigate('/home')}
                        >
                            JBakery
                        </h3>
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
                            <li 
                                className="cursor-pointer hover:text-white transition-colors"
                                onClick={() => navigate('/about-us')}
                            >
                                About Us
                            </li>
                            <li 
                                className="cursor-pointer hover:text-white transition-colors"
                                onClick={() => navigate('/contact')}
                            >
                                Contact
                            </li>
                            <li 
                                className="cursor-pointer hover:text-white transition-colors"
                                onClick={() => navigate('/faq')}
                            >
                                FAQ
                            </li>
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
        </>
    );
};

export default FAQ;