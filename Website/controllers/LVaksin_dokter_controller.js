LVaksin_dokter_model = require('../models/LVaksin_dokter_model.js');


const getAllLayananVaksinByStaffId = (req, res) => {
    const staffId = req.user.id_stafkesehatan; // Assuming you store user info in req.user

    LVaksin_dokter_model.getAllLayananVaksinByStaffId(staffId, (err, layanan) => {
        if (err) {
            return res.status(500).send('Error retrieving layanan data');
        }
        LVaksin_dokter_model.getAllLayananDokterByStaffIdVaksin1(staffId, (err, layanan1) => {
            if (err) {
                return res.status(500).send('Error retrieving layanan data');
            }
            
            res.render('dokter/LVaksin_dokter', {
                title: 'Layanan Vaksin Dokter',
                layout: 'layouts/main-layouts-dokter',
                layanan : layanan,
                layanan1 : layanan1
            });
        });
    });
};

const VaksinDokterDetail = (req, res) => {
    const id_vaksin = req.params.id_vaksinasi; // Correct param name here
    console.log("ID Vaksin: ", id_vaksin);

    LVaksin_dokter_model.VaksinDokterDetail(id_vaksin, (err, vaksin) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error retrieving vaksin data', error: err });
            return;
        }

        res.render('dokter/LVaksin_dokter_detail', {
            title: 'Detail Vaksin Dokter',
            layout: 'layouts/main-layouts-dokter',
            vaksin: vaksin
        });
    });
};


module.exports = {
    getAllLayananVaksinByStaffId,
    VaksinDokterDetail
};