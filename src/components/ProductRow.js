const ProductRow = ({ product, onDelete, onEdit }) => {
    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(number);
    };

    const stockClass =
        product.stok < 10 ? "text-red-500 font-bold" : "text-gray-700";

    return (
        <div className="flex items-center bg-white p-4 rounded-xl shadow-md mb-4 transition-transform transform hover:scale-[1.02]">
            {/* Kolom Foto Produk */}
            <div className="w-24 h-24 flex-shrink-0 mr-6">
                <img
                    src={product.foto_produk}
                    alt={product.nama_produk}
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>

            {/* Kolom Nama, Kategori, dan Deskripsi */}
            <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-800">
                    {product.nama_produk}
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                    {product.deskripsi}
                </p>
                <div className="text-sm text-gray-500 flex flex-wrap items-center gap-2">
                    <div className="flex flex-wrap gap-2">
                        {product.rasas && product.rasas.length > 0 && (
                            <div>
                                {product.rasas.map((rasa) => (
                                    <span
                                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                                        key={rasa.id}
                                    >
                                        {rasa.nama_rasa}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Kolom Harga */}
            <div className="w-48 text-center flex-shrink-0">
                <p className="text-lg font-semibold text-gray-800">
                    {formatRupiah(product.harga)}
                </p>
            </div>

            {/* Kolom Stok */}
            <div className="w-32 text-center flex-shrink-0">
                <p className={`text-lg ${stockClass}`}>{product.stok} pcs</p>
                {product.stok < 10 && (
                    <p className="text-xs text-red-500">Stok menipis!</p>
                )}
            </div>

            {/* Kolom Aksi (Tombol) */}
            <div className="flex items-center content-stretch flex-row space-between">
                <div className="w-48 text-right flex-shrink-0">
                    <button
                        onClick={() => onEdit(product)}
                        className="bg-amber-500 text-white font-semibold py-2 px-6 rounded-lg shadow-sm hover:bg-amber-600 transition-colors"
                    >
                        Edit
                    </button>
                </div>
                <div className="w-48 text-right flex-shrink-0">
                    <button
                        onClick={() => onDelete(product.id, product.nama_produk)}
                        className="bg-red-500 text-white font-semibold py-2 px-6 rounded-lg shadow-sm hover:bg-red-600 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductRow;