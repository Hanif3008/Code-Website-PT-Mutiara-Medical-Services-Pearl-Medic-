const LDarurat_admin_model = require('../models/LDaruratAdmin_model');


const displayAllDaruratServices = (req, res) => {
    LDarurat_admin_model.displayAllDaruratServices((err, PelayananDarurat) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching darurat services', error: err });
            return;
        }
        res.render('admin/LDarurat_admin', { 
            title: 'Pelayanan Darurat',
            layout: 'layouts/main-layout-admin',
            PelayananDarurat: PelayananDarurat
        });
    });
}
const displayAllDataDaruratById = (req, res) => {
    const id_darurat = req.params.id_darurat;
    LDarurat_admin_model.displayDaruratServicesById(id_darurat, (err, PelayananDarurat) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching darurat services', error: err });
            return;
        }
        LDarurat_admin_model.displayDataDokterDaruratServices((err, dokterData) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Error fetching darurat services', error: err });
                return;
            }
        res.render('admin/LPelayananDetailDarurat_admin', {
            title: 'Detail Pelayanan Darurat',
            layout: 'layouts/main-layout-admin',
            PelayananDarurat: PelayananDarurat,
            dokterData: dokterData
        });
    });
    });
}


const UpdateDaruratServices = (req, res) => {
    const id_darurat = req.params.id_darurat;   
    const {status, input_dokter} = req.body;

    LDarurat_admin_model.UpdateDaruratServices(id_darurat, input_dokter, status, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error updating darurat service', error: err });
            return;
        }
        res.redirect(`/LPelayananDetailDarurat_admin/${id_darurat}`);
    });
};

const updateStatusDaruratServices = (req, res) => {
    const id_darurat = req.params.id_darurat;
    const status = req.body.status_darurat;
    LDarurat_admin_model.updateStatusDaruratServices(id_darurat, status, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error updating darurat service', error: err });
            return;
        }
        res.redirect('/LDarurat_admin');
    });
};

const deleteDaruratServices = (req, res) => {
    const id_darurat = req.params.id_darurat;
    console.log(`Deleting darurat service with id: ${id_darurat}`);
    LDarurat_admin_model.deleteDaruratServices(id_darurat, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error deleting darurat service', error: err });
            return;
        }
        console.log('Darurat service deleted successfully');
        res.status(200).json({ message: 'Darurat service deleted successfully' });
    });
};



module.exports = {
    displayAllDaruratServices,
    displayAllDataDaruratById,
    UpdateDaruratServices,
    updateStatusDaruratServices,
    deleteDaruratServices
}