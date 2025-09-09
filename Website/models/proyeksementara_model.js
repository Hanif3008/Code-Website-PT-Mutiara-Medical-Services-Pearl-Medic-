const db = require('./db');

const getTempProjectsByCompanyId = (companyId, callback) => {
    const query = 'SELECT * FROM tb_proyek_request WHERE id_perusahaan = ?';
    db.query(query, [companyId], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, results);
    });
};

const deleteTempProjectById = (projectId, callback) => {
    const query = 'DELETE FROM tb_proyek_request WHERE id_proyek_request = ?';
    db.query(query, [projectId], (err) => {
        if (err) {
            return callback(err);
        }
        callback(null);
    });
};

module.exports = { 
    getTempProjectsByCompanyId,
    deleteTempProjectById
};
