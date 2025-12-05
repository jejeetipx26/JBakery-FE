const RasaRow = ({ rasa, onDelete, onEdit }) => {
    return (
        <div className="flex items-center bg-white p-4 rounded-xl shadow-md mb-4 transition-transform transform hover:scale-[1.02]">
            {/* Kolom Nama Rasa */}
            <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-800">
                    {rasa.nama_rasa}
                </h3>

                {/* Jika ada relasi produk, tampilkan jumlah produk yang memakai rasa ini */}
                {rasa._count?.produks !== undefined && (
                    <p className="text-sm text-gray-500 mt-1">
                        {rasa._count.produks} produk memakai rasa ini
                    </p>
                )}
            </div>

            {/* Kolom Aksi (Edit & Delete) */}
            <div className="flex items-center content-stretch flex-row space-between">
                <div className="w-48 text-right flex-shrink-0">
                    <button
                        onClick={() => onEdit(rasa)}
                        className="bg-amber-500 text-white font-semibold py-2 px-6 rounded-lg shadow-sm hover:bg-amber-600 transition-colors"
                    >
                        Edit
                    </button>
                </div>
                <div className="w-48 text-right flex-shrink-0">
                    <button
                        onClick={() => onDelete(rasa.id, rasa.nama_rasa)}
                        className="bg-red-500 text-white font-semibold py-2 px-6 rounded-lg shadow-sm hover:bg-red-600 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RasaRow;