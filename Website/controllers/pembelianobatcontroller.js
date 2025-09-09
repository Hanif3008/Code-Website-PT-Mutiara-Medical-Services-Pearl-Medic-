const KeranjangSementara = require('../models/ks_models');
const PelayananObat = require('../models/pembelian_obat_models');
const moment = require('moment');

const processCheckout = (req, res) => {
    const user = req.session.user;
    const id_perusahaan = user.id_perusahaan;
    const { proyek, locationInput, catatanTambahan } = req.body;

    const tanggalPemesanan = moment().format('YYYY-MM-DD');
    const tanggalPengiriman = moment().add(2, 'days').format('YYYY-MM-DD');

    KeranjangSementara.getData(id_perusahaan, (err, keranjangData) => {
        if (err) {
            console.error('Terjadi kesalahan saat mengambil data keranjang belanja:', err);
            return res.status(500).send('Internal Server Error');
        }

        // Mendapatkan nomor pesanan terbaru
        PelayananObat.getLatestOrderNumber((err, nomorPesanan) => {
            if (err) {
                console.error('Terjadi kesalahan saat mengambil nomor pesanan terbaru:', err);
                return res.status(500).send('Internal Server Error');
            }

            // Membuat data pelayanan obat
            const pelayananObatData = {
                id_perusahaan: id_perusahaan,
                id_proyek: proyek,
                lokasi_pengirimanobat: locationInput,
                tgl_pemesananobat: tanggalPemesanan,
                status_pesanan: 3,
                tgl_pengiriman: tanggalPengiriman,
                jenis_pelayanan: 'Pembelian Obat',
                catatantambahanobat: catatanTambahan || 'Tidak ada catatan tambahan',
                keranjangData: Array.isArray(keranjangData) ? JSON.stringify(keranjangData) : keranjangData,
                nomorpesanan: nomorPesanan // Menambahkan nomor pesanan
            };

            // Menyimpan data pembelian obat
            PelayananObat.tambahData(pelayananObatData, (err) => {
                if (err) {
                    console.error('Terjadi kesalahan saat menyimpan data pembelian obat:', err);
                    return res.status(500).send('Internal Server Error');
                }

                res.redirect('/suksesLayanan_client');
            });
        });
    });
};

const clearCartMiddleware = (req, res, next) => {
    const user = req.session.user;
    const id_perusahaan = user.id_perusahaan;

    // Menghapus data keranjang belanja
    KeranjangSementara.hapusData(id_perusahaan, (err) => {
        if (err) {
            console.error('Terjadi kesalahan saat menghapus data keranjang:', err);
            return res.status(500).send('Internal Server Error');
        }
        next();
    });
};

module.exports = { processCheckout, clearCartMiddleware };
