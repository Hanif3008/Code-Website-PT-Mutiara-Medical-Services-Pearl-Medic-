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

const saveEmergencyService = (emergencyService, callback) => {  
    const query = `
    INSERT INTO tb_darurat
    (id_proyek, id_perusahaan, jenis_pelayanan,nomorpesanan, rsrujukan_darurat, jumlahpasien_darurat, tglpemesanan_darurat, status, catatan_darurat)
    VALUES (?,?,?,?,?,?,?,?,?)
    `;
    const values = [
        emergencyService.id_proyek,
        emergencyService.id_perusahaan,
        emergencyService.jenis_pelayanan,
        emergencyService.nomorpesanan,
        emergencyService.rsrujukan_darurat,
        emergencyService.jumlahpasien_darurat,
        emergencyService.tglpemesanan_darurat,
        emergencyService.status,
        emergencyService.catatan_darurat
    ];
    db.query(query, values, (err) => {
        if (err) {
            return callback(err);
        }
        callback(null);
    });
};

const getLatestDaruratOrder = (callback) => {
    const query = `SELECT nomorpesanan FROM tb_darurat ORDER BY id_darurat DESC LIMIT 1`;
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
    saveEmergencyService,
    getLatestDaruratOrder
};