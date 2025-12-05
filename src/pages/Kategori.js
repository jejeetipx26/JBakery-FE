// src/pages/Kategori.js
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import AddEditModalKr from "../components/AddEditModalKr";
import KategoriRow from "../components/KategoriRow";

const BASE_URL = "http://localhost:3001/api/kategori";

const Kategori = () => {
    const [kategoris, setKategoris] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingKategori, setEditingKategori] = useState(null);

    //  Ambil semua kategori
    const fetchKategoris = async () => {
        try {
            const res = await fetch(BASE_URL);
            const data = await res.json();
            setKategoris(data);
        } catch (err) {
            console.error("Gagal fetch kategori:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    //  Tambah kategori
    const handleAdd = async (data) => {
        try {
            await fetch(BASE_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nama_kategori: data.nama }),
            });
            await fetchKategoris();
            setIsModalOpen(false);
        } catch (err) {
            console.error("Gagal tambah kategori:", err);
        }
    };

    //  Edit kategori
    const handleEdit = async (data) => {
        try {
            await fetch(`${BASE_URL}/${editingKategori.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nama_kategori: data.nama }),
            });
            await fetchKategoris();
            setEditingKategori(null);
            setIsModalOpen(false);
        } catch (err) {
            console.error("Gagal edit kategori:", err);
        }
    };

    //  Hapus kategori
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Yakin ingin menghapus kategori ini?"
        );
        if (!confirmDelete) return;

        try {
            await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
            await fetchKategoris();
        } catch (err) {
            console.error("Gagal hapus kategori:", err);
        }
    };

    //  Buka modal tambah
    const openAddModal = () => {
        setEditingKategori(null);
        setIsModalOpen(true);
    };

    //  Buka modal edit
    const openEditModal = (kategori) => {
        setEditingKategori(kategori);
        setIsModalOpen(true);
    };

    useEffect(() => {
        fetchKategoris();
    }, []);
    if (loading)
        return (
            <div className="text-center p-10 text-xl">
                Memuat data kategori...
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
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Data Kategori</h1>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600"
                >
                    <PlusCircle size={20} /> Tambah Kategori
                </button>
            </div>

            <div className="space-y-4">
                {kategoris.length > 0 ? (
                    kategoris.map((kategori) => (
                        <KategoriRow
                            key={kategori.id}
                            kategori={kategori}
                            onEdit={openEditModal}
                            onDelete={handleDelete}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500">
                        Tidak ada kategori yang ditemukan.
                    </p>
                )}
            </div>

            {/* Modal Tambah/Edit */}
            <AddEditModalKr
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={editingKategori ? handleEdit : handleAdd}
                initialData={editingKategori}
                title={editingKategori ? "Edit Kategori" : "Tambah Kategori"}
                label="Nama Kategori"
            />
        </>
    );
};

export default Kategori;
