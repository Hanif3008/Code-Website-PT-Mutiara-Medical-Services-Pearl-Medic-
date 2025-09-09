// Import model yang diperlukan
const KeranjangSementara = require('../models/ks_models');

const KeranjangController = {
    tambahKeKeranjang: function(req, res) {
        // Dapatkan data dari body permintaan
        const { id_perusahaan, id_obat, jumlah_obat } = req.body;

        // Panggil model untuk menyimpan data ke keranjang sementara
        KeranjangSementara.tambahData(id_perusahaan, id_obat, jumlah_obat, (err) => {
            if (err) {
                console.error('Error saat menambahkan ke keranjang sementara:', err);
                // Tangani error jika terjadi
                return res.status(500).send('Internal Server Error');
            }
            // Respon sukses jika berhasil menambahkan ke keranjang sementara
            res.redirect('/LayananApotik_client'); // Sesuaikan dengan halaman yang sesuai
        });
    },
    hapusDariKeranjang: function(req, res) {
        const { id_keranjangsementara } = req.body;

        // Tambahkan logging untuk memastikan data diterima
        console.log('ID Keranjang Sementara yang akan dihapus:', id_keranjangsementara);

        KeranjangSementara.hapusData(id_keranjangsementara, (err) => {
            if (err) {
                console.error('Error deleting from shopping cart:', err);
                return res.status(500).send('Internal Server Error');
            }
            res.redirect('/LayananApotik_client');
        });
    }
};

module.exports = KeranjangController;
