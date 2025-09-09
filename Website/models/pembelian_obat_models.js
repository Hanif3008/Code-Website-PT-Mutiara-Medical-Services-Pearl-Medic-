const db = require('./db');

const PelayananObat = {
    getLatestOrderNumber: function(callback) {
        const query = 'SELECT nomorpesanan FROM tb_pelayananobat ORDER BY nomorpesanan DESC LIMIT 1';
        db.query(query, (err, result) => {
            if (err) {
                return callback(err);
            }

            let latestOrderNumber = '04000'; // Default jika tidak ada nomor pesanan sebelumnya

            if (result.length > 0) {
                latestOrderNumber = result[0].nomorpesanan;
            }

            // Mengambil angka urutan dari nomor pesanan terakhir (misalnya, 04001 -> 1)
            const lastOrderNumber = parseInt(latestOrderNumber.slice(2)); // Ambil angka setelah "04"
            const nextOrderNumber = lastOrderNumber + 1; // Tambahkan 1 untuk nomor berikutnya

            // Format nomor pesanan baru dengan awalan "04" dan 3 digit angka
            const formattedOrderNumber = `04${String(nextOrderNumber).padStart(3, '0')}`;

            return callback(null, formattedOrderNumber);
        });
    },
    tambahData: function(pelayananObatData, callback) {
        const query = 'INSERT INTO tb_pelayananobat SET ?';
        db.query(query, pelayananObatData, (err, result) => {
            if (err) {
                return callback(err);
            }
            const id_pelayananobat = result.insertId; // Dapatkan id_pelayananobat yang baru saja dimasukkan

            // Memeriksa apakah keranjangData adalah array
            const keranjangData = Array.isArray(pelayananObatData.keranjangData) ? pelayananObatData.keranjangData : JSON.parse(pelayananObatData.keranjangData);

            if (!Array.isArray(keranjangData)) {
                return callback(new Error('Keranjang data harus berupa array'));
            }

            // Mengonversi string JSON menjadi objek JavaScript
            const keranjangDataArray = JSON.parse(pelayananObatData.keranjangData);

            // Simpan hubungan ke tb_pelayanan_keranjang
            const pelayananKeranjangData = keranjangDataArray.map(item => [id_pelayananobat, item.id_keranjangsementara]);
            const junctionQuery = 'INSERT INTO tb_pelayanan_keranjang (id_pelayananobat, id_keranjangsementara) VALUES ?';

            db.query(junctionQuery, [pelayananKeranjangData], (err) => {
                if (err) {
                    return callback(err);
                }
                return callback(null);
            });
        });
    },


    getDataByIdPerusahaan: function(id_perusahaan, callback) {
        const query = 'SELECT * FROM tb_pelayananobat WHERE id_perusahaan = ?';
        db.query(query, [id_perusahaan], (err, results) => {
            if (err) {
                return callback(err);
            }
            return callback(null, results);
        });
    },
    getDataById: function(id_pelayananobat, callback) {
        const query = 'SELECT * FROM tb_pelayananobat WHERE id_pelayananobat = ? ORDER BY id_pelayananobat DESC';
        db.query(query, [id_pelayananobat], (err, result) => {
            if (err) {
                return callback(err);
            }
            return callback(null, result[0]);
        });
    }
};

module.exports = PelayananObat;
