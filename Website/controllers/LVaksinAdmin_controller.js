const LVaksinAdmin_model = require('../models/LVaksinAdmin_model');
// Display all vaksinasi services
const getAllVaksinasiServices = (req, res) => {
    LVaksinAdmin_model.getAllVaksinasiServices((err, PelayananVaksin) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching vaksinasi services', error: err });
            return;
        }
        res.render('admin/LVaksin_admin', { 
            title: 'Pelayanan Vaksinasi',
            layout: 'layouts/main-layout-admin',
            PelayananVaksin: PelayananVaksin
        });
    });
}
const getAlllDataVaccine = (req, res) => {
    LVaksinAdmin_model.getAlllDataVaccine((err, DataVaksin) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching vaksinasi services', error: err });
            return;
        }
        res.render('admin/StokVaksin_admin', {
            title: 'Pelayanan Vaksinasi',
            layout: 'layouts/main-layout-admin',
            DataVaksin: DataVaksin
        });
    });
}

const getAllDataVaccineById = (req, res) => {
    const id_vaksin = req.params.id_vaksin;
    LVaksinAdmin_model.getAllDataVaccineById(id_vaksin, (err, DataVaksin) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching vaksinasi services', error: err });
            return;
        }
        res.render('admin/DetailStokVaksin_admin', {
            title: 'Detail Stok Vaksin',
            layout: 'layouts/main-layout-admin',
            DataVaksin: DataVaksin[0] // Access the first element of the result array
        });
    });
}
const  updateDataVaccine = (req, res) => {
    const id_vaksin = req.params.id_vaksin;
    const data = req.body;
    LVaksinAdmin_model.updateDataVaccine(id_vaksin, data, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error updating vaksinasi services', error: err });
            return;
        }
        // redirect to stock vaccine page
        res.redirect('/StokVaksin_admin');
    });
}

const  tambahDataVaksin = (req, res) => {
    const data = req.body;  
    LVaksinAdmin_model.tambahDataVaksin(data, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error updating vaksinasi services', error: err });
            return;
        }
        // redirect to stock vaccine page
        res.redirect('/StokVaksin_admin');
    });
}

const deleteDataVaksin = (req, res) => {
    const id_vaksin = req.params.id_vaksin;
    LVaksinAdmin_model.deleteDataVaksin(id_vaksin, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error deleting vaksinasi services', error: err });
            return;
        }
        // Send a JSON response indicating success
        res.json({ message: 'data vaksin berhasil dihapus' });
    });
};


const getVaksinasiServiceDetailById = (req, res) => {
    const id_vaksinasi = req.params.id_vaksinasi;
    LVaksinAdmin_model.getAllVaksinasiServicesById(id_vaksinasi, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching vaksinasi service details', error: err });
            return;
        }
        LVaksinAdmin_model.displayDataDokterVaksinServices((err, dokterData) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Error fetching dokter data', error: err });
                return;
            }
            res.render('admin/LPelayananDetail_admin', {
                title: 'Detail Pemesanan Vaksin',
                layout: 'layouts/main-layout-admin',
                vaksinasiData: result,
                dokterData: dokterData
            });
        });
    });
};
const updateVaksinasiService = (req, res) => {
    const id_vaksinasi = req.params.id_vaksinasi;
    const { tanggal_pelayanan, jam_pelayanan, jumlah_vaksin, status, input_dokter } = req.body;

    LVaksinAdmin_model.updateVaccineServices(id_vaksinasi, input_dokter, tanggal_pelayanan, jam_pelayanan, jumlah_vaksin, status, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error updating vaksinasi service', error: err });
            return;
        }
        res.redirect(`/LPelayananDetail_admin/${id_vaksinasi}`);
    });
};
const deleteVaccineServices = (req, res) => {
    const id_vaksinasi = req.params.id_vaksinasi;
    LVaksinAdmin_model.deleteVaccineServices(id_vaksinasi, (err, result) => {
        if (err) {
            console.error(err); 
            res.status(500).json({ message: 'Error deleting vaksinasi service', error: err });
            return;
        }
        res.redirect('/LVaksin_admin');
    });
};
const updateStatusVaccineServices = (req, res) => {
    const id_vaksinasi = req.params.id_vaksinasi;
    const status = req.body.status_vaksin;
    LVaksinAdmin_model.updateStatusVaccineServices(id_vaksinasi, status, (err, result) => { 
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error updating vaksinasi service status', error: err });
            return;
        }
        res.redirect('/LVaksin_admin');
    });
};



module.exports = {
    getAllVaksinasiServices,
    getAlllDataVaccine,
    getAllDataVaccineById,
    updateDataVaccine,
    tambahDataVaksin,
    getVaksinasiServiceDetailById,
    updateVaksinasiService,
    deleteVaccineServices,
    updateStatusVaccineServices,
    deleteDataVaksin
}
