// Import model yang diperlukan
const KeranjangSementara = require('../models/keranjang_model');

const KeranjangController = {
    tampilkanKeranjang: function(req, res) {
        // Dapatkan id perusahaan dari objek user yang tersimpan di sesi
        const id_perusahaan = req.session.user.id_perusahaan;

        // Mendapatkan data keranjang belanja dari model
        KeranjangSementara.getDataKeranjang(id_perusahaan, (err, dataKeranjang) => {
            if (err) {
                console.error('Error fetching shopping cart data:', err);
                // Tangani error jika terjadi
                return res.status(500).send('Internal Server Error');
            }
            // Render halaman keranjang belanja dengan data yang diperoleh
            res.render('nama_halaman_keranjang', { dataKeranjang: dataKeranjang });
        });
    },
    tambahKeKeranjang: function(req, res) {
        // Dapatkan data dari body permintaan
        const { id_obat, jumlah_obat } = req.body;
        // Dapatkan id perusahaan dari objek user yang tersimpan di sesi
        const id_perusahaan = req.session.user.id_perusahaan;

        // Panggil model untuk menyimpan data ke keranjang sementara
        KeranjangSementara.tambahData(id_perusahaan, id_obat, jumlah_obat, (err) => {
            if (err) {
                console.error('Error adding to shopping cart:', err);
                // Tangani error jika terjadi
                return res.status(500).send('Internal Server Error');
            }
            // Redirect kembali ke halaman keranjang belanja setelah berhasil menambahkan item
            res.redirect('/keranjang');
        });
    },
};
console.log("Memanggil tambahKeKeranjang");

module.exports = KeranjangController;
