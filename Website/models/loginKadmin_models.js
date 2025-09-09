const db = require('./db');
const bcrypt = require('bcrypt');

const KepalaAdmin = {
    getByUsername: function(username, callback) {
        const query = 'SELECT * FROM tb_kepalastafadmin WHERE username_kstafadmin = ? AND role_user = "Kepala Staf Administrasi"';
        db.query(query, [username], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, results);
        });
    }
};

module.exports = KepalaAdmin;
