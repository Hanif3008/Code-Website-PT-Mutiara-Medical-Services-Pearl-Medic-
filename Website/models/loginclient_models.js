const db = require('./db');

const Perusahaan = {
    getByUsername: function(username, callback) {
        const query = 'SELECT * FROM tb_perusahaan WHERE username_perusahaan = ? AND role_user = "Client"';
        db.query(query, [username], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, results[0]); // Mengambil hanya satu hasil
        });
    }
};

module.exports = Perusahaan;
