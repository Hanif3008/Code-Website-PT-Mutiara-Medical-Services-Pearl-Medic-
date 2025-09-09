const db = require('./db');

const Dokter = {
    getByUsernameAndPassword: function(username, callback) {
        const query = 'SELECT * FROM tb_stafkesehatan WHERE username_stafkesehatan = ? AND role_user = "Staff Kesehatan"';
        db.query(query, [username], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, results);
        });
    }
};

module.exports = Dokter;
