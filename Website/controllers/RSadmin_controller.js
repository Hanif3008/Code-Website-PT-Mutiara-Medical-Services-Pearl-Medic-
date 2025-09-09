const RSadmin_model = require('../models/RSadmin_model');
const path = require('path');
const fs = require('fs');
const { deleteDataRsById } = require('../models/RSadmin_model');

const getRSadmin = (req, res) => {
    RSadmin_model.getDataRs((err, RSData) => {
        if (err) {
            return res.status(500).send('Error retrieving data');
        }
        res.render('admin/LRs_admin', {
            title: 'Data Rumah Sakit',
            layout: 'layouts/main-layout-admin',
            RSData: RSData
        });
    });
};

const getRSadminById = (req, res) => {
    const id = req.params.id_rs;
    console.log('Received ID:', id);  // Log the received ID

    RSadmin_model.getDataRsById(id, (err, RSData) => {
        if (err) {
            console.error('Error retrieving data:', err);
            return res.status(500).send('Error retrieving data');
        }
        if (!RSData) {
            console.log('Hospital not found for ID:', id);  // Log if hospital not found
            return res.status(404).send('Hospital not found');
        }
        console.log('Hospital Data:', RSData);  // Log the retrieved data
        res.render('admin/DetailRS_admin', {
            title: 'Detail Rumah Sakit',
            layout: 'layouts/main-layout-admin',
            RSData: RSData
        });
    });
};

const editRSadmin = (req, res) => {
    const id = req.params.id_rs;

    RSadmin_model.getDataRsById(id, (err, RSData) => {
        if (err) {
            return res.status(500).send('Error retrieving data');
        }
        res.render('admin/EditDetailRS_admin', {
            title: 'Edit Data Rumah Sakit',
            layout: 'layouts/main-layout-admin',
            RSData: RSData
        });
    });
};

const updateRSadmin = (req, res) => {
    const id = req.params.id_rs;
    const { nama_rs, email_rs, nomortelepon_rs, status_rs, alamat_rs, existing_photo_rs } = req.body;
    let photo_rs = existing_photo_rs; // Use the existing photo if no new file is uploaded

    if (req.file) {
        const tempPath = req.file.path;
        const targetDir = path.resolve(__dirname, '../public/img/');
        const targetPath = path.join(targetDir, req.file.filename);

        // Ensure the target directory exists
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        fs.rename(tempPath, targetPath, err => {
            if (err) {
                console.error('Error renaming file:', err);
                return res.status(500).send('Error updating photo');
            }

            photo_rs = req.file.filename;
            const updatedData = {
                nama_rs,
                email_rs,
                nomortelepon_rs,
                status_rs: parseInt(status_rs),
                alamat_rs,
                photo_rs
            };

            RSadmin_model.updateDataRsById(id, updatedData, (err, result) => {
                if (err) {
                    return res.status(500).send('Error updating data');
                }
                res.redirect(`/DetailRS_admin/${id}`);
            });
        });
    } else {
        const updatedData = {
            nama_rs,
            email_rs,
            nomortelepon_rs,
            status_rs: parseInt(status_rs),
            alamat_rs,
            photo_rs
        };

        RSadmin_model.updateDataRsById(id, updatedData, (err, result) => {
            if (err) {
                return res.status(500).send('Error updating data');
            }
            res.redirect(`/DetailRS_admin/${id}`);
        });
    }
};
const searchRSadmin = (req, res) => {
    const searchQuery = req.query.q;

    if (!searchQuery) {
        return res.status(400).send('Search query is required');
    }

    RSadmin_model.searchDataRsByName(searchQuery, (err, RSData) => {
        if (err) {
            return res.status(500).send('Error retrieving data');
        }
        if (RSData.length === 0) {
            return res.json([]);
        }
        res.json(RSData);
    });
};
const addRSadmin = (req, res) => {
    const { nama_rs, email_rs, nomortelepon_rs, status_rs, alamat_rs } = req.body;
    let photo_rs = 'default.jpg'; // Default photo if not uploaded

    if (req.file) {
        const tempPath = req.file.path;
        const targetDir = path.resolve(__dirname, '../assets/img');
        const targetPath = path.join(targetDir, req.file.filename);

        // Ensure the target directory exists
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        fs.rename(tempPath, targetPath, err => {
            if (err) {
                console.error('Error renaming file:', err);
                return res.status(500).send('Error uploading photo');
            }

            photo_rs = req.file.filename;
            const newRSData = {
                nama_rs,
                email_rs,
                nomortelepon_rs,
                status_rs: parseInt(status_rs),
                alamat_rs,
                photo_rs
            };

            RSadmin_model.addDataRs(newRSData, (err, result) => {
                if (err) {
                    return res.status(500).send('Error adding hospital');
                }
                res.redirect('/LRS_admin');
            });
        });
    } else {
        const newRSData = {
            nama_rs,
            email_rs,
            nomortelepon_rs,
            status_rs: parseInt(status_rs),
            alamat_rs,
            photo_rs
        };

        RSadmin_model.addDataRs(newRSData, (err, result) => {
            if (err) {
                return res.status(500).send('Error adding hospital');
            }
            res.redirect('/LRs_admin');
        });
    }
};
const deleteRSadmin = (req, res) => {
    const { id_rs } = req.params;

    deleteDataRsById(id_rs, (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Gagal menghapus data' });
        }
        return res.status(200).json({ success: true, message: 'Data successfully deleted' });
    });
};



module.exports = {
    getRSadmin,
    getRSadminById,
    editRSadmin,
    updateRSadmin,
    searchRSadmin,
    addRSadmin,
    deleteRSadmin
};