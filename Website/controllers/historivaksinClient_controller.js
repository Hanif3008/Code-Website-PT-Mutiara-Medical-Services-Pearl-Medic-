const { VaksinHistory } = require('../models/historipelayanan_models');
const { getVaccineServices } = require('../models/LayananVaksin_models');
const { getProjectById, getStafKesehatanById } = require('../models/proyek_client_models'); // Tambahkan ini

const getVaksinDetail = (req, res) => {
    const vaksinId = req.query.id;

    VaksinHistory.getVaksinDetailById(vaksinId, (err, vaksin) => {
        if (err) {
            return res.status(500).send('Error retrieving vaccination details');
        }

        if (!vaksin) {
            return res.status(404).send('Vaccination record not found');
        }

        // Ambil informasi proyek berdasarkan id_proyek dari objek vaksin
        getProjectById(vaksin.id_proyek, (err, proyek) => {
            if (err) {
                return res.status(500).send('Error retrieving project details');
            }

            if (vaksin.id_stafkesehatan === 0) {
                // Jika id_stafkesehatan adalah 0, maka set objek staf ke default "Belum dikonfirmasi"
                const staf = {
                    id_stafkesehatan: 0,
                    namalengkap_stafkesehatan: 'Belum dikonfirmasi',
                    nomortelepon_stafkesehatan: 'Belum dikonfirmasi'
                };

                // Ambil layanan vaksin
                getVaccineServices((err, vaccines) => {
                    if (err) {
                        return res.status(500).send('Error retrieving vaccine details');
                    }

                    // Temukan detail vaksin untuk vaksin saat ini
                    const vaccine = vaccines.find(v => v.id_vaksin === vaksin.id_vaksin);

                    res.render('client/historivaksin_client', {
                        title: 'Detail Pemesanan Pelayanan Vaksinasi',
                        layout: 'layouts/main-client-layout',
                        vaksin: vaksin,
                        proyek: proyek,
                        vaccine: vaccine,
                        staf: staf
                    });
                });
            } else {
                // Ambil informasi staf kesehatan berdasarkan id_staf dari objek vaksin
                getStafKesehatanById(vaksin.id_stafkesehatan, (err, staf) => { 
                    if (err) {
                        return res.status(500).send('Error retrieving health staff details');
                    }

                    // Ambil layanan vaksin
                    getVaccineServices((err, vaccines) => {
                        if (err) {
                            return res.status(500).send('Error retrieving vaccine details');
                        }

                        // Temukan detail vaksin untuk vaksin saat ini
                        const vaccine = vaccines.find(v => v.id_vaksin === vaksin.id_vaksin);

                        res.render('client/historivaksin_client', {
                            title: 'Detail Pemesanan Pelayanan Vaksinasi',
                            layout: 'layouts/main-client-layout',
                            vaksin: vaksin,
                            proyek: proyek,
                            vaccine: vaccine,
                            staf: staf
                        });
                    });
                });
            }
        });
    });
};

module.exports = {
    getVaksinDetail
};
