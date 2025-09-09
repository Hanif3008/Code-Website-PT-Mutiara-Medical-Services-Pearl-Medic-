const db = require('./db');

const ProfileStaffAdmin = {
    getStaffAdminById: (id, callback) => {
        const query = 'SELECT * FROM tb_stafadmin WHERE id_stafadmin = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result[0]);
        });
    }
};


module.exports = ProfileStaffAdmin;