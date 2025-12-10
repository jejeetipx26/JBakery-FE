import { Edit, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import OrderDetailModal from "../components/OrderDetailModal";

const BASE_URL = "http://localhost:3001/api/order";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterStatus, setFilterStatus] = useState("all");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [user, setUser] = useState(null);
    // Fetch semua pesanan
    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await fetch(BASE_URL);
            if (!res.ok) throw new Error("Gagal mengambil data pesanan");
            const data = await res.json();
            if (data.length > 0) {
                const user = await fetch(
                    "http://localhost:3001/api/user/" + data[0].userId
                );
                const userData = await user.json();
                setUser(userData);
                console.log(data);
                setOrders(data);
                setError(null);
            } else {
                setOrders([]);
                setError("Belum ada pesanan yang dibuat");
            }
        } catch (err) {
            console.error("Error fetching orders:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Update status pesanan
    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const token = localStorage.getItem("token");

            // PERBAIKAN DISINI: Tambahkan '/status' di akhir URL sesuai route backend
            const res = await fetch(`${BASE_URL}/${orderId}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Gagal update status");
            }

            await fetchOrders();
            setIsModalOpen(false); // Tutup modal setelah sukses
            alert("Status pesanan berhasil diupdate!");
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    // Hapus pesanan
    const handleDelete = async (id) => {
        if (!window.confirm("Yakin ingin menghapus pesanan ini?")) return;

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${BASE_URL}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) throw new Error("Gagal menghapus pesanan");
            await fetchOrders();
            alert("Pesanan berhasil dihapus!");
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    // Buka modal detail
    const openDetailModal = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    // Filter pesanan
    const filteredOrders =
        filterStatus === "all"
            ? orders
            : orders.filter((order) => order.status === filterStatus);

    useEffect(() => {
        fetchOrders();
    }, []);

    const getStatusColor = (status) => {
        const colors = {
            pending: "bg-yellow-100 text-yellow-800",
            confirmed: "bg-blue-100 text-blue-800",
            shipped: "bg-purple-100 text-purple-800",
            delivered: "bg-green-100 text-green-800",
            cancelled: "bg-red-100 text-red-800",
        };
        return colors[status] || "bg-gray-100 text-gray-800";
    };

    const getStatusLabel = (status) => {
        const labels = {
            pending: "Pending",
            confirmed: "Dikonfirmasi",
            shipped: "Dikirim",
            delivered: "Diterima",
            cancelled: "Dibatalkan",
        };
        return labels[status] || "Unknown";
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl text-gray-600">Memuat data pesanan...</p>
            </div>
        );
    }

    return (
        <>
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Manajemen Pesanan
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Kelola semua pesanan dari pelanggan
                    </p>
                </div>
                <button
                    onClick={fetchOrders}
                    className="flex items-center gap-2 bg-amber-500 text-white font-bold py-3 px-5 rounded-xl shadow-lg hover:bg-amber-600 transition-colors"
                >
                    <Plus size={20} />
                    Refresh Data
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
                    {error}
                </div>
            )}

            {/* Filter Status */}
            <div className="mb-6 flex gap-2 flex-wrap">
                <button
                    onClick={() => setFilterStatus("all")}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        filterStatus === "all"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                >
                    Semua ({orders.length})
                </button>
                <button
                    onClick={() => setFilterStatus("pending")}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        filterStatus === "pending"
                            ? "bg-yellow-600 text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                >
                    Pending (
                    {orders.filter((o) => o.status === "pending").length})
                </button>
                <button
                    onClick={() => setFilterStatus("confirmed")}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        filterStatus === "confirmed"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                >
                    Dikonfirmasi (
                    {orders.filter((o) => o.status === "confirmed").length})
                </button>
                <button
                    onClick={() => setFilterStatus("shipped")}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        filterStatus === "shipped"
                            ? "bg-purple-600 text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                >
                    Dikirim (
                    {orders.filter((o) => o.status === "shipped").length})
                </button>
                <button
                    onClick={() => setFilterStatus("delivered")}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        filterStatus === "delivered"
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                >
                    Diterima (
                    {orders.filter((o) => o.status === "delivered").length})
                </button>
            </div>

            {/* Daftar Pesanan */}
            <div className="space-y-4">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                                {/* ID Pesanan */}
                                <div>
                                    <p className="text-sm text-gray-500 font-semibold">
                                        ID Pesanan
                                    </p>
                                    <p className="text-lg font-bold text-gray-900">
                                        #{order.id}
                                    </p>
                                </div>

                                {/* Nama Pelanggan */}
                                <div>
                                    <p className="text-sm text-gray-500 font-semibold">
                                        Pelanggan
                                    </p>
                                    <p className="text-gray-900">
                                        {order.customer_name || "-"}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {order.customer_phone || "-"}
                                    </p>
                                </div>

                                {/* Total */}
                                <div>
                                    <p className="text-sm text-gray-500 font-semibold">
                                        Total
                                    </p>
                                    <p className="text-lg font-bold text-amber-600">
                                        Rp{order.total?.toLocaleString() || "0"}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {order.items?.length || 0} item
                                    </p>
                                </div>

                                {/* Status */}
                                <div>
                                    <p className="text-sm text-gray-500 font-semibold">
                                        Status
                                    </p>
                                    <span
                                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                                            order.status
                                        )}`}
                                    >
                                        {getStatusLabel(order.status)}
                                    </span>
                                    <p className="text-xs text-gray-500 mt-2">
                                        {new Date(
                                            order.created_at
                                        ).toLocaleDateString("id-ID")}
                                    </p>
                                </div>

                                {/* Aksi */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => openDetailModal(order)}
                                        className="flex items-center gap-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-semibold"
                                    >
                                        <Edit size={16} /> Detail
                                    </button>
                                    <button
                                        onClick={() => handleDelete(order.id)}
                                        className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-semibold"
                                    >
                                        <Trash2 size={16} /> Hapus
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                        <p className="text-gray-500 text-lg">
                            Tidak ada pesanan ditemukan
                        </p>
                    </div>
                )}
            </div>

            {/* Modal Detail */}
            <OrderDetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                order={selectedOrder}
                user={user}
                onStatusChange={handleStatusChange}
            />
        </>
    );
};

export default OrdersPage;
