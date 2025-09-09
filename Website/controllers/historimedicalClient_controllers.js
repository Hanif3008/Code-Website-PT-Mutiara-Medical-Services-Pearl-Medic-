const { MedicalHistory } = require('../models/historipelayanan_models');
const { getProjectById, getStafKesehatanById } = require('../models/proyek_client_models');

const getMedicalDetail = (req, res) => {
    const medicalId = req.query.id;

    MedicalHistory.getMedicalDetailById(medicalId, (err, medical) => {
        if (err) {
            return res.status(500).send('Error retrieving medical details');
        }

        if (!medical) {
            return res.status(404).send('Medical record not found');
        }

        getProjectById(medical.id_proyek, (err, proyek) => {
            if (err) {
                return res.status(500).send('Error retrieving project details');
            }
            if (medical.id_stafkesehatan === 0){
                const staf = {
                    id_stafkesehatan : 0,
                    namalengkap_stafkesehatan: 'Belum Dikonfirmasi',
                    nomortelepon_stafkesehatan: 'Belum Dikonfirmasi'
                };
                res.render('client/historimedical_client', {
                title: 'Detail Pemesanan Pelayanan Medical Check Up',
                layout: 'layouts/main-client-layout',
                medical: medical,
                proyek: proyek,
                staf: staf
                });
            } else {
                getStafKesehatanById(medical.id_stafkesehatan, (err, staf) => {
                    if (err) {
                        return res.status(500).send('Error Retrieving Data');
                    }
                    res.render('client/historimedical_client', {
                        title: 'Detail Pemesanan Pelayanan Medical Check Up',
                        layout: 'layouts/main-client-layout',
                        medical: medical,
                        proyek: proyek,
                        staf: staf
                });
            });
        };
    });
});
};

       
     

module.exports = {
    getMedicalDetail
};
