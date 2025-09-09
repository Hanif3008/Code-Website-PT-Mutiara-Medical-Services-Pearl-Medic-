// historivaksin_middleware.js
const { VaksinHistory } = require('../models/historipelayanan_models');

const historiVaksinMiddleware = (req, res, next) => {
    const user = req.session.user;
    const id_perusahaan = user.id_perusahaan;

    // Mengambil data histori pelayanan vaksin untuk perusahaan yang sedang login
    VaksinHistory.getDataByIdPerusahaanvaksin(id_perusahaan, (err, dataHistoriVaksin) => {
        if (err) {
            console.error('Terjadi kesalahan saat mengambil data histori pelayanan vaksin:', err);
            return res.status(500).send('Internal Server Error');
        }

        // Menambahkan data histori pelayanan vaksin ke dalam objek res.locals
        res.locals.dataHistoriVaksin = dataHistoriVaksin;
        next(); // Lanjutkan ke middleware/handler berikutnya
    });
};

module.exports = historiVaksinMiddleware;
