const path = require('path');
const fs = require('fs');
const profileClientModel = require('../models/profile_client_models');
const bcrypt = require('bcrypt');
const proyekClientModel = require('../models/proyek_client_models');
const proyeksementara_model = require('../models/proyeksementara_model');


const getProfileClient = (req, res) => {
    if (!req.session.user || !req.session.user.id_perusahaan) {
        return res.status(401).send('Unauthorized');
    }
    const companyId = req.session.user.id_perusahaan;
    const dataHistoriMedical = res.locals.dataHistoriMedical;
    const dataPelayananObat = res.locals.dataPelayananObat;
    const dataHistoriDarurat = res.locals.dataHistoriDarurat; // Tambahkan baris ini
    profileClientModel.getCompanyProfile(companyId, (err, perusahaan) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Internal Server Error');
        }
        if (!perusahaan) {
            return res.status(404).send('Profile Not Found');
        }

        proyekClientModel.getProjectsByCompanyId(companyId, (err, projects) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).send('Internal Server Error');
            }

            proyeksementara_model.getTempProjectsByCompanyId(companyId, (err, tempProjects) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).send('Internal Server Error');
                }

                // Konversi nilai status_perusahaan
                const statusPerusahaan = perusahaan.status_perusahaan === 1 ? 'Aktif' : 'Nonaktif';

                res.render('client/profile_client', {
                    title: 'Profil Anda',
                    layout: 'layouts/main-client-layout',
                    perusahaan,
                    statusPerusahaan,
                    projects, // Mengirimkan data proyek ke view
                    tempProjects,
                    dataHistoriMedical,
                    dataPelayananObat,
                    dataHistoriDarurat // Tambahkan baris ini
                });
            });
        });
    });
};
const getEditProfileClient = (req, res) => {
    if (!req.session.user || !req.session.user.id_perusahaan) {
        return res.status(401).send('Unauthorized');
    }
    const userId = req.session.user.id_perusahaan;

    profileClientModel.getCompanyProfile(userId, (err, perusahaan) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Internal Server Error');
        }
        if (!perusahaan) {
            return res.status(404).send('Profile Not Found');
        }

        res.render('client/editprofile_client', {
            title: 'Edit Profil Perusahaan',
            layout: 'layouts/main-client-layout',
            perusahaan // Mengirim objek perusahaan ke view
        });
    });
};

const updateProfileClient = (req, res) => {
    // Periksa apakah ada file foto baru yang diunggah
    let photo_perusahaan = req.body.current_photo;

    if (req.file) {
        // Jika ada file foto baru, simpan ke server dan sesuaikan data foto profil
        const photoPath = path.join(__dirname, '../public/img', req.file.filename);
        if (fs.existsSync(photoPath)) {
            fs.unlinkSync(photoPath);
        }
        photo_perusahaan = req.file.filename;
    }

    // Tetapkan foto profil sebelumnya jika tidak ada file foto baru yang diunggah
    // (artinya pengguna hanya mengedit data lainnya)
    const userId = req.session.user.id_perusahaan;
    const { nama_perusahaan, bidang_perusahaan, email_perusahaan, nomortelepon_perusahaan, alamat_perusahaan } = req.body;
    const updatedData = {
        nama_perusahaan,
        bidang_perusahaan,
        email_perusahaan,
        nomortelepon_perusahaan,
        alamat_perusahaan,
        photo_perusahaan
    };

    // Update data profil pengguna
    profileClientModel.updateCompanyProfile(userId, updatedData, (err) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.redirect('/profile_client');
    });
};
const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.session.user.id_perusahaan;

    try {
        // Mendapatkan profil perusahaan
        const perusahaan = await profileClientModel.getCompanyProfileAsync(userId);

        if (!perusahaan) {
            return res.status(404).send('Profile Not Found');
        }

        // Debug log untuk memastikan password lama diambil dengan benar
        console.log('Password lama dari database:', perusahaan.password_perusahaan);

        // Memeriksa kecocokan password lama
        const passwordMatch = await bcrypt.compare(oldPassword, perusahaan.password_perusahaan);

        if (!passwordMatch) {
            return res.status(400).send('Password lama tidak cocok');
        }

        // Hash password baru
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password di database
        await profileClientModel.updatePasswordAsync(userId, hashedPassword);

        res.redirect('/profile_client');
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Internal Server Error');
    }
};

const deleteTempProject = (req, res) => {
    const projectId = req.body.projectId;
    proyeksementara_model.deleteTempProjectById(projectId, (err) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.redirect('/profile_client');
    });
};


const getProjectDetail = (req, res) => {
    const projectId = req.query.id_proyek;

    proyekClientModel.getProjectById(projectId, (err, project) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Internal Server Error');
        }
        if (!project) {
            return res.status(404).send('Project Not Found');
        }

        res.render('client/detailproyek_client', {
            title: 'Detail Proyek',
            layout: 'layouts/main-client-layout',
            project
        });
    });
};


module.exports = {
    getProfileClient,
    getEditProfileClient,
    updateProfileClient,
    changePassword,
    deleteTempProject,
    getProjectDetail
};
