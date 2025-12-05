import { useEffect, useState } from "react";

const AddEditModalKr = ({
    isOpen,
    onClose,
    onSubmit,
    initialData = null,
    title,
    label,
}) => {
    const [nama, setNama] = useState("");

    useEffect(() => { 
        if (initialData) {
            setNama(initialData.nama_kategori || initialData.nama_rasa || "");
        } else {
            setNama("");
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ nama });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-96 p-6">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>

                <form onSubmit={handleSubmit}>
                    <label className="block text-gray-700 font-medium mb-2">
                        {label}
                    </label>
                    <input
                        type="text"
                        className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        required
                    />

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEditModalKr;