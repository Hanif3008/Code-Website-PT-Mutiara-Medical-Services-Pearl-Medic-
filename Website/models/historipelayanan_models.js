// historipelayanan_models.js
const db = require('./db');

const MedicalHistory = {
    getDataByIdPerusahaan: function(id_perusahaan, callback) {
        const query = 'SELECT * FROM tb_medical WHERE id_perusahaan = ? ORDER BY id_medical DESC';
        db.query(query, [id_perusahaan], (err, results) => {
            if (err) {
                return callback(err);
            }
            results.forEach(medical => {
                switch (medical.status) {
                    case 1:
                        medical.status_text = 'Sudah Dilayani';
                        break;
                    case 2:
                        medical.status_text = 'Dalam Proses';
                        break;
                    case 3:
                        medical.status_text = 'Belum Dilayani';
                        break;
                    default:
                        medical.status_text = 'Unknown';
                        break;
                }
            });
            return callback(null, results);
        });
    },
    getMedicalDetailById: function(id_medical, callback) {
        const query = 'SELECT * FROM tb_medical WHERE id_medical = ?';
        db.query(query, [id_medical], (err, results) => {
            if (err) {
                return callback(err);
            }
            if (results.length === 0) {
                return callback(null, null);
            }
            const medical = results[0];
            switch (medical.status) {
                case 1:
                    medical.status_text = 'Sudah Dilayani';
                    break;
                case 2:
                    medical.status_text = 'Dalam Proses';
                    break;
                case 3:
                    medical.status_text = 'Belum Dilayani';
                    break;
                default:
                    medical.status_text = 'Unknown';
                    break;
            }
            return callback(null, medical);
        });
    }
};

const VaksinHistory = {
    getDataByIdPerusahaanvaksin: function(id_perusahaan, callback) {
        const query = 'SELECT * FROM tb_vaksinasi WHERE id_perusahaan = ? ORDER BY id_vaksinasi DESC';
        db.query(query, [id_perusahaan], (err, results) => {
            if (err) {
                return callback(err);
            }
            results.forEach(vaksin => {
                switch (vaksin.status) {
                    case 1:
                        vaksin.status_text = 'Sudah Dilayani';
                        break;
                    case 2:
                        vaksin.status_text = 'Dalam Proses';
                        break;
                    case 3:
                        vaksin.status_text = 'Belum Dilayani';
                        break;
                    default:
                        vaksin.status_text = 'Unknown';
                        break;
                }
            });
            return callback(null, results);
        });
    },
    getVaksinDetailById: function(id_vaksinasi, callback) {
        const query = 'SELECT * FROM tb_vaksinasi WHERE id_vaksinasi = ?';
        db.query(query, [id_vaksinasi], (err, results) => {
            if (err) {
                return callback(err);
            }
            if (results.length === 0) {
                return callback(null, null);
            }
            const vaksin = results[0];
            switch (vaksin.status) {
                case 1:
                    vaksin.status_text = 'Sudah Dilayani';
                    break;
                case 2:
                    vaksin.status_text = 'Dalam Proses';
                    break;
                case 3:
                    vaksin.status_text = 'Belum Dilayani';
                    break;
                default:
                    vaksin.status_text = 'Unknown';
                    break;
            }
            return callback(null, vaksin);
        });
    },
};


const DaruratHistory = {
    getDataByIdPerusahaanDarurat: function(id_perusahaan, callback) {
        const query = 'SELECT * FROM tb_darurat WHERE id_perusahaan = ? ORDER BY id_darurat DESC';
        db.query(query, [id_perusahaan], (err, results) => {
            if (err) {
                return callback(err);
            }
            results.forEach(darurat => {
                switch (darurat.status) {
                    case 1:
                        darurat.status_text = 'Sudah Dilayani';
                        break;
                    case 2:
                        darurat.status_text = 'Dalam Proses';
                        break;
                    case 3:
                        darurat.status_text = 'Belum Dilayani';
                        break;
                    default:
                        darurat.status_text = 'Unknown';
                        break;
                }
            });
            return callback(null, results);
        });
    },
    getDaruratDetailById: function(id_darurat, callback) {
        const query = 'SELECT * FROM tb_darurat WHERE id_darurat = ?';
        db.query(query, [id_darurat], (err, results) => {
            if (err) {
                return callback(err);
            }
            if (results.length === 0) {
                return callback(null, null);
            }
            const darurat = results[0];
            switch (darurat.status) {
                case 1:
                    darurat.status_text = 'Sudah Dilayani';
                    break;
                case 2:
                    darurat.status_text = 'Dalam Proses';
                    break;
                case 3:
                    darurat.status_text = 'Belum Dilayani';
                    break;
                default:
                    darurat.status_text = 'Unknown';
                    break;
            }
            return callback(null, darurat);
        });
    }
};


module.exports = {
    MedicalHistory,
    VaksinHistory,
    DaruratHistory
};
