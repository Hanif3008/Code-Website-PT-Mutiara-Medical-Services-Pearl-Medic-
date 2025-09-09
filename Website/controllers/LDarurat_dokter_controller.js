const LDarurat_dokter_model = require('../models/LDarurat_dokter_model');

const getAllLayananDaruratDokterByStaffId = (req, res) => {
    const staffId = req.user.id_stafkesehatan; // Assuming you store user info in req.user

    LDarurat_dokter_model.getAllLayananDaruratDokter(staffId, (err, layanan) => {
        if (err) {
            return res.status(500).send('Error retrieving layanan data');
        }

        LDarurat_dokter_model.getAllLayananDaruratDokter1(staffId, (err, layanan1) => {
            if (err) {
                return res.status(500).send('Error retrieving layanan data');
            }
            
            res.render('dokter/LDarurat_dokter', {
                title: 'Layanan Darurat Dokter',
                layout: 'layouts/main-layouts-dokter',
                layanan : layanan,
                layanan1 : layanan1
            });
        });
    });
};
const DaruratDokterDetail = (req, res) => {
    const id_darurat = req.params.id_darurat;
    console.log("ID Darurat: ", id_darurat);  // Debugging output

    LDarurat_dokter_model.DaruratDokterDetail(id_darurat, (err, darurat) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error retrieving darurat data', error: err });
            return;
        }

        console.log("Darurat Data: ", darurat);  // Debugging output

        // Check if darurat is defined
        if (!darurat) {
            return res.status(404).json({ message: 'No data found for the given ID' });
        }

        res.render('dokter/LDarurat_dokter_detail', {
            title: 'Detail Layanan Darurat Dokter',
            layout: 'layouts/main-layouts-dokter',
            darurat: darurat  // Correctly pass the darurat object
        });
    });
};



module.exports = {
    getAllLayananDaruratDokterByStaffId,
    DaruratDokterDetail
}