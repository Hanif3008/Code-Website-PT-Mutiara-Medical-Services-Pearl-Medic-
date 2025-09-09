const bcrypt = require('bcrypt');
const Perusahaan = require('../models/loginclient_models');

const login = (req, res) => {
    const { username, password } = req.body;

    Perusahaan.getByUsername(username, async (err, user) => {
        if (err) {
            console.error('Error saat melakukan query:', err);
            return res.status(500).send('Internal Server Error');
        }
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password_perusahaan);
            if (passwordMatch) {
                if (user.status_perusahaan === 0) {
                    // Jika status perusahaan nonaktif, tolak login
                    return res.render('client/login_client', {
                        title: 'Login',
                        subtitle: 'Akun',
                        layout: 'layouts/main-layout-login',
                        error: 'Akun Anda tidak aktif. Silakan hubungi administrator.'
                    });
                }
                // Jika status perusahaan aktif, set session user dan redirect ke halaman utama
                req.session.user = {
                    username: user.username_perusahaan,
                    id_perusahaan: user.id_perusahaan,
                    role: 'Client'
                };
                return res.redirect('/');
            } else {
                // Jika password tidak cocok
                return res.render('client/login_client', {
                    title: 'Login',
                    subtitle: 'Akun',
                    layout: 'layouts/main-layout-login',
                    error: 'Username atau password salah'
                });
            }
        } else {
            // Jika user tidak ditemukan
            return res.render('client/login_client', {
                title: 'Login',
                subtitle: 'Akun',
                layout: 'layouts/main-layout-login',
                error: 'Username atau password salah'
            });
        }
    });
};

const logout = (req, res) => {
    // Hapus session pengguna saat logout
    req.session.destroy(err => {
        if (err) {
            console.error('Error saat logout:', err);
            return res.status(500).send('Internal Server Error');
        }
        // Redirect ke halaman login setelah logout
        res.redirect('/login_client');
    });
};

module.exports = {
    login,
    logout
};
