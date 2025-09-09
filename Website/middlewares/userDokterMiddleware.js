const userDokterModel = require('../models/index_dokter_model');


const addStaffDokterProfileDataToLocals = (req, res, next) => {
    if (!req.session.user || !req.session.user.id_stafkesehatan) {
        return res.redirect('/login_dokter');
    }

    const staffId = req.session.user.id_stafkesehatan;

    userDokterModel.getStaffDokterById(staffId, (err, staff) => {
        if (err) {
            console.error('Error fetching staff data:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (!staff) {
            return res.status(404).send('Staff Not Found');
        }

        // Pastikan nama lengkap staf kesehatan ada sebelum memproses
        if (staff.namalengkap_stafkesehatan) {
            // Gunakan regex untuk menghapus awalan "dr." atau varian lainnya
            const nameWithoutTitle = staff.namalengkap_stafkesehatan.replace(/^dr\.\s*/i, '').trim();
            const firstName = nameWithoutTitle.split(' ')[0]; // Ambil nama pertama setelah menghapus "dr."
            staff.firstName = firstName;
        } else {
            staff.firstName = ''; // Set nama depan ke string kosong jika tidak ada nama lengkap
        }

        // Tambahkan data staf ke res.locals untuk diakses di view
        res.locals.staff = staff;
        next();
    });
};

module.exports = addStaffDokterProfileDataToLocals;

