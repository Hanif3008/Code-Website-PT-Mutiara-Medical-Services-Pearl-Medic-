const perusahaanAdmin_model = require('../models/perusahaanAdmin_model');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const { editDetailProyekById } = require('../models/perusahaanAdmin_model');
const getPerusahaan = (req, res) => {
    perusahaanAdmin_model.getDataPerusahaan((err, DataPerusahaan) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error getting data');
        }
        perusahaanAdmin_model.getProyekRequests((err, DataProyek) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error getting project requests');
            }
            res.render('admin/LPerusahaan_admin', {
                title: 'Data Perusahaan',
                layout : 'layouts/main-layout-admin',
                DataPerusahaan: DataPerusahaan,
                DataProyek: DataProyek
            });
        });
    });
};
const getPerusahaanById = (req, res) => {
    const id_perusahaan = req.params.id_perusahaan;
    perusahaanAdmin_model.getDataPerusahaanById(id_perusahaan, (err, DataPerusahaan) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error getting data');
        }
        res.render('admin/PerusahaanDetail_admin', {
            title: 'Detail Perusahaan',
            layout : 'layouts/main-layout-admin',
            DataPerusahaan: DataPerusahaan
        });
    });
};
const addDataPerusahaan = (req, res) => {
    const {
        nama_perusahaan,
        bidang_perusahaan,
        email_perusahaan,
        username_perusahaan,
        password_perusahaan,
        nomortelepon_perusahaan,
        alamat_perusahaan,
        status_perusahaan,
        role_user 
    } = req.body;
    let photo_perusahaan = req.file.filename;

    try {
        // hash the password
        const hashedPassword = bcrypt.hashSync(password_perusahaan, 10);

        if (req.file) {
            const tempPath = req.file.path;
            const targetDir = path.join(__dirname, '../assets/img');
            const targetPath = path.join(targetDir, req.file.filename);

            if(!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
            }

            fs.rename(tempPath, targetPath, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error uploading image');
                }

                photo_perusahaan = req.file.filename;
                const newPerusahaan = {
                    nama_perusahaan,
                    bidang_perusahaan,
                    email_perusahaan,
                    username_perusahaan,
                    password_perusahaan: hashedPassword,
                    nomortelepon_perusahaan,
                    alamat_perusahaan,
                    photo_perusahaan,
                    status_perusahaan: 1,
                    role_user: "Client"
                };

                perusahaanAdmin_model.addDataPerusahaan(newPerusahaan, (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('Error adding data');
                    }
                    console.log('Data has been added', result);
                    res.redirect('/LPerusahaan_admin'); // Replace with your desired redirect URL
                });
            });
        } else {
            const newPerusahaan = {
                nama_perusahaan,
                bidang_perusahaan,
                email_perusahaan,
                username_perusahaan,
                password_perusahaan: hashedPassword,
                nomortelepon_perusahaan,
                alamat_perusahaan,
                photo_perusahaan,
                status_perusahaan: 1,
                role_user: "Client"
            };
            
            perusahaanAdmin_model.addDataPerusahaan(newPerusahaan, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error adding data');
                }
                console.log('Data has been added', result);
                res.redirect('/LPerusahaan_admin'); // Replace with your desired redirect URL
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send('Error adding data');
    }
};
const searchDataPerusahaanByname = (req, res) => {
    const searchQuery = req.query.q;

    if (!searchQuery) {
        return res.status(400).send('No search query');
    }

    perusahaanAdmin_model.searchDataPerusahaanByname(searchQuery, (err, DataPerusahaan) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error getting data');
        }
        if (DataPerusahaan.length === 0) {
            return res.status(404).send('Data not found');
        }
        res.json(DataPerusahaan);
    });
};
const displayEditPerusahaan = (req, res) => {
    const id_perusahaan = req.params.id_perusahaan;
    perusahaanAdmin_model.displayEditPerusahaanById(id_perusahaan, (err, DataPerusahaan) => {
        if (err)  {
            console.error(err);
            return res.status(500).send('Error getting data');
        }
        res.render('admin/EditProfilPerusahaan_admin', {
            title: 'Edit Data Profil Perusahaan',
            layout : 'layouts/main-layout-admin',
            DataPerusahaan: DataPerusahaan
        });
    });
};
const EditDataPerusahaan = (req, res) => {
    const id_perusahaan = req.params.id_perusahaan;
    const {
        nama_perusahaan,
        bidang_perusahaan,
        email_perusahaan,
        username_perusahaan,
        nomortelepon_perusahaan,
        existing_photo_perusahaan,
        alamat_perusahaan,
        status_perusahaan
    } = req.body;

    let photo_perusahaan = existing_photo_perusahaan;

    if (req.file) {
        const tempPath = req.file.path;
        const targetDir = path.join(__dirname, '../assets/img');
        const targetPath = path.join(targetDir, req.file.filename);

        if(!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        fs.rename(tempPath, targetPath, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error uploading image');
            }

            photo_perusahaan = req.file.filename;
        });
    }

    const updatedPerusahaan = {
        nama_perusahaan,
        bidang_perusahaan,
        email_perusahaan,
        username_perusahaan,
        nomortelepon_perusahaan,
        alamat_perusahaan,
        photo_perusahaan,
        status_perusahaan
    };

    perusahaanAdmin_model.EditDataPerusahaanById(id_perusahaan, updatedPerusahaan, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error updating data');
        }
        console.log('Data has been updated', result);
        res.redirect('/LPerusahaan_admin'); // Replace with your desired redirect URL
    });
};
const deleteDataPerusahaanById = (req, res) => {
    const id_perusahaan = req.params.id_perusahaan;
    perusahaanAdmin_model.deleteDataPerusahaanById(id_perusahaan, (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Gagal menghapus data' });
        }
        return res.status(200).json({ success: true, message: 'Data berhasil dihapus' });
    });
};
const getProyekRequestsById = (req, res) => {
    const id_proyek_request = req.params.id_proyek_request;
    perusahaanAdmin_model.getProyekRequestsById(id_proyek_request, (err, DataProyek) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error getting project requests');
        }
        res.render('admin/ReqProyekP_admin', {
            title: 'Detail Permintaan Proyek Baru',
            layout : 'layouts/main-layout-admin',
            DataProyek: DataProyek
        });
    });
};
const acceptProyekRequest = (req, res) => {
    const id_proyek_request = req.params.id_proyek_request;
    perusahaanAdmin_model.acceptProyekRequest(id_proyek_request, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error accepting project request');
        }
        res.redirect('/LPerusahaan_admin'); // Replace with your desired redirect URL
    });
};
const rejectProyekRequest = (req, res) => {
    const id_proyek_request = req.params.id_proyek_request;
    perusahaanAdmin_model.rejectProyekRequest(id_proyek_request, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error rejecting project request');
        }
        res.redirect('/LPerusahaan_admin'); // Replace with your desired redirect URL
    });
};


const displayProyekPerusahaan = (req, res) => {
    const id_perusahaan = req.params.id_perusahaan;

    // Ambil data perusahaan
    perusahaanAdmin_model.getDataPerusahaanById(id_perusahaan, (err, DataPerusahaan) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error getting company data');
        }

        // Ambil data proyek
        perusahaanAdmin_model.displayProyekPerusahaanById(id_perusahaan, (err, DataProyek) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error getting project requests');
            }
            res.render('admin/ProyekP_admin', {
                title: 'Proyek Perusahaan',
                layout: 'layouts/main-layout-admin',
                DataPerusahaan: DataPerusahaan, // Kirim data perusahaan ke template
                DataProyek: DataProyek
            });
        });
    });
};

const searchProyek = (req, res) => {
    const searchTerm = req.query.q;

    if (!searchTerm) {
        return res.status(400).send('No search term provided');
    }

    perusahaanAdmin_model.searchProyek(searchTerm, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error searching project');
        }
        if (results.length === 0) {
            return res.status(404).send('Project not found');
        }
        res.json(results);
    });
};

const getDetailProyekById = (req, res) => {
    const id_proyek = req.params.id_proyek;
    perusahaanAdmin_model.getDetailProyekById(id_proyek, (err, proyek) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error getting project data');
        }
        res.render('admin/DetailProyekP_admin', {
            title: 'Detail Proyek Perusahaan',  
            layout: 'layouts/main-layout-admin',
            DataProyek: proyek // Kirim data proyek ke template
        });
    });
};

const displayEditDetailProyekById = (req, res) => {
    const id_proyek = req.params.id_proyek;
    perusahaanAdmin_model.displayEditDetailProyekById(id_proyek, (err, proyek) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error getting project data');
        }
        res.render('admin/EditDetailProyekP_admin', {
            title: 'Edit Proyek Perusahaan',
            layout: 'layouts/main-layout-admin',
            DataProyek: proyek // Kirim data proyek ke template
        });
    });
};

const editDetailProyekByIds = (req, res) => {
    const id_proyek = req.params.id_proyek;
    const { nama_proyek, jumlah_proyek, nomortelepon_proyek, status_proyek, lokasi_proyek, deskripsi_proyek } = req.body;

    editDetailProyekById(id_proyek, nama_proyek, jumlah_proyek, nomortelepon_proyek, lokasi_proyek, status_proyek, deskripsi_proyek, (err, result) => {
        if (err) {
            return res.status(500).send('Terjadi kesalahan saat mengupdate data proyek');
        }
        res.redirect(`/DetailProyekP_admin/${id_proyek}`);
    });
};

const tambahProyek = (req, res) => {
    const { id_perusahaan, nama_proyek, jumlah_proyek, nomortelepon_proyek, lokasi_proyek, deskripsi_proyek } = req.body;

    perusahaanAdmin_model.tambahProyek(
        id_perusahaan,
        nama_proyek,
        parseInt(jumlah_proyek), // Ensure it's a number
        nomortelepon_proyek,
        lokasi_proyek,
        1, // status_proyek
        deskripsi_proyek,
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error adding project');
            }
            res.redirect(`/ProyekP_admin/${id_perusahaan}`);
        }
    );
};

const deleteProyekById = (req, res) => {
    const id_proyek = req.params.id_proyek;
    perusahaanAdmin_model.deleteProyekById(id_proyek, (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Gagal menghapus data' });
        }
        return res.status(200).json({ success: true, message: 'Data successfully deleted' });
    });
};



module.exports = {
    getPerusahaan,
    getProyekRequestsById,
    acceptProyekRequest,
    rejectProyekRequest,
    getPerusahaanById,
    addDataPerusahaan,
    displayEditPerusahaan,
    EditDataPerusahaan,
    deleteDataPerusahaanById,
    searchDataPerusahaanByname,
    displayProyekPerusahaan,
    searchProyek,
    getDetailProyekById,
    displayEditDetailProyekById,
    editDetailProyekByIds,
    tambahProyek,
    deleteProyekById
};