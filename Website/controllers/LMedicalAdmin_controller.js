const LMedicalAdmin_model = require('../models/LMedicalAdmin_model');   


const getAllMedicalServices = (req, res) => {
    LMedicalAdmin_model.getAllMedicalServices((err, PelayananMedical) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching medical services', error: err });
            return;
        }
        res.render('admin/LMedical_admin', { 
            title: 'Pelayanan Medical',
            layout: 'layouts/main-layout-admin',
            PelayananMedical: PelayananMedical
        });
    });
}

const getMedicalServicesById = (req, res) => {
    const id_medical = req.params.id_medical;
    LMedicalAdmin_model.getMedicalServicesById(id_medical, (err, PelayananMedical) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching medical services', error: err });
            return;
        }
        LMedicalAdmin_model.displayDataDokter((err, DataDokter) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Error fetching medical services', error: err });
                return;
            }
            res.render('admin/LPelayananDetailMedical_admin', {
                title: 'Detail Pelayanan Medical',
                layout: 'layouts/main-layout-admin',
                PelayananMedical: PelayananMedical, // Access the first element of the result array
                DataDokter: DataDokter
            });
        });
    });
}
const  updateMedicalServices = (req, res) => {
    const id_medical = req.params.id_medical;
    const {tanggal_pelayanan, jam_pelayanan, status, input_dokter} = req.body;

    LMedicalAdmin_model.updateMedicalServices(id_medical, input_dokter, tanggal_pelayanan, jam_pelayanan, status, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error updating medical services', error: err });
            return;
        }
        // redirect to medical service page
        res.redirect('/LMedical_admin');
    });
}

const updateStatusMedicalServices = (req, res) => {
    const id_medical = req.params.id_medical;
    const status = req.body.status_medical;
    LMedicalAdmin_model.updateStatusMedicalServices(id_medical, status, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error updating medical service status', error: err });
            return;
        }
        res.redirect('/LMedical_admin');
    });
};
const deleteMedicalServices = (req, res) => {
    const id_medical = req.params.id_medical;
    LMedicalAdmin_model.deleteMedicalServices(id_medical, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error deleting medical service', error: err });
            return;
        }
        res.status(200).json({ message: 'Medical service deleted successfully' });
    });
};


module.exports = {
    getAllMedicalServices,
    getMedicalServicesById,
    updateMedicalServices,
    updateStatusMedicalServices,
    deleteMedicalServices
}