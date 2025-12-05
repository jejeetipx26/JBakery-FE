import { QRCodeSVG } from 'qrcode.react';
import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar';

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const qrRef = useRef();
    const ADMIN_PHONE = "628888888888";
    const total = location.state?.total || 0;
    const cartItems = location.state?.cartItems || [];

    const downloadQR = () => {
        const svg = qrRef.current?.querySelector('svg');
        if (svg) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            const svgData = new XMLSerializer().serializeToString(svg);
            const img64 = btoa(svgData);
            const dataUrl = 'data:image/svg+xml;base64,' + img64;
            
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const pngUrl = canvas.toDataURL('image/png');
                const downloadLink = document.createElement('a');
                downloadLink.href = pngUrl;
                downloadLink.download = 'jbakery-qr.png';
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            };
            img.src = dataUrl;
        }
    };

    return (
        <>
            <UserNavbar />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-6 px-4 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors"
                    >
                        ← Kembali
                    </button>

                    <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">💳 Pembayaran</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        {/* QR Code Section */}
                        <div className="bg-white rounded-2xl shadow-2xl p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Scan QR Code</h2>
                            <div className="bg-gray-100 rounded-xl p-8 flex items-center justify-center mb-6" ref={qrRef}>
                                <QRCodeSVG
                                    value={`https://wa.me/${ADMIN_PHONE}?text=Saya%20ingin%20melakukan%20pembayaran%20sebesar%20Rp${total.toLocaleString()}`}
                                    size={256}
                                    level="H"
                                    includeMargin={true}
                                />
                            </div>
                            <button
                                onClick={downloadQR}
                                className="w-full px-4 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors font-semibold mb-4"
                            >
                                📥 Unduh QR Code
                            </button>
                            <p className="text-sm text-gray-600 text-center">
                                Scan QR code di atas untuk membuka WhatsApp admin
                            </p>
                        </div>

                        {/* WhatsApp Section */}
                        <div className="bg-white rounded-2xl shadow-2xl p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Chat WhatsApp</h2>
                            <a
                                href={`https://wa.me/${ADMIN_PHONE}?text=Halo%20JBakery%2C%20saya%20ingin%20melakukan%20pembayaran%20sebesar%20Rp${total.toLocaleString()}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full"
                            >
                                <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl p-12 text-center hover:from-green-500 hover:to-green-700 transition-colors cursor-pointer">
                                    <div className="text-6xl mb-4">💬</div>
                                    <p className="text-white text-lg font-bold mb-4">Klik untuk Chat</p>
                                    <p className="text-green-100 text-sm">
                                        +62 888 8888 8888
                                    </p>
                                </div>
                            </a>
                            <p className="text-sm text-gray-600 text-center mt-4">
                                Chat nomor ini untuk lanjut ke pembayaran
                            </p>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">📋 Ringkasan Pesanan</h2>
                        
                        <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex justify-between items-center pb-4">
                                    <div>
                                        <p className="font-semibold text-gray-900">{item.nama_produk}</p>
                                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t-2 border-gray-200 pt-6">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-700">Subtotal:</span>
                                <span className="text-lg font-bold">Rp{total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-700">Ongkos Kirim:</span>
                                <span className="text-lg font-bold text-green-600">Gratis</span>
                            </div>
                            <div className="flex justify-between items-center bg-amber-50 p-4 rounded-xl">
                                <span className="text-xl font-bold text-gray-900">Total:</span>
                                <span className="text-3xl font-bold text-amber-600">
                                    Rp{total.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8">
                        <h3 className="text-xl font-bold text-blue-900 mb-4">📝 Instruksi Pembayaran</h3>
                        <ol className="space-y-3 text-blue-800">
                            <li className="flex gap-3">
                                <span className="font-bold">1.</span>
                                <span>Scan QR Code atau klik tombol "Chat WhatsApp" di atas</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold">2.</span>
                                <span>Chat admin dengan detail pembayaran Anda</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold">3.</span>
                                <span>Admin akan mengirimkan nomor rekening atau link pembayaran</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold">4.</span>
                                <span>Lakukan pembayaran sesuai instruksi</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold">5.</span>
                                <span>Konfirmasi pembayaran kepada admin untuk pengiriman</span>
                            </li>
                        </ol>
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

export default Payment;