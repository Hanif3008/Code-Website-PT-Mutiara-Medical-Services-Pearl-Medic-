const { DaruratHistory } = require('../models/historipelayanan_models');
const { getProjectById, getStafKesehatanById } = require('../models/proyek_client_models');

const getDaruratDetail = (req, res) => {
    const daruratId = req.query.id;

    DaruratHistory.getDaruratDetailById(daruratId, (err, darurat) => {
        if (err) {
            return res.status(500).send('Error retrieving emergency service details');
        }

        if (!darurat) {
            return res.status(404).send('Emergency service record not found');
        }

        // Ambil informasi proyek berdasarkan id_proyek dari objek darurat
        getProjectById(darurat.id_proyek, (err, proyek) => {
            if (err) {
                return res.status(500).send('Error retrieving project details');
            }

            if (darurat.id_stafkesehatan === 0) {
                // Jika id_stafkesehatan adalah 0, maka set objek staf ke default "Belum dikonfirmasi"
                const staf = {
                    id_stafkesehatan: 0,
                    namalengkap_stafkesehatan: 'Belum dikonfirmasi',
                    nomortelepon_stafkesehatan: 'Belum dikonfirmasi'
                };

                // Render halaman dengan data yang sudah diambil
                res.render('client/historidarurat_client', {
                    title: 'Detail Pemesanan Pelayanan Darurat',
                    layout: 'layouts/main-client-layout',
                    darurat: darurat,
                    proyek: proyek,
                    staf: staf
                });
            } else {
                // Ambil informasi staf kesehatan berdasarkan id_staf dari objek darurat
                getStafKesehatanById(darurat.id_stafkesehatan, (err, staf) => {
                    if (err) {
                        return res.status(500).send('Error retrieving health staff details');
                    }

                    // Render halaman dengan data yang sudah diambil
                    res.render('client/historidarurat_client', {
                        title: 'Detail Pemesanan Pelayanan Darurat',
                        layout: 'layouts/main-client-layout',
                        darurat: darurat,
                        proyek: proyek,
                        staf: staf
                    });
                });
            }
        });
    });
};

module.exports = {
    getDaruratDetail
};
