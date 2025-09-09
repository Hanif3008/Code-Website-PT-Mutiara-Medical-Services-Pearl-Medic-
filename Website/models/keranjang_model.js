const db = require('./db');

const KeranjangSementara = {
    getDataKeranjang: function(id_perusahaan, callback) {
        const query = 'SELECT * FROM tb_keranjang_sementara WHERE id_perusahaan = ?';
        db.query(query, [id_perusahaan], (err, result) => {
            if (err) {
                console.error('Error fetching shopping cart data:', err);
                callback(err, null); // Mengembalikan error jika terjadi kesalahan
            } else {
                callback(null, result); // Mengembalikan data keranjang belanja jika berhasil
            }
        });
    },
    tambahData: function(id_perusahaan, id_obat, jumlah_obat, callback) {
        const query = 'INSERT INTO tb_keranjang_sementara (id_perusahaan, id_obat, jumlah_obat) VALUES (?, ?, ?)';
        db.query(query, [id_perusahaan, id_obat, jumlah_obat], (err) => {
            if (err) {
                console.error('Error adding to shopping cart:', err);
                callback(err); // Mengembalikan error jika terjadi kesalahan
            } else {
                callback(null); // Mengembalikan null jika berhasil menambahkan
            }
        });
    },
};

module.exports = KeranjangSementara;
