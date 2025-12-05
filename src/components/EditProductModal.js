import { X } from "lucide-react";
import { useEffect, useState } from "react";

const EditProductModal = ({ isOpen, onClose, product, onProductUpdated }) => {
    const [formData, setFormData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [rasaList, setRasaList] = useState([]);
    const [kategoriList, setKategoriList] = useState([]);
    const [showRasaSelector, setShowRasaSelector] = useState(false);

    useEffect(() => {
        if (product) {
            setFormData({
                id: product.id,
                nama_produk: product.nama_produk || "",
                deskripsi: product.deskripsi || "",
                foto_produk: product.foto_produk || "",
                harga: product.harga || "",
                stok: product.stok || "",
                kategoriId: product.kategori?.id || "",
                rasaIds: product.rasas ? product.rasas.map((r) => r.id) : [],
            });
        }
    }, [product]);

    useEffect(() => {
        if (isOpen) {
            fetch("http://localhost:3001/api/rasa")
                .then((res) => res.json())
                .then(setRasaList)
                .catch((err) => console.error("Gagal ambil data rasa:", err));

            fetch("http://localhost:3001/api/kategori")
                .then((res) => res.json())
                .then(setKategoriList)
                .catch((err) =>
                    console.error("Gagal ambil data kategori:", err)
                );
        }
    }, [isOpen]);

    if (!isOpen || !product) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        const processedValue =
            name === "harga" || name === "stok" ? parseInt(value) || "" : value;
        setFormData((prev) => ({ ...prev, [name]: processedValue }));
    };

    const handleRemoveRasa = (id) => {
        setFormData((prev) => ({
            ...prev,
            rasaIds: prev.rasaIds.filter((r) => r !== id),
        }));
    };

    const handleAddRasa = (id) => {
        if (!formData.rasaIds.includes(id)) {
            setFormData((prev) => ({
                ...prev,
                rasaIds: [...prev.rasaIds, id],
            }));
        }
        setShowRasaSelector(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch(
                `http://localhost:3001/api/produk/${product.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) throw new Error("Gagal memperbarui produk.");

            const refreshed = await fetch(
                `http://localhost:3001/api/produk/${product.id}`
            );
            const updatedProduct = await refreshed.json();

            onProductUpdated(updatedProduct);
            onClose();
        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const selectedRasas = rasaList.filter((r) =>
        (formData.rasaIds || []).includes(r.id)
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                >
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    Edit Produk: {product.nama_produk}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium">
                                Nama Produk
                            </label>
                            <input
                                type="text"
                                name="nama_produk"
                                value={formData.nama_produk || ""}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">
                                URL Foto
                            </label>
                            <input
                                type="text"
                                name="foto_produk"
                                value={formData.foto_produk || ""}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium">
                                Deskripsi
                            </label>
                            <textarea
                                name="deskripsi"
                                rows="3"
                                value={formData.deskripsi || ""}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium">
                                Harga
                            </label>
                            <input
                                type="number"
                                name="harga"
                                value={formData.harga || ""}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">
                                Stok
                            </label>
                            <input
                                type="number"
                                name="stok"
                                value={formData.stok || ""}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                                required
                            />
                        </div>

                        {/* Dropdown kategori - semua kategori muncul */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium">
                                Kategori
                            </label>
                            <select
                                name="kategoriId"
                                value={formData.kategoriId}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                            >
                                <option value="">Pilih kategori produk</option>
                                {kategoriList.map((kat) => (
                                    <option key={kat.id} value={kat.id}>
                                        {kat.nama_kategori}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Bagian rasa jadi badge */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2">
                                Rasa
                            </label>

                            {/* List badge rasa */}
                            <div className="flex flex-wrap gap-2 mb-3">
                                {selectedRasas.length > 0 ? (
                                    selectedRasas.map((rasa) => (
                                        <span
                                            key={rasa.id}
                                            className="flex items-center bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium"
                                        >
                                            {rasa.nama_rasa}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemoveRasa(rasa.id)
                                                }
                                                className="ml-2 text-red-500 hover:text-red-700 font-bold"
                                            >
                                                ✕
                                            </button>
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-gray-400 text-sm">
                                        Belum ada rasa dipilih
                                    </p>
                                )}
                            </div>

                            {/* Tombol tambah rasa */}
                            <button
                                type="button"
                                onClick={() =>
                                    setShowRasaSelector(!showRasaSelector)
                                }
                                className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition"
                            >
                                + Tambah Rasa
                            </button>

                            {/* Dropdown rasa */}
                            {showRasaSelector && (
                                <div className="mt-2 border rounded-lg shadow-md bg-white max-h-40 overflow-y-auto">
                                    {rasaList
                                        .filter(
                                            (r) =>
                                                !formData.rasaIds.includes(r.id)
                                        )
                                        .map((rasa) => (
                                            <button
                                                key={rasa.id}
                                                type="button"
                                                onClick={() =>
                                                    handleAddRasa(rasa.id)
                                                }
                                                className="block w-full text-left px-4 py-2 hover:bg-amber-100"
                                            >
                                                {rasa.nama_rasa}
                                            </button>
                                        ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="pt-6 flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="py-2 px-6 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="py-2 px-6 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 disabled:bg-amber-300"
                        >
                            {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProductModal;