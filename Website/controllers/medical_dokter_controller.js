const medical_dokter_model = require('../models/medical_dokter_model');

const getAllLayananDokterByStaffIdMedical = (req, res) => {
    const staffId = req.user.id_stafkesehatan; // Assuming you store user info in req.user

    medical_dokter_model.getAllLayananDokterByStaffIdMedical(staffId, (err, layanan) => {
        if (err) {
            return res.status(500).send('Error retrieving layanan data');
        }
        medical_dokter_model.getAllLayananDokterByStaffIdMedical1(staffId, (err, layanan1) => {
            if (err) {
                return res.status(500).send('Error retrieving layanan data');
            }
            
            res.render('dokter/LMedical_dokter', {
                title: 'Layanan Medical Dokter',
                layout: 'layouts/main-layouts-dokter',
                layanan : layanan,
                layanan1 : layanan1
            });
        });
    });
};



const MedicalDokterDetail = (req, res) => {
    const id_medical = req.params.id_medical;
    console.log("ID Medical: ", id_medical);  // <-- Add this line

    medical_dokter_model.MedicalDokterDetail(id_medical, (err, PelayananMedical) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching medical services', error: err });
            return;
        }
        
        console.log("PelayananMedical Data: ", PelayananMedical);  // <-- Add this line

        res.render('dokter/LMedical_dokter_detail', {
            title: 'Detail Layanan Medical Dokter',
            layout: 'layouts/main-layouts-dokter',
            PelayananMedical: PelayananMedical[0]  // Ensure accessing the first element if results is an array
        });
    });
};





module.exports = {
    getAllLayananDokterByStaffIdMedical,
    MedicalDokterDetail
};