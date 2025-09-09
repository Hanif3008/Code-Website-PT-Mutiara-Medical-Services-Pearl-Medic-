const Dokter = require('../models/logindokter_models');
const bcrypt = require('bcrypt');

const DokterController = {
    login: function(req, res) {
        const { username, password } = req.body;

        Dokter.getByUsernameAndPassword(username, (err, results) => {
            if (err) {
                console.error('Error saat melakukan query:', err);
                return res.status(500).send('Internal Server Error');
            }
            if (results.length > 0) {
                const hashedPassword = results[0].password_stafkesehatan;

                bcrypt.compare(password, hashedPassword, (err, isMatch) => {
                    if (err) {
                        console.error('Error saat membandingkan password:', err);
                        return res.status(500).send('Internal Server Error');
                    }
                    if (isMatch) {
                        req.session.user = {
                            id_stafkesehatan: results[0].id_stafkesehatan,
                            username: results[0].username_stafkesehatan,
                            role: 'Staf Kesehatan'
                        }
                        res.redirect('/index_dokter');
                    } else {
                        res.render('dokter/login_dokter', {
                            title: 'Login',
                            subtitle: 'Akun',
                            layout: 'layouts/main-layout-login',
                            error: 'Username atau password salah'
                        });
                    }
                });
            } else {
                res.render('dokter/login_dokter', {
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
                res.redirect('/login_dokter');
            });
        }
};



module.exports = DokterController;
