const db = require('./db');

const getProjectsByCompanyId = (companyId, callback) => {
    const query = 'SELECT * FROM tb_proyek WHERE id_perusahaan = ?';
    db.query(query, [companyId], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, results);
    });
};

const getProjectById = (projectId, callback) => {
    const query = 'SELECT * FROM tb_proyek WHERE id_proyek = ?';
    db.query(query, [projectId], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, result[0]);
    });
};

const simpanProyekSementara = (data, callback) => {
    const query = 'INSERT INTO tb_proyek_request (id_perusahaan, nama_proyek, jumlah_proyek, nomortelepon_proyek, lokasi_proyek, deskripsi_proyek) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [
        data.id_perusahaan,
        data.nama_proyek,
        data.jumlah_proyek,
        data.nomortelepon_proyek,
        data.lokasi_proyek,
        data.deskripsi_proyek
    ];
    db.query(query, values, (err) => {
        if (err) {
            return callback(err);
        }
        callback(null);
    });
};

const getStafKesehatanById = (stafKesehatanId, callback) => {
    const query = 'SELECT * FROM tb_stafkesehatan WHERE id_stafkesehatan = ?';
    db.query(query, [stafKesehatanId], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, result[0]);
    });
};


module.exports = {
    getProjectsByCompanyId,
    getProjectById,
    simpanProyekSementara,
    getStafKesehatanById
};
