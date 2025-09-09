// In profileKstaff_controller.js
const ProfileKstaff = require('../models/profileKstaff_model');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'assets/img'); // Destination folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});
const uploadpic = multer({ storage: storage });

const getProfileKstaff = (req, res) => {
    const id = req.user.id_kstafadmin;

    ProfileKstaff.getKstaffAdminById(id, (err, kstaffData) => {
        if (err) {
            return res.status(500).send('Error retrieving data');
        }
        res.render('Kadmin/profileKstaff_admin', {
            title: 'Profile Kepala Staff',
            layout: 'layouts/main-layout-Kadmin',
            kstaffData: kstaffData
        });
    });
};

const editProfileKstaff = (req, res) => {
    const id = req.user.id_kstafadmin;

    ProfileKstaff.getKstaffAdminById(id, (err, kstaffData) => {
        if (err) {
            return res.status(500).send('Error retrieving data');
        }
        res.render('Kadmin/editPKstaff_admin', {
            title: 'Edit Profil Kepala Staff Admin',
            layout: 'layouts/main-layout-Kadmin',
            kstaffData: kstaffData
        });
    });
};

const updateProfileKstaff = (req, res) => {
    const id = req.user.id_kstafadmin;
    const updatedData = {
        namalengkap_kstafadmin: req.body.nama_lengkap, // Perhatikan perubahan di sini
        username_kstafadmin: req.body.username,
        email_kstafadmin: req.body.email,
        nomortelepon_kstafadmin: req.body.nomor_telepon,
        alamat_kstafadmin: req.body.alamat
    };

    if (req.file) {
        updatedData.photo_kstafadmin = req.file.filename; // Save the new filename
    }

    // Perbarui pemanggilan fungsi ke yang sesuai dengan definisi di model
    ProfileKstaff.updateKstaffAdminById(id, updatedData, (err) => {
        if (err) {
            return res.status(500).send('Error updating data');
        }
        res.redirect('/profileKstaff_admin');
    });
};




const getGantiPassKadmin = (req, res) => {
    const id = req.user.id_kstafadmin;

    ProfileKstaff.getKstaffAdminById(id, (err, kstaffData) => {
        if (err) {
            return res.status(500).send('Error retrieving data');
        }
        res.render('Kadmin/gantipass_Kadmin', {
            title: 'Ganti Password',
            layout: 'layouts/main-layout-Kadmin',
            password_kstafadmin: kstaffData.password_kstafadmin // Mengirim password dari database ke template
        });
    });
};
const changePasswordKadmin = async (req, res) => {
    const id = req.user.id_kstafadmin;
    const { passwordLama, passwordBaru, konfirmasiPassword } = req.body;

    try {
        // Fetch the current password hash from the database
        const kstaffData = await ProfileKstaff.getKstaffAdminByIdAsync(id);
        console.log('Current password hash from DB:', kstaffData.password_kstafadmin);

        // Check if the old password is correct
        const match = await bcrypt.compare(passwordLama, kstaffData.password_kstafadmin);
        if (!match) {
            return res.status(400).render('Kadmin/gantipass_Kadmin', {
                title: 'Ganti Password',
                layout: 'layouts/main-layout-Kadmin',
                password_kstafadmin: '',
                errorMessage: 'Password lama tidak cocok'
            });
        }

        // Check if the new password matches the confirmation password
        if (passwordBaru !== konfirmasiPassword) {
            return res.status(400).render('Kadmin/gantipass_Kadmin', {
                title: 'Ganti Password',
                layout: 'layouts/main-layout-Kadmin',
                password_kstafadmin: '',
                errorMessage: 'Password baru dan konfirmasi password tidak cocok'
            });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(passwordBaru, 10);

        // Update the password in the database
        await ProfileKstaff.updatePasswordByIdAsync(id, hashedPassword);

        // Redirect to profile page after successful update
        res.redirect('/profileKstaff_admin');
    } catch (err) {
        console.error('Error updating password:', err);
        res.status(500).send('Error updating password');
    }
};


module.exports = {
    getProfileKstaff,
    editProfileKstaff,
    updateProfileKstaff,
    uploadpic,
    getGantiPassKadmin,
    changePasswordKadmin
};
