const db = require('./db');

// get data from tb_rumahsakit
const RSadmin = {
    getDataRs: function(callback) {
        const query = 'SELECT * FROM tb_rumahsakit';
        db.query(query, (err, result) => {
            if (err) {
                return callback(err);
            }
            return callback(null, result);
        });
    },
    getDataRsById: function(id_rs, callback) {
        const query = 'SELECT * FROM tb_rumahsakit WHERE id_rs = ?';
        db.query(query, [id_rs], (err, result) => {
            if (err) {
                return callback(err);
            }
            if (result.length === 0) {
                return callback(null, null); // No record found
            }
            return callback(null, result[0]);
        });
    },
    updateDataRsById: function(id_rs, data, callback) {
        const query = 'UPDATE tb_rumahsakit SET nama_rs = ?, email_rs = ?, nomortelepon_rs = ?, status_rs = ?, alamat_rs = ?, photo_rs = ? WHERE id_rs = ?';
        db.query(query, [data.nama_rs, data.email_rs, data.nomortelepon_rs, data.status_rs, data.alamat_rs, data.photo_rs, id_rs], (err, result) => {
            if (err) {
                return callback(err);
            }
            return callback(null, result);
        });
    },
    searchDataRsByName: function(name, callback) {
        const query = 'SELECT * FROM tb_rumahsakit WHERE nama_rs LIKE ?';
        db.query(query, [`%${name}%`], (err, result) => {
            if (err) {
                return callback(err);
            }
            return callback(null, result);
        });
    },
    addDataRs: function(data, callback) {
        const query = 'INSERT INTO tb_rumahsakit (nama_rs, email_rs, nomortelepon_rs, status_rs, alamat_rs, photo_rs) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(query, [data.nama_rs, data.email_rs, data.nomortelepon_rs, data.status_rs, data.alamat_rs, data.photo_rs], (err, result) => {
            if (err) {
                return callback(err);
            }
            return callback(null, result);
        });
    },
    deleteDataRsById: function(id_rs, callback) {
        const query = 'DELETE FROM tb_rumahsakit WHERE id_rs = ?';
        db.query(query, [id_rs], (err, result) => {
            if (err) {
                return callback(err);
            }
            return callback(null, result);
        });
    }
};

module.exports = RSadmin;
