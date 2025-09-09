const LDokter_models = require('../models/LDokter_models');
const path = require('path');
const fs = require('fs');
const { searchDataDokterByName } = require('../models/LDokter_models');
const bcrypt = require('bcrypt');
const getDokter = (req, res) => {
    LDokter_models.getDataDokter((err, DokterData) => {
        if (err) {
            return res.status(500).send('Error retrieving data');
        }
        res.render('admin/LDokter_admin', {
            title: 'Data Staff Kesehatan',
            layout: 'layouts/main-layout-admin',
            DokterData: DokterData
        });
    });
};

const getDokterById = (req, res) => {
    const id = req.params.id_stafkesehatan;
    console.log('Received ID:', id);  // Log the received ID

    LDokter_models.getDataDokterById(id, (err, DokterData) => {
        if (err) {
            console.error('Error retrieving data:', err);
            return res.status(500).send('Error retrieving data');
        }
        if (!DokterData) {
            console.log('Dokter not found for ID:', id);  // Log if hospital not found
            return res.status(404).send('Dokter not found');
        }
        console.log('Dokter Data:', DokterData);  // Log the retrieved data
        res.render('admin/DetailPDokter_admin', {
            title: 'Detail Profil Staff Kesehatan',
            layout: 'layouts/main-layout-admin',
            DokterData: DokterData
        });
    });
};
const addDataDokter = async (req, res) => {
    const { 
        namalengkap_stafkesehatan, 
        username_stafkesehatan, 
        password_stafkesehatan, 
        spesialisasi_stafkesehatan, 
        noinduk_stafkesehatan, 
        email_stafkesehatan, 
        nomortelepon_stafkesehatan, 
        jeniskelamin_stafkesehatan,
        status 
    } = req.body;
    let photo_stafkesehatan = 'users.jpg';

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password_stafkesehatan, 10);

        if (req.file) {
            const tempPath = req.file.path;
            const targetDir = path.join(__dirname, '../assets/img');
            const targetPath = path.join(targetDir, req.file.filename);

            if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
            }

            fs.rename(tempPath, targetPath, err => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error uploading photo');
                }

                photo_stafkesehatan = req.file.filename;
                const newDokterData = {
                    namalengkap_stafkesehatan,
                    username_stafkesehatan,
                    password_stafkesehatan: hashedPassword,
                    spesialisasi_stafkesehatan,
                    noinduk_stafkesehatan,
                    email_stafkesehatan,
                    nomortelepon_stafkesehatan,
                    jeniskelamin_stafkesehatan,
                    photo_stafkesehatan,
                    status: 1,
                    role_user: "Staff Kesehatan"
                };

                LDokter_models.addDataDokter(newDokterData, (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('Error adding data');
                    }
                    console.log('Data added successfully:', result);
                    res.redirect('/LDokter_admin');
                });
            });
        } else {
            const newDokterData = {
                namalengkap_stafkesehatan,
                username_stafkesehatan,
                password_stafkesehatan: hashedPassword,
                spesialisasi_stafkesehatan,
                noinduk_stafkesehatan,
                email_stafkesehatan,
                nomortelepon_stafkesehatan,
                jeniskelamin_stafkesehatan,
                photo_stafkesehatan,
                status: 1,
                role_user: "Staff Kesehatan"
            };

            LDokter_models.addDataDokter(newDokterData, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error adding data');
                }
                console.log('Data added successfully:', result);
                res.redirect('/admin/LDokter_admin');
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send('Error processing request');
    }
}

const searchDataDokter = (req, res) => {
    const searchQuery = req.query.q;
    searchDataDokterByName(searchQuery, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
}
const editDataDokter = (req, res) => {
    const id = req.params.id_stafkesehatan;

    LDokter_models.getDataDokterById(id, (err, DokterData) => {
        if (err) {
            console.error('Error retrieving data:', err);
            return res.status(500).send('Error retrieving data');
        }
        res.render('admin/EditPDokter_admin', {
            title: 'Edit Profil Staff Kesehatan',
            layout: 'layouts/main-layout-admin',
            DokterData: DokterData
        });
    });
};
const updateDataDokter = (req, res) => {
    const id = req.params.id_stafkesehatan;
    const {
        namalengkap_stafkesehatan,
        username_stafkesehatan,
        spesialisasi_stafkesehatan,
        noinduk_stafkesehatan,
        email_stafkesehatan,
        nomortelepon_stafkesehatan,
        jeniskelamin_stafkesehatan,
        status,
        existing_photo_doctor  // Retrieve the existing photo from the request body
    } = req.body;

    let photo_stafkesehatan = existing_photo_doctor;

    if (req.file) {
        const tempPath = req.file.path;
        const targetDir = path.join(__dirname, '../assets/img');
        const targetPath = path.join(targetDir, req.file.filename);

        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        fs.rename(tempPath, targetPath, err => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error uploading photo');
            }

            photo_stafkesehatan = req.file.filename;
        });
    }

    const updatedDokterData = {
        namalengkap_stafkesehatan,
        username_stafkesehatan,
        spesialisasi_stafkesehatan,
        noinduk_stafkesehatan,
        email_stafkesehatan,
        nomortelepon_stafkesehatan,
        jeniskelamin_stafkesehatan,
        photo_stafkesehatan,
        status
    };

    LDokter_models.updateDataDokterById(id, updatedDokterData, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error updating data');
        }
        console.log('Data updated successfully:', result);
        res.redirect(`/DetailPDokter_admin/${id}`);
    });
};
const deleteDataDokter = (req, res) => {
    const id = req.params.id_stafkesehatan;
    LDokter_models.deleteDataDokterById(id, (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Gagal menghapus data' });
        }
        return res.status(200).json({ success: true, message: 'Data berhasil dihapus' });
    });
};
const renderpassDokter = (req, res) => {
    const id = req.params.id_stafkesehatan;
    LDokter_models.getDataDokterById(id, (err, DokterData) => {
        if (err) {
            console.error('Error retrieving data:', err);
            return res.status(500).send('Error retrieving data');
        }
        res.render('admin/EditPassPDokter_admin', {
            title: 'Edit Password Staff Kesehatan',
            layout: 'layouts/main-layout-admin',
            DokterData: DokterData
        });
    });
};

const comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
};

const updatePasswordDoctor = (req, res) => {
    const id = req.params.id_stafkesehatan;
    const { password_lama, password_baru } = req.body;

    LDokter_models.getDataDokterById(id, (err, DokterData) => {
        if (err) {
            console.error('Error retrieving data:', err);
            return res.status(500).send('Error retrieving data');
        }

        if (!comparePassword(password_lama, DokterData.password_stafkesehatan)) {
            return res.status(400).json({ success: false, message: 'Password lama tidak sesuai' });
        }

        const hashedPassword = bcrypt.hashSync(password_baru, 10);
        const updatedPassword = {
            password_stafkesehatan: hashedPassword
        };

        LDokter_models.updatepassDokterById(id, updatedPassword, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error updating password');
            }
            console.log('Password updated successfully:', result);
            res.redirect(`/DetailPDokter_admin/${id}`);
        });
    });
};

module.exports = {
    getDokter,
    getDokterById,
    addDataDokter,
    addDataDokter,
    searchDataDokter,
    editDataDokter,
    updateDataDokter,
    deleteDataDokter,
    renderpassDokter,
    updatePasswordDoctor
}