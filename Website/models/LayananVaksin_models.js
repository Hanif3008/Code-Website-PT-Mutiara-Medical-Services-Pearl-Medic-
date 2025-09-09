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


const getActiveHospitals = (callback) => {
    const query = 'SELECT * FROM tb_rumahsakit WHERE status_rs = 1';
    db.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, results);
    });
};

const getVaccineServices = (callback) => {
    const query = 'SELECT * FROM tb_stokvaksin';
    db.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, results);
    });
};

const saveVaccineRequest = (vaccineRequest, callback) => {
    const query = `
        INSERT INTO tb_vaksinasi 
        (id_proyek, id_perusahaan, jenis_pelayanan, nomorpesanan, jumlahpasien_vaksin, 
        tanggalpemesanan_vaksin, tanggalpermintaan_vaksin, tanggalpelayanan_vaksin, 
        jampermintaan_vaksin, jampelayanan_vaksin, lokasipelayanan_vaksin, id_vaksin, status, catatan_vaksinasi)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        vaccineRequest.id_proyek,
        vaccineRequest.id_perusahaan,
        vaccineRequest.jenis_pelayanan,
        vaccineRequest.nomorpesanan,
        vaccineRequest.jumlahpasien_vaksin,
        vaccineRequest.tanggalpemesanan_vaksin,
        vaccineRequest.tanggalpermintaan_vaksin,
        vaccineRequest.tanggalpelayanan_vaksin, 
        vaccineRequest.jampermintaan_vaksin,
        vaccineRequest.jampelayanan_vaksin,
        vaccineRequest.lokasipelayanan_vaksin,
        vaccineRequest.id_vaksin,
        vaccineRequest.status,
        vaccineRequest.catatan_vaksinasi
    ];
    db.query(query, values, callback);
};


const getLatestVaksinOrder = (callback) => {
    const query = `SELECT nomorpesanan FROM tb_vaksinasi ORDER BY id_vaksinasi DESC LIMIT 1`;
    db.query(query, (err,result) => {
        if(err) {
            return callback(err,null);
        }
        callback(null, result[0])
    })
}


module.exports = {
    getProjectsByCompanyId,
    getActiveHospitals,
    getVaccineServices,
    saveVaccineRequest,
    getLatestVaksinOrder
};