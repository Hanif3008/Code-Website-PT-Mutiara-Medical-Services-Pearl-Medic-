// historiobat_client.js
const PelayananObat = require('../models/pembelian_obat_models');

const historiMiddleware = (req, res, next) => {
    const user = req.session.user;
    const id_perusahaan = user.id_perusahaan;

    // Mengambil data pelayanan obat untuk perusahaan yang sedang login
    PelayananObat.getDataByIdPerusahaan(id_perusahaan, (err, dataPelayananObat) => {
        if (err) {
            console.error('Terjadi kesalahan saat mengambil data pelayanan obat:', err);
            return res.status(500).send('Internal Server Error');
        }

        res.locals.dataPelayananObat = dataPelayananObat;
        next();
    });
};



module.exports = historiMiddleware;
