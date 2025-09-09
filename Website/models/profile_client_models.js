const db = require('./db');
const util = require('util');

const getCompanyProfile = (userId, callback) => {
    const query = 'SELECT * FROM tb_perusahaan WHERE id_perusahaan = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, results[0]);
    });
};
const updateCompanyProfile = (userId, data, callback) => {
    const query = `
        UPDATE tb_perusahaan 
        SET nama_perusahaan = ?, bidang_perusahaan = ?, email_perusahaan = ?, nomortelepon_perusahaan = ?, alamat_perusahaan = ?, photo_perusahaan = ?
        WHERE id_perusahaan = ?
    `;
    const values = [
        data.nama_perusahaan,
        data.bidang_perusahaan,
        data.email_perusahaan,
        data.nomortelepon_perusahaan,
        data.alamat_perusahaan,
        data.photo_perusahaan,
        userId
    ];
    db.query(query, values, (err) => {
        if (err) {
            return callback(err);
        }
        callback(null);
    });
};

const updatePassword = (userId, hashedPassword, callback) => {
    const query = 'UPDATE tb_perusahaan SET password_perusahaan = ? WHERE id_perusahaan = ?';
    db.query(query, [hashedPassword, userId], (err) => {
        if (err) {
            return callback(err);
        }
        callback(null);
    });
};

const getProjectsByCompanyId = (companyId, callback) => {
    const query = 'SELECT * FROM tb_proyek WHERE id_perusahaan = ?';
    db.query(query, [companyId], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, results);
    });
};

// Membuat fungsi asinkron menggunakan util.promisify
const getCompanyProfileAsync = util.promisify(getCompanyProfile);
const updatePasswordAsync = util.promisify(updatePassword);

module.exports = {
    getCompanyProfile,
    updateCompanyProfile,
    updatePassword,
    getCompanyProfileAsync,
    updatePasswordAsync,
    getProjectsByCompanyId
};
