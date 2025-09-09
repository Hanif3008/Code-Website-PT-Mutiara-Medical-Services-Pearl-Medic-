// historidarurat_middleware.js
const { DaruratHistory } = require('../models/historipelayanan_models');

const historiDaruratMiddleware = (req, res, next) => {
    const user = req.session.user;
    const id_perusahaan = user.id_perusahaan;

    // Mengambil data histori pelayanan darurat untuk perusahaan yang sedang login
    DaruratHistory.getDataByIdPerusahaanDarurat(id_perusahaan, (err, dataHistoriDarurat) => {
        if (err) {
            console.error('Terjadi kesalahan saat mengambil data histori pelayanan darurat:', err);
            return res.status(500).send('Internal Server Error');
        }

        // Menambahkan data histori pelayanan darurat ke dalam objek res.locals
        res.locals.dataHistoriDarurat = dataHistoriDarurat;
        next(); // Lanjutkan ke middleware/handler berikutnya
    });
};

module.exports = historiDaruratMiddleware;
