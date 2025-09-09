const db = require('./db');

const getCompanyById = (companyId, callback) => {
    const query = 'SELECT * FROM tb_perusahaan WHERE id_perusahaan = ?';
    db.query(query, [companyId], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, results[0]);
    });
};

module.exports = {
    getCompanyById
};
