// historimedicalmiddleware.js
const { MedicalHistory } = require('../models/historipelayanan_models');

const historiMedicalMiddleware = (req, res, next) => {
    const user = req.session.user;
    const id_perusahaan = user.id_perusahaan;

    // Mengambil data histori pelayanan medis untuk perusahaan yang sedang login
    MedicalHistory.getDataByIdPerusahaan(id_perusahaan, (err, dataHistoriMedical) => {
        if (err) {
            console.error('Terjadi kesalahan saat mengambil data histori pelayanan medis:', err);
            return res.status(500).send('Internal Server Error');
        }

        // Menambahkan data histori pelayanan medis ke dalam objek res.locals
        res.locals.dataHistoriMedical = dataHistoriMedical;
        next(); // Lanjutkan ke middleware/handler berikutnya
    });
};

module.exports = historiMedicalMiddleware;
