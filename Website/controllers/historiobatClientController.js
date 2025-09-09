const PelayananObat = require('../models/pembelian_obat_models');
const ProyekClient = require('../models/proyek_client_models');

exports.getPelayananDetail = (req, res) => {
    const pelayananId = req.query.id;

    if (!pelayananId) {
        return res.status(400).send('Bad Request');
    }

    PelayananObat.getDataById(pelayananId, (err, pelayanan) => {
        if (err) {
            console.error('Terjadi kesalahan saat mengambil detail pelayanan obat:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (!pelayanan) {
            return res.status(404).send('Pelayanan not found');
        }

        ProyekClient.getProjectById(pelayanan.id_proyek, (err, proyek) => {
            if (err) {
                console.error('Terjadi kesalahan saat mengambil detail proyek:', err);
                return res.status(500).send('Internal Server Error');
            }

            if (!proyek) {
                console.error('Proyek not found');
                // Jika proyek tidak ditemukan, atur proyek menjadi null atau objek kosong
                proyek = {};
            }

            // Mengonversi keranjangData menjadi array
            const keranjangDataArray = JSON.parse(pelayanan.keranjangData);

            // Menambahkan keranjangDataArray ke dalam objek pelayanan
            pelayanan.keranjangData = keranjangDataArray;

            res.render('client/historiobat_client', {  
                title: 'Detail Pelayanan Obat',
                layout: 'layouts/main-client-layout',
                pelayanan,
                proyek
            });
        });
    });
};
