import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar';

const OrderHistory = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const API_URL = "http://localhost:3001/api/orders/my-orders";

    useEffect(() => {
        fetchMyOrders();
    }, []);

    const fetchMyOrders = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(API_URL, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!res.ok) throw new Error('Gagal mengambil riwayat pesanan');
            const data = await res.json();
            setOrders(data);
            setError(null);
        } catch (err) {
            console.error("Error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const filteredOrders = filterStatus === 'all'
        ? orders
        : orders.filter(order => order.status === filterStatus);

    const getStatusColor = (status) => {
        const colors = {
            'pending': 'bg-yellow-100 text-yellow-800',
            'confirmed': 'bg-blue-100 text-blue-800',
            'shipped': 'bg-purple-100 text-purple-800',
            'delivered': 'bg-green-100 text-green-800',
            'cancelled': 'bg-red-100 text-red-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getStatusLabel = (status) => {
        const labels = {
            'pending': 'Pending',
            'confirmed': 'Dikonfirmasi',
            'shipped': 'Dikirim',
            'delivered': 'Diterima',
            'cancelled': 'Dibatalkan'
        };
        return labels[status] || 'Unknown';
    };

    return (
        <>
            <UserNavbar />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-6 px-4 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors"
                    >
                        ← Kembali
                    </button>

                    <h1 className="text-4xl font-bold text-gray-900 mb-8">Riwayat Pesanan Saya</h1>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <div className="text-center py-12">
                            <p className="text-lg text-gray-600">Memuat riwayat pesanan...</p>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                            <p className="text-2xl text-gray-500 mb-6">Belum ada pesanan</p>
                            <button
                                onClick={() => navigate('/home')}
                                className="px-6 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors font-semibold"
                            >
                                Lanjut Belanja
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Filter Status */}
                            <div className="mb-6 flex gap-2 flex-wrap">
                                <button
                                    onClick={() => setFilterStatus('all')}
                                    className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                                        filterStatus === 'all'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                    }`}
                                >
                                    Semua ({orders.length})
                                </button>
                                <button
                                    onClick={() => setFilterStatus('pending')}
                                    className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                                        filterStatus === 'pending'
                                            ? 'bg-yellow-600 text-white'
                                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                    }`}
                                >
                                    Pending ({orders.filter(o => o.status === 'pending').length})
                                </button>
                                <button
                                    onClick={() => setFilterStatus('confirmed')}
                                    className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                                        filterStatus === 'confirmed'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                    }`}
                                >
                                    Dikonfirmasi ({orders.filter(o => o.status === 'confirmed').length})
                                </button>
                                <button
                                    onClick={() => setFilterStatus('shipped')}
                                    className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                                        filterStatus === 'shipped'
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                    }`}
                                >
                                    Dikirim ({orders.filter(o => o.status === 'shipped').length})
                                </button>
                                <button
                                    onClick={() => setFilterStatus('delivered')}
                                    className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                                        filterStatus === 'delivered'
                                            ? 'bg-green-600 text-white'
                                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                    }`}
                                >
                                    Diterima ({orders.filter(o => o.status === 'delivered').length})
                                </button>
                            </div>

                            {/* Orders List */}
                            <div className="space-y-4">
                                {filteredOrders.map((order) => (
                                    <div key={order.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900">Pesanan #{order.id}</h3>
                                                <p className="text-sm text-gray-600">
                                                    {new Date(order.created_at).toLocaleDateString('id-ID', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                            </div>
                                            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                                                {getStatusLabel(order.status)}
                                            </span>
                                        </div>

                                        <div className="mb-4 pb-4 border-b border-gray-200">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm text-gray-600">Total Harga</p>
                                                    <p className="text-2xl font-bold text-amber-600">
                                                        Rp{order.total?.toLocaleString() || '0'}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600">Jumlah Item</p>
                                                    <p className="text-2xl font-bold text-gray-900">
                                                        {order.items?.length || 0} item
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Items Preview */}
                                        <div className="mb-4">
                                            <p className="text-sm font-semibold text-gray-700 mb-2">Produk:</p>
                                            <div className="space-y-1">
                                                {order.items?.slice(0, 3).map((item, idx) => (
                                                    <p key={idx} className="text-sm text-gray-600">
                                                        • {item.nama_produk} x {item.quantity}
                                                    </p>
                                                ))}
                                                {order.items?.length > 3 && (
                                                    <p className="text-sm text-gray-600">
                                                        • +{order.items.length - 3} produk lainnya
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => {
                                                setSelectedOrder(order);
                                                setShowModal(true);
                                            }}
                                            className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold"
                                        >
                                            Lihat Detail
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Detail Modal */}
            {showModal && selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
                        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Detail Pesanan #{selectedOrder.id}
                            </h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-2xl text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Informasi Pesanan */}
                            <div className="pb-4 border-b border-gray-200">
                                <p className="text-sm text-gray-600 mb-2">
                                    <span className="font-semibold">Tanggal Pesanan:</span> {new Date(selectedOrder.created_at).toLocaleDateString('id-ID')}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-semibold">Status:</span> {getStatusLabel(selectedOrder.status)}
                                </p>
                            </div>

                            {/* Detail Produk */}
                            <div className="pb-4 border-b border-gray-200">
                                <h3 className="font-bold text-gray-900 mb-3">Produk Pesanan</h3>
                                {selectedOrder.items && selectedOrder.items.length > 0 ? (
                                    <div className="space-y-2">
                                        {selectedOrder.items.map((item, idx) => (
                                            <div key={idx} className="flex justify-between bg-gray-50 p-3 rounded">
                                                <div>
                                                    <p className="font-semibold text-gray-900">{item.nama_produk}</p>
                                                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold text-amber-600">Rp{item.harga?.toLocaleString()}</p>
                                                    <p className="text-sm text-gray-600">Total: Rp{(item.harga * item.quantity).toLocaleString()}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500">Tidak ada item</p>
                                )}
                            </div>

                            {/* Total */}
                            <div className="bg-amber-50 p-4 rounded pb-4 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-gray-900">Total Pesanan:</span>
                                    <span className="font-bold text-amber-600 text-xl">Rp{selectedOrder.total?.toLocaleString() || '0'}</span>
                                </div>
                            </div>

                            {/* Informasi Pengiriman */}
                            {selectedOrder.customer_address && (
                                <div className="pb-4">
                                    <h3 className="font-bold text-gray-900 mb-2">Alamat Pengiriman</h3>
                                    <p className="text-sm text-gray-700">{selectedOrder.customer_address}</p>
                                </div>
                            )}

                            <button
                                onClick={() => setShowModal(false)}
                                className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
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
                            <li className="cursor-pointer hover:text-white transition-colors">About Us</li>
                            <li className="cursor-pointer hover:text-white transition-colors">Contact</li>
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
        </>
    );
};

export default OrderHistory;