import { Mail, MapPin, Package, Phone, User, X } from "lucide-react";
import { useEffect, useState } from "react";

const OrderDetailModal = ({ isOpen, onClose, order, onStatusChange, user }) => {
  const [selectedStatus, setSelectedStatus] = useState("");

  // Update local state ketika order berubah
  useEffect(() => {
    if (order) {
      setSelectedStatus(order.status);
    }
  }, [order]);

  if (!isOpen || !order) return null;

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Dikonfirmasi" },
    { value: "shipped", label: "Dikirim" },
    { value: "delivered", label: "Diterima" },
    { value: "cancelled", label: "Dibatalkan" },
  ];

  const handleSaveStatus = () => {
    onStatusChange(order.id, selectedStatus);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Header Modal */}
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Detail Pesanan</h2>
            <p className="text-sm text-gray-500">ID: #{order.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          
          {/* Section: Update Status (Admin) */}
          <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 shadow-sm">
            <label className="block text-sm font-bold text-blue-900 mb-2">
              Update Status Pesanan
            </label>
            <div className="flex gap-3">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button
                onClick={handleSaveStatus}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md"
              >
                Simpan
              </button>
            </div>
          </div>

          {/* Section: Informasi Pelanggan (Sesuai kode lama + Desain baru) */}
          <div>
            <h3 className="flex items-center gap-2 text-gray-800 font-bold mb-4 text-lg border-b pb-2">
              <User size={20} className="text-amber-500" /> Informasi Pelanggan
            </h3>
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-5">
               
               {/* Nama */}
               <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm text-blue-500">
                    <User size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Nama</p>
                    <p className="text-gray-900 font-medium text-base">{user?.nama || '-'}</p>
                  </div>
               </div>

               {/* Email */}
               <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm text-blue-500">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Email</p>
                    <p className="text-gray-900 font-medium text-base break-all">{user?.email || '-'}</p>
                  </div>
               </div>

               {/* Telepon */}
               <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm text-blue-500">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Telepon</p>
                    <p className="text-gray-900 font-medium text-base">{user?.nomorTelepon || '-'}</p>
                  </div>
               </div>

               {/* Alamat */}
               <div className="flex items-start gap-3 md:col-span-2">
                  <div className="p-2 bg-white rounded-lg shadow-sm text-blue-500">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Alamat</p>
                    <p className="text-gray-900 font-medium text-base leading-relaxed">{user?.alamat || '-'}</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Section: Produk Pesanan */}
          <div>
            <h3 className="flex items-center gap-2 text-gray-800 font-bold mb-4 text-lg border-b pb-2">
              <Package size={20} className="text-amber-500" /> Detail Produk
            </h3>
            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-bold">
                  <tr>
                    <th className="px-4 py-3">Produk</th>
                    <th className="px-4 py-3 text-center">Qty</th>
                    <th className="px-4 py-3 text-right">Harga</th>
                    <th className="px-4 py-3 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          {item.nama_produk}
                        </td>
                        <td className="px-4 py-3 text-center text-gray-600 font-medium">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-3 text-right text-gray-600">
                          Rp{parseFloat(item.harga).toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-gray-800">
                          Rp{(item.harga * item.quantity).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-4 py-8 text-center text-gray-500 italic">
                        Tidak ada item dalam pesanan ini.
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot className="bg-gray-50 border-t border-gray-200">
                  <tr>
                    <td colSpan="3" className="px-4 py-4 text-right font-bold text-gray-900 text-base">
                      Total Pembayaran
                    </td>
                    <td className="px-4 py-4 text-right font-bold text-amber-600 text-xl">
                      Rp{parseFloat(order.total).toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 flex justify-end rounded-b-xl">
          <button
            onClick={onClose}
            className="bg-gray-800 text-white px-8 py-2.5 rounded-lg font-bold hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;