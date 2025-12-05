import { Edit, Trash2 } from "lucide-react";

const OrderRow = ({ order, onEdit, onDelete, onStatusChange }) => {
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
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                {/* ID Pesanan */}
                <div>
                    <p className="text-sm text-gray-500">ID Pesanan</p>
                    <p className="font-bold text-gray-900">#{order.id}</p>
                </div>

                {/* Nama Pelanggan */}
                <div>
                    <p className="text-sm text-gray-500">Nama Pelanggan</p>
                    <p className="text-gray-900">{order.customer_name || '-'}</p>
                </div>

                {/* Total */}
                <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-bold text-amber-600">Rp{order.total?.toLocaleString() || '0'}</p>
                </div>

                {/* Status */}
                <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                    </span>
                </div>

                {/* Aksi */}
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(order)}
                        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                    >
                        <Edit size={16} /> Edit
                    </button>
                    <button
                        onClick={() => onDelete(order.id)}
                        className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
                    >
                        <Trash2 size={16} /> Hapus
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderRow;