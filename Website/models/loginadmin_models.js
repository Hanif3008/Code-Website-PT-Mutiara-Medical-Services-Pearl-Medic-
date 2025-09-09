const db = require('./db');

const StafAdmin = {
    getByUsername: function(username, callback) {
        const query = 'SELECT * FROM tb_stafadmin WHERE username_stafadmin = ? AND role_user = "Staff Administrasi"';
        db.query(query, [username], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, results);
        });
    }
};

module.exports = StafAdmin;
