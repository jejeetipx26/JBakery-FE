import { X } from "lucide-react";
import { useEffect, useState } from "react";

const AddProductModal = ({ isOpen, onClose, onProductAdded }) => {
    const initialFormData = {
        nama_produk: "",
        deskripsi: "",
        harga: "",
        stok: "",
        foto_produk: "",
        kategoriId: "", 
        rasaIds: [], 
    };

    const [formData, setFormData] = useState(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [categories, setCategories] = useState([]);
    const [flavors, setFlavors] = useState([]);

    useEffect(() => {
        if (isOpen) {
            const fetchData = async () => {
                try {
                    const [catResponse, flavorResponse] = await Promise.all([
                        fetch("http://localhost:3001/api/kategori"),
                        fetch("http://localhost:3001/api/rasa"),
                    ]);

                    if (!catResponse.ok || !flavorResponse.ok) {
                        throw new Error("Gagal mengambil data untuk form");
                    }

                    const catData = await catResponse.json();
                    const flavorData = await flavorResponse.json();

                    setCategories(catData);
                    setFlavors(flavorData);
                } catch (error) {
                    console.error("Error fetching data:", error);
                    alert(error.message);
                }
            };
            fetchData();
        }
    }, [isOpen]); 

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        const processedValue =
            name === "harga" || name === "stok" ? parseInt(value) || "" : value;
        setFormData((prevState) => ({ ...prevState, [name]: processedValue }));
    };

    const handleFlavorChange = (e) => {
        const value = parseInt(e.target.value); 
        const checked = e.target.checked;

        setFormData((prevState) => {
            if (checked) {
                return { ...prevState, rasaIds: [...prevState.rasaIds, value] };
            } else {
                return {
                    ...prevState,
                    rasaIds: prevState.rasaIds.filter(
                        (flavorId) => flavorId !== value
                    ),
                };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("http://localhost:3001/api/produk", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Gagal menambahkan produk.");

            const newProduct = await response.json();
            onProductAdded(newProduct);
            setFormData(initialFormData); 
            onClose();
        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

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
                    Tambah Produk Baru
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label
                                htmlFor="nama_produk"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Nama Produk
                            </label>
                            <input
                                type="text"
                                name="nama_produk"
                                id="nama_produk"
                                value={formData.nama_produk}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="foto_produk"
                                className="block text-sm font-medium text-gray-700"
                            >
                                URL Foto Produk
                            </label>
                            <input
                                type="text"
                                name="foto_produk"
                                id="foto_produk"
                                value={formData.foto_produk}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label
                                htmlFor="deskripsi"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Deskripsi
                            </label>
                            <textarea
                                name="deskripsi"
                                id="deskripsi"
                                rows="3"
                                value={formData.deskripsi}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            ></textarea>
                        </div>
                        <div>
                            <label
                                htmlFor="harga"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Harga (Rp)
                            </label>
                            <input
                                type="number"
                                name="harga"
                                id="harga"
                                value={formData.harga}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="stok"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Stok
                            </label>
                            <input
                                type="number"
                                name="stok"
                                id="stok"
                                value={formData.stok}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                required
                            />
                        </div>
                        {/* === KATEGORI (DROPDOWN) === */}
                        <div className="md:col-span-2">
                            <label
                                htmlFor="kategoriId"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Kategori
                            </label>
                            <select
                                name="kategoriId"
                                id="kategoriId"
                                value={formData.kategoriId}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                required
                            >
                                <option value="" disabled>
                                    Pilih satu kategori
                                </option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.nama_kategori}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Rasa (bisa pilih lebih dari satu)
                            </label>
                            <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2 border p-3 rounded-md">
                                {flavors.map((flavor) => (
                                    <div
                                        key={flavor.id}
                                        className="flex items-center"
                                    >
                                        <input
                                            type="checkbox"
                                            id={`rasa-${flavor.id}`}
                                            name="rasaIds"
                                            value={flavor.id}
                                            checked={formData.rasaIds.includes(
                                                flavor.id
                                            )}
                                            onChange={handleFlavorChange}
                                            className="h-4 w-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                                        />
                                        <label
                                            htmlFor={`rasa-${flavor.id}`}
                                            className="ml-2 block text-sm text-gray-900"
                                        >
                                            {flavor.nama_rasa}
                                        </label>
                                    </div>
                                ))}
                            </div>
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
                            {isSubmitting ? "Menyimpan..." : "Simpan Produk"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;