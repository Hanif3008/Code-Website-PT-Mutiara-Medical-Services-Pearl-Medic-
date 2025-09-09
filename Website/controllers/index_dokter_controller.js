const index_dokter_model = require('../models/index_dokter_model');

const getAllLayananDokter = (req, res) => {
    const staffId = req.user.id_stafkesehatan; // Assuming you store user info in req.user

    index_dokter_model.getAllLayananDokterByStaffId(staffId, (err, layanan) => {
        if (err) {
            return res.status(500).send('Error retrieving layanan data');
        }

        res.render('dokter/index_dokter', {
            title: 'Dashboard Staf Kesehatan',
            layout: 'layouts/main-layouts-dokter',
            layanan : layanan
        });
    });
};


module.exports = {
    getAllLayananDokter
};
