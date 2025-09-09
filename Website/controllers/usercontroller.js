const userModel = require('../models/usermodels');

// Fungsi untuk menampilkan tambah proyek
const showTambahProyek = (req, res) => {
    // Assume req.session.user.id_perusahaan contains the company id
    const companyId = req.session.user.id_perusahaan;

    // Call the function to get company data
    userModel.getCompanyById(companyId, (err, perusahaan) => {
        if (err) {
            console.error('Error fetching company data:', err);
            return res.status(500).send('Internal Server Error');
        }
        if (!perusahaan) {
            return res.status(404).send('Company Not Found');
        }

        // Pass the company data to the view
        res.render('client/tambahproyek_client', {
            title: 'Tambah Proyek',
            layout: 'layouts/main-client-layout',
            perusahaan: perusahaan // Pass perusahaan to the view
        });
    });
};
const mainpageuser = (req, res) => {
    const companyId = req.session.user.id_perusahaan;
    userModel.getCompanyById(companyId, (err, perusahaan) => {
        if (err) {
            console.error('Error fetching company data:', err);
            return res.status(500).send('Internal Server Error');
        }
        if (!perusahaan) {
            return res.status(404).send('Company Not Found');
        }
        res.render('client/index_client', {
            title: 'Pearl Medic',
            layout: 'layouts/main-client-layout',
            perusahaan: perusahaan
        });
    });
};



module.exports = {
    showTambahProyek,
    mainpageuser
};
