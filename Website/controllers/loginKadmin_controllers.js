const KepalaAdmin = require('../models/loginKAdmin_models');
const bcrypt = require('bcrypt');

const KepalaAdminController = {
    login: function(req, res) {
        const { username, password } = req.body;

        KepalaAdmin.getByUsername(username, (err, results) => {
            if (err) {
                console.error('Error saat melakukan query:', err);
                return res.status(500).send('Internal Server Error');
            }
            if (results.length > 0) {
                // Ambil hash password dari hasil query
                const hashedPassword = results[0].password_kstafadmin;

                // Bandingkan password yang dimasukkan dengan hash password
                bcrypt.compare(password, hashedPassword, (err, isMatch) => {
                    if (err) {
                        console.error('Error saat membandingkan password:', err);
                        return res.status(500).send('Internal Server Error');
                    }
                    if (isMatch) {
                        // Jika password cocok
                        req.session.user = {
                            id_kstafadmin: results[0].id_kstafadmin,
                            username: results[0].username_kstafadmin,
                            role: 'Kepala Staf Administrasi'
                        };
                        res.redirect('/index_Kadmin');
                    } else {
                        // Jika password tidak cocok
                        res.render('Kadmin/login_KepalaAdmin', {
                            title: 'Login',
                            subtitle: 'Akun',
                            layout: 'layouts/main-layout-login',
                            error: 'Username atau password salah'
                        });
                    }
                });
            } else {
                // Jika username tidak ditemukan
                res.render('Kadmin/login_KepalaAdmin', {
                    title: 'Login',
                    subtitle: 'Akun',
                    layout: 'layouts/main-layout-login',
                    error: 'Username atau password salah'
                });
            }
        });
    },
    logout: function(req, res) {
        req.session.destroy(err => {
            if (err) {
                console.error('Error saat logout:', err);
                return res.status(500).send('Internal Server Error');
            }
            res.redirect('/login_KepalaAdmin');
        });
    }
};

module.exports = KepalaAdminController;
