// src/pages/Produk.js

import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import AddProductModal from "../components/AddProductModal"; // 1. Import komponen modal
import EditProductModal from "../components/EditProductModal";
import ProductRow from "../components/ProductRow";

const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);

    const handleOpenEditModal = (product) => {
        setProductToEdit(product);
        setIsEditModalOpen(true);
    };

    // Fungsi untuk menutup modal edit
    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setProductToEdit(null);
    };

    const handleProductUpdated = (updatedProduct) => {
        setProducts((prevProducts) =>
            prevProducts.map((p) =>
                p.id === updatedProduct.id ? updatedProduct : p
            )
        );
    };

    // 2. State untuk kontrol visibilitas modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        document.title = "Manajemen Produk - Admin Panel";
        console.log("Product page loaded");
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3001/api/produk"
                );
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setProducts(data);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // 3. Fungsi untuk menambahkan produk baru ke state (tanpa refresh halaman)
    const handleProductAdded = (newProduct) => {
        setProducts((prevProducts) => [newProduct, ...prevProducts]);
    };

    const handleDelete = async (id, nama) => {
        if (window.confirm(`Apakah Anda yakin ingin menghapus ${nama}?`)) {
            try {
                const response = await fetch(
                    `http://localhost:3001/api/produk/${id}`,
                    {
                        method: "DELETE",
                    }
                );
                if (response.ok) {
                    alert("Produk berhasil dihapus");
                    setProducts((prev) => prev.filter((p) => p.id !== id));
                    // Optionally, you can add logic to remove the product from the UI
                } else {
                    alert("Gagal menghapus produk");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Terjadi kesalahan saat menghapus produk");
            }
        }
    };

    if (loading)
        return (
            <div className="text-center p-10 text-xl">
                Memuat data produk...
            </div>
        );
    if (error)
        return (
            <div className="text-center p-10 text-xl text-red-500">
                Error: {error}
            </div>
        );

    return (
        <>
            {/* Header Halaman */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Manajemen Produk
                    </h1>
                    <p className="text-gray-500">
                        Kelola semua produk di toko Anda.
                    </p>
                </div>
                {/* 4. Tombol ini sekarang akan membuka modal */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-amber-500 text-white font-bold py-3 px-5 rounded-xl shadow-lg hover:bg-amber-600"
                >
                    <PlusCircle size={20} />
                    <span>Tambah Produk Baru</span>
                </button>
            </div>

            {/* Daftar Produk Berdasarkan Kategori */}
            <div className="space-y-8">
                {Object.entries(
                    products.reduce((grouped, product) => {
                        const kategoriNama =
                            product.kategori?.nama_kategori || "Tanpa Kategori";
                        if (!grouped[kategoriNama]) grouped[kategoriNama] = [];
                        grouped[kategoriNama].push(product);
                        return grouped;
                    }, {})
                ).map(([kategoriNama, produkList]) => (
                    <div key={kategoriNama} className="border-b pb-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-amber-500 pl-3">
                            {kategoriNama}
                        </h2>

                        <div className="space-y-4">
                            {produkList.map((product) => (
                                <ProductRow
                                    key={product.id}
                                    product={product}
                                    onDelete={handleDelete}
                                    onEdit={handleOpenEditModal}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* 5. Render komponen modal di sini */}
            <AddProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onProductAdded={handleProductAdded}
            />

            <EditProductModal
                isOpen={isEditModalOpen}
                onClose={handleCloseEditModal}
                product={productToEdit}
                onProductUpdated={handleProductUpdated}
            />
        </>
    );
};

export default Product;
