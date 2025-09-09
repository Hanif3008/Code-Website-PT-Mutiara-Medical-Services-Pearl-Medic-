const ProfileKstaff = require('../models/profileKstaff_model');
const bcrypt = require('bcrypt');


const tambahAkunStafAdmin = async (req, res) => {
    try {
        const {
            nama_lengkap,
            username,
            password_akun,
            email,
            nomor_telepon,
            no_induk
        } = req.body;

        // Enkripsi password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password_akun, saltRounds);

        const photo_stafadmin = req.file ? req.file.filename : null;

        const newAkun = {
            namalengkap_stafadmin: nama_lengkap,
            username_stafadmin: username,
            password_stafadmin: hashedPassword, // Simpan password terenkripsi
            email_stafadmin: email,
            nomortelepon_stafadmin: nomor_telepon,
            noinduk_stafadmin: no_induk,
            photo_stafadmin: photo_stafadmin,
            jabatan_stafadmin: 'Staff Administrasi',
            status_stafadmin: 1,
            role_user: 'Staff Administrasi'
        };

        await ProfileKstaff.addKstaffAdminAsync(newAkun);
        res.redirect('/index_Kadmin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const renderIndexKadmin = async (req, res) => {
    try {
        ProfileKstaff.getAllKstaffAdmin((err, akunStafAdmin) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.render('Kadmin/index_Kadmin', { title: 'Dashboard Kepala Admin', layout: 'layouts/main-layout-Kadmin', akunStafAdmin: akunStafAdmin });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
const renderDetailStafAdmin = async (req, res) => {
    try {
        const id = req.params.id;
        const akunStafAdmin = await ProfileKstaff.getstaffAdminByIdAsync(id);
        if (!akunStafAdmin) {
            return res.status(404).send('Akun staf admin tidak ditemukan');
        }
        res.render('Kadmin/detailStafAdmin', { title: 'Detail Staf Administrasi', layout: 'layouts/main-layout-Kadmin', akunStafAdmin: akunStafAdmin });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
const renderEditDetailAkun = async (req, res) => {
    try {
        const id = req.params.id;
        const akunStafAdmin = await ProfileKstaff.getstaffAdminByIdAsync(id);
        if (!akunStafAdmin) {
            return res.status(404).send('Akun staf admin tidak ditemukan');
        }
        res.render('Kadmin/editDetailAkun', {
            title: 'Edit Detail Akun',
            layout: 'layouts/main-layout-Kadmin',
            akunStafAdmin: akunStafAdmin
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
const renderpasswordAkun = async (req, res) => {    
    try {
        const id = req.params.id;
        const akunStafAdmin = await ProfileKstaff.getstaffAdminByIdAsync(id);
        if (!akunStafAdmin) {
            return res.status(404).send('Akun staf admin tidak ditemukan');
        }
        res.render('Kadmin/gantiPassDetailAkun', {
            title: 'Edit Password Akun',
            layout: 'layouts/main-layout-Kadmin',
            akunStafAdmin: akunStafAdmin
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
const updateDetailAkun = async (req, res) => {
    try {
        const id = req.params.id;
        const { nama_lengkap, username, email, nomor_telepon, no_induk, status } = req.body;
        let photo_stafadmin = req.body.existing_photo_stafadmin;

        console.log("Request Body:", req.body); // Log the entire request body
        console.log("File:", req.file); // Log the uploaded file

        if (req.file) {
            photo_stafadmin = req.file.filename;
        }

        console.log("Updating staff admin with the following data:");
        console.log("ID:", id);
        console.log("Nama Lengkap:", nama_lengkap);
        console.log("Username:", username);
        console.log("Email:", email);
        console.log("Nomor Telepon:", nomor_telepon);
        console.log("Nomor Induk:", no_induk);
        console.log("Status:", status);
        console.log("Photo Staf Admin:", photo_stafadmin);

        await ProfileKstaff.updatestaffAdminAsync(id, {
            namalengkap_stafadmin: nama_lengkap,
            username_stafadmin: username,
            email_stafadmin: email,
            nomortelepon_stafadmin: nomor_telepon,
            noinduk_stafadmin: no_induk,
            status_stafadmin: status,
            photo_stafadmin: photo_stafadmin
        });

        res.redirect('/index_Kadmin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const comparePassword = (plainPassword, hashedPassword) => {
    return bcrypt.compare(plainPassword, hashedPassword);
};

const updatePassword = async (req, res) => {
    try {
        const id = req.params.id;
        const { passwordLama, passwordBaru, konfirmasiPassword } = req.body;

        const akunStafAdmin = await ProfileKstaff.getstaffAdminByIdAsync(id);

        if (!akunStafAdmin) {
            return res.status(404).send('User not found');
        }

        console.log('Stored Hash:', akunStafAdmin.password_stafadmin);
        console.log('Entered Old Password:', passwordLama);

        const match = await comparePassword(passwordLama, akunStafAdmin.password_stafadmin);
        if (!match) {
            return res.status(400).send('Password lama salah');
        }

        if (passwordBaru !== konfirmasiPassword) {
            return res.status(400).send('Konfirmasi password tidak cocok dengan password baru');
        }

        const hashedPassword = await bcrypt.hash(passwordBaru, 10);
        await ProfileKstaff.updatestaffPasswordAsync(id, hashedPassword);

        res.redirect('/index_Kadmin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
const deletestaffAdmin = async (req, res) => {
    try {
        const id = req.params.id;
        await ProfileKstaff.deletestaffAdminAsync(id);
        res.status(200).json({ message: 'Staff admin deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



        



module.exports = {
    tambahAkunStafAdmin,
    renderIndexKadmin,
    renderDetailStafAdmin,
    renderEditDetailAkun,
    updateDetailAkun,
    renderpasswordAkun,
    updatePassword,
    deletestaffAdmin
};
