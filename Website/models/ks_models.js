const db = require('./db');

const KeranjangSementara = {
    tambahData: function(id_perusahaan, id_obat, jumlah_obat, callback) {
        const query = 'INSERT INTO tb_keranjang_sementara (id_perusahaan, id_obat, jumlah_obat) VALUES (?, ?, ?)';
        db.query(query, [id_perusahaan, id_obat, jumlah_obat], (err) => {
            if (err) {
                return callback(err);
            }
            return callback(null);
        });
    },
    getData: function(id_perusahaan, callback) {
        const query = `
            SELECT tb_keranjang_sementara.id_keranjangsementara, tb_keranjang_sementara.id_obat, tb_keranjang_sementara.jumlah_obat, tb_stokobat.nama_obat
            FROM tb_keranjang_sementara
            INNER JOIN tb_stokobat ON tb_keranjang_sementara.id_obat = tb_stokobat.id_obat
            WHERE tb_keranjang_sementara.id_perusahaan = ?
        `;
        db.query(query, [id_perusahaan], (err, result) => {
            if (err) {
                return callback(err);
            }
            return callback(null, result);
        });
    },
    hapusData: function(id_keranjangsementara, callback) {
        const query = 'DELETE FROM tb_keranjang_sementara WHERE id_keranjangsementara = ?';
        
        // Tambahkan logging untuk memastikan query benar
        console.log('Executing query:', query, 'with id:', id_keranjangsementara);

        db.query(query, [id_keranjangsementara], (err) => {
            if (err) {
                return callback(err);
            }
            return callback(null);
        });
    }
};

module.exports = KeranjangSementara;
