const db = require('./db');

// get data dokter

const getDataDokter = (callback) => {
    const query = 'SELECT * FROM tb_stafkesehatan'
    db.query(query, (err, result) => {
        if (err) {
            return callback(err)
        }
        return callback(null, result)
    }
    )
}

const getDataDokterById = (id_stafkesehatan, callback) => {
    const query = 'SELECT * FROM tb_stafkesehatan WHERE id_stafkesehatan = ?'
    db.query(query, [id_stafkesehatan], (err, result) => {
        if (err) {
            return callback(err)
        }
        if (result.length === 0) {
            return callback(null, null)
        }
        return callback(null, result[0])
    }
    )
}
const addDataDokter = (data, callback) => {
    const query = 'INSERT INTO tb_stafkesehatan (namalengkap_stafkesehatan, username_stafkesehatan, password_stafkesehatan, spesialisasi_stafkesehatan, noinduk_stafkesehatan, email_stafkesehatan, nomortelepon_stafkesehatan,jeniskelamin_stafkesehatan, photo_stafkesehatan, status, role_user ) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
    db.query(query, [data.namalengkap_stafkesehatan, data.username_stafkesehatan, data.password_stafkesehatan, data.spesialisasi_stafkesehatan, data.noinduk_stafkesehatan, data.email_stafkesehatan, data.nomortelepon_stafkesehatan,data.jeniskelamin_stafkesehatan, data.photo_stafkesehatan, data.status, data.role_user], (err, result) => {
        if (err) {
            return callback(err)
        }
        return callback(null, result)
    }
    )
}
const searchDataDokterByName = (searchQuery, callback) => {
    const query = "SELECT * FROM tb_stafkesehatan WHERE namalengkap_stafkesehatan LIKE ?";
    db.query(query, ['%' + searchQuery + '%'], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
}
const updateDataDokterById = (id_stafkesehatan, data, callback) => {
    const query = 'UPDATE tb_stafkesehatan SET namalengkap_stafkesehatan = ?, username_stafkesehatan = ?, spesialisasi_stafkesehatan = ?, noinduk_stafkesehatan = ?, email_stafkesehatan = ?, nomortelepon_stafkesehatan = ?, jeniskelamin_stafkesehatan = ?, photo_stafkesehatan = ?, status = ? WHERE id_stafkesehatan = ?';
    db.query(query, [data.namalengkap_stafkesehatan, data.username_stafkesehatan, data.spesialisasi_stafkesehatan, data.noinduk_stafkesehatan, data.email_stafkesehatan, data.nomortelepon_stafkesehatan, data.jeniskelamin_stafkesehatan, data.photo_stafkesehatan, data.status, id_stafkesehatan], (err, result) => {
        if (err) {
            return callback(err)
        }
        return callback(null, result)
    }
    )
}
const deleteDataDokterById = (id_stafkesehatan, callback) => {
    const query = 'DELETE FROM tb_stafkesehatan WHERE id_stafkesehatan = ?';
    db.query(query, [id_stafkesehatan], (err, result) => {
        if (err) {
            return callback(err)
        }
        return callback(null, result)
    }
    )   
}

const updatepassDokterById = (id_stafkesehatan, data, callback) => {
    const query = 'UPDATE tb_stafkesehatan SET password_stafkesehatan = ? WHERE id_stafkesehatan = ?';
    db.query(query, [data.password_stafkesehatan, id_stafkesehatan], (err, result) => {
        if (err) {
            return callback(err)
        }
        return callback(null, result)
    }
    )
}

module.exports = {
    getDataDokter,
    getDataDokterById,
    addDataDokter,
    searchDataDokterByName,
    updateDataDokterById,
    deleteDataDokterById,
    updatepassDokterById
}