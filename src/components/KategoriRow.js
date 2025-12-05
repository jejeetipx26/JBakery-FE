const KategoriRow = ({ kategori, onDelete, onEdit }) => {
    return (
        <div className="flex items-center bg-white p-4 rounded-xl shadow-md mb-4 transition-transform transform hover:scale-[1.02]">

            {/* Kolom Nama Kategori */}
            <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-800">
                    {kategori.nama_kategori}
                </h3>

                {/* Jika ada relasi produk, tampilkan jumlah produk */}
                {kategori._count?.produks !== undefined && (
                    <p className="text-sm text-gray-500 mt-1">
                        {kategori._count.produks} produk terdaftar
                    </p>
                )}
            </div>

            {/* Kolom Aksi (Tombol) */}
            <div className="flex items-center content-stretch flex-row space-between">
                <div className="w-48 text-right flex-shrink-0">
                    <button
                        onClick={() => onEdit(kategori)}
                        className="bg-amber-500 text-white font-semibold py-2 px-6 rounded-lg shadow-sm hover:bg-amber-600 transition-colors"
                    >
                        Edit
                    </button>
                </div>
                <div className="w-48 text-right flex-shrink-0">
                    <button
                        onClick={() =>
                            onDelete(kategori.id, kategori.nama_kategori)
                        }
                        className="bg-red-500 text-white font-semibold py-2 px-6 rounded-lg shadow-sm hover:bg-red-600 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default KategoriRow;