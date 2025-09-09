// models/LayananMedical_model.js
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

const saveMedicalRequest = (medicalRequest, callback) => {
    const query = `
        INSERT INTO tb_medical 
        (id_proyek, id_perusahaan, jenis_pelayanan, nomorpesanan, jumlahpasien_medical, 
        tanggalpemesanan_medical, tanggalpermintaan_medical, tanggalpelayanan_medical, 
        jampermintaan_medical, jampelayanan_medical, lokasipelayanan_medical, status, catatan_medical)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        medicalRequest.id_proyek,
        medicalRequest.id_perusahaan,
        medicalRequest.jenis_pelayanan,
        medicalRequest.nomorpesanan,
        medicalRequest.jumlahpasien_medical,
        medicalRequest.tanggalpemesanan_medical,
        medicalRequest.tanggalpermintaan_medical,
        medicalRequest.tanggalpelayanan_medical,
        medicalRequest.jampermintaan_medical,
        medicalRequest.jampelayanan_medical,
        medicalRequest.lokasipelayanan_medical,
        medicalRequest.status,
        medicalRequest.catatan_medical
    ];

    db.query(query, values, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};


const getLatestMedicalOrder = (callback) => {
    const query = `SELECT nomorpesanan FROM tb_medical ORDER BY id_medical DESC LIMIT 1`;
    db.query(query, (err, result) => {
        if (err) {
            return callback(err, null); // Kirim error ke callback
        }
        callback(null, result[0]); // Kirim data pesanan terakhir ke callback
    });
};



module.exports = {
    getProjectsByCompanyId,
    getActiveHospitals,
    saveMedicalRequest,
    getLatestMedicalOrder
};