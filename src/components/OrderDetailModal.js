import { X } from "lucide-react";

const OrderDetailModal = ({ isOpen, onClose, order, onStatusChange, user }) => {
    if (!isOpen || !order) return null;

    const statusOptions = [
        { value: 'pending', label: 'Pending' },
        { value: 'confirmed', label: 'Dikonfirmasi' },
        { value: 'shipped', label: 'Dikirim' },
        { value: 'delivered', label: 'Diterima' },
        { value: 'cancelled', label: 'Dibatalkan' }
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Detail Pesanan #{order.id}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Informasi Pelanggan */}
                    <div className="border-b pb-4">
                        <h3 className="font-bold text-gray-900 mb-3">Informasi Pelanggan</h3>
                        <div className="space-y-2 text-sm text-gray-700">
                            <p><span className="font-semibold">Nama:</span> {user.nama || '-'}</p>
                            <p><span className="font-semibold">Email:</span> {user.email || '-'}</p>
                            <p><span className="font-semibold">Telepon:</span> {user.nomorTelepon || '-'}</p>
                            <p><span className="font-semibold">Alamat:</span> {user.alamat || '-'}</p>
                        </div>
                    </div>

                    {/* Produk Pesanan */}
                    <div className="border-b pb-4">
                        <h3 className="font-bold text-gray-900 mb-3">Produk Pesanan</h3>
                        {order.items && order.items.length > 0 ? (
                            <div className="space-y-2 text-sm">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between bg-gray-50 p-3 rounded">
                                        <div>
                                            <p className="font-semibold text-gray-900">{item.nama_produk}</p>
                                            <p className="text-gray-600">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-amber-600">Rp{item.harga?.toLocaleString()}</p>
                                            <p className="text-gray-600">Total: Rp{(item.harga * item.quantity).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">Tidak ada item</p>
                        )}
                    </div>

                    {/* Total Pesanan */}
                    <div className="border-b pb-4 bg-amber-50 p-4 rounded">
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-gray-900">Total Pesanan:</span>
                            <span className="font-bold text-amber-600 text-xl">Rp{order.total?.toLocaleString() || '0'}</span>
                        </div>
                    </div>

                    {/* Update Status */}
                    <div>
                        <label className="block font-bold text-gray-900 mb-2">Update Status</label>
                        <select
                            value={order.status}
                            onChange={(e) => onStatusChange(order.id, e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 font-semibold text-gray-900 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        >
                            {statusOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 bg-gray-50 flex gap-4">
                    <button
                        onClick={onClose}
                        className="w-full bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailModal;