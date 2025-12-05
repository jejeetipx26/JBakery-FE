import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import AddEditModalKr from "../components/AddEditModalKr";
import RasaRow from "../components/RasaRow";

const BASE_URL = "http://localhost:3001/api/rasa"; // Ganti sesuai backend kamu

const Rasa = () => {
    const [rasas, setRasas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRasas, setEditingRasas] = useState(null);

    const fetchRasas = async () => {
        try {
            const res = await fetch(BASE_URL);
            const data = await res.json();
            setRasas(data);
        } catch (err) {
            console.error("Gagal fetch rasa:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (data) => {
        try {
            await fetch(BASE_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nama_rasa: data.nama }),
            });
            await fetchRasas();
            setIsModalOpen(false);
        } catch (err) {
            console.error("Gagal tambah rasa:", err);
        }
    };

    const handleEdit = async (data) => {
        try {
            await fetch(`${BASE_URL}/${editingRasas.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nama_rasa: data.nama }),
            });
            await fetchRasas();
            setEditingRasas(null);
            setIsModalOpen(false);
        } catch (err) {
            console.error("Gagal edit rasa:", err);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Yakin ingin menghapus rasa ini?"
        );
        if (!confirmDelete) return;

        try {
            await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
            await fetchRasas();
        } catch (err) {
            console.error("Gagal hapus rasa:", err);
        }
    };

    const openAddModal = () => {
        setEditingRasas(null);
        setIsModalOpen(true);
    };

    const openEditModal = (rasa) => {
        setEditingRasas(rasa);
        setIsModalOpen(true);
    };

    useEffect(() => {
        fetchRasas();
    }, []);
    if (loading)
        return (
            <div className="text-center p-10 text-xl">
                Memuat data rasa...
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
                        Manajemen Rasa
                    </h1>
                    <p className="text-gray-500">
                        Kelola semua varian rasa produk di toko Anda.
                    </p>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 bg-amber-500 text-white font-bold py-3 px-5 rounded-xl shadow-lg hover:bg-amber-600"
                >
                    <PlusCircle size={20} />
                    <span>Tambah Rasa Baru</span>
                </button>
            </div>

            {/* Daftar Rasa */}
            <div className="space-y-4">
                {rasas.length > 0 ? (
                    rasas.map((item) => (
                        <RasaRow
                            key={item.id}
                            rasa={item}
                            onDelete={handleDelete}
                            onEdit={openEditModal}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500">
                        Tidak ada rasa yang ditemukan.
                    </p>
                )}
            </div>

            {/* Modal Tambah/Edit */}
            <AddEditModalKr
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={editingRasas ? handleEdit : handleAdd}
                initialData={editingRasas}
                title={editingRasas ? "Edit Rasa" : "Tambah Rasa"}
                label="Nama Rasa"
            />
        </>
    );
};

export default Rasa;
