const StafAdmin = require('../models/loginadmin_models');
const bcrypt = require('bcrypt');

const StafAdminController = {
    login: function(req, res) {
        const { username, password } = req.body;

        StafAdmin.getByUsername(username, async (err, results) => {
            if (err) {
                console.error('Error saat melakukan query:', err);
                return res.status(500).send('Internal Server Error');
            }
            if (results.length > 0) {
                const user = results[0];
                const isPasswordValid = await bcrypt.compare(password, user.password_stafadmin);
                if (!isPasswordValid) {
                    return res.render('admin/login_admin', {
                        title: 'Login',
                        subtitle: 'Akun',
                        layout: 'layouts/main-layout-login',
                        error: 'Username atau password salah'
                    });
                }
                if (user.status_stafadmin !== 1) {
                    return res.render('admin/login_admin', {
                        title: 'Login',
                        subtitle: 'Akun',
                        layout: 'layouts/main-layout-login',
                        error: 'Akun tidak aktif, harap hubungi kepala administrasi'
                    });
                }
                req.session.user = {
                    id_stafadmin: user.id_stafadmin,
                    username: user.username_stafadmin,
                    role: 'Staff Administrasi'
                };
                return res.redirect('/index_admin');
            } else {
                res.render('admin/login_admin', {
                    title: 'Login',
                    subtitle: 'Akun',
                    layout: 'layouts/main-layout-login',
                    error: 'Username atau password salah'
                });
            }
        });
    },
    logout: function(req, res) {
        // Hapus session pengguna saat logout
        req.session.destroy(err => {
            if (err) {
                console.error('Error saat logout:', err);
                return res.status(500).send('Internal Server Error');
            }
            // Redirect ke halaman login setelah logout
            res.redirect('/login_admin');
        });
    }
};

module.exports = StafAdminController;
