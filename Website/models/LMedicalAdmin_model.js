const db = require('./db');


const getAllMedicalServices = (callback) => {
    const query = `
        SELECT 
            tb_medical.id_medical,
            tb_medical.tanggalpemesanan_medical,
            tb_medical.status,
            tb_medical.nomorpesanan,
            tb_medical.jumlahpasien_medical,
            tb_perusahaan.nama_perusahaan
        FROM tb_medical
        JOIN tb_perusahaan ON tb_medical.id_perusahaan = tb_perusahaan.id_perusahaan
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        callback(null, results);
    }
    );
}

const getMedicalServicesById = (id_medical, callback) => {
    const query = `
        SELECT
            tb_medical.id_medical,
            tb_medical.id_proyek,
            tb_medical.id_perusahaan,
            tb_medical.id_stafkesehatan,
            tb_medical.jenis_pelayanan,
            tb_medical.jumlahpasien_medical,
            tb_medical.tanggalpemesanan_medical,
            tb_medical.tanggalpermintaan_medical,
            tb_medical.tanggalpelayanan_medical,
            tb_medical.jampermintaan_medical,
            tb_medical.jampelayanan_medical,
            tb_medical.lokasipelayanan_medical,
            tb_medical.status,
            tb_medical.nomorpesanan,
            tb_medical.catatan_medical,
            tb_perusahaan.nama_perusahaan,
            tb_perusahaan.photo_perusahaan,
            tb_proyek.nama_proyek,
            tb_proyek.nomortelepon_proyek,
            tb_stafkesehatan.namalengkap_stafkesehatan,
            tb_stafkesehatan.spesialisasi_stafkesehatan,
            tb_stafkesehatan.nomortelepon_stafkesehatan
        FROM tb_medical
        JOIN tb_perusahaan ON tb_medical.id_perusahaan = tb_perusahaan.id_perusahaan
        JOIN tb_proyek ON tb_medical.id_proyek = tb_proyek.id_proyek
        LEFT JOIN tb_stafkesehatan ON tb_medical.id_stafkesehatan = tb_stafkesehatan.id_stafkesehatan
        WHERE tb_medical.id_medical = ?
    `;
    db.query(query, [id_medical], (err, results) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        callback(null, results[0]);
    }
    );
}

const displayDataDokter = (callback) => {
    const query = `
        SELECT * FROM tb_stafkesehatan
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        callback(null, results);
    });
}

const updateMedicalServices = (id_medical, id_stafkesehatan, tanggal_pelayanan, jam_pelayanan, status, callback) => {
    const query = `
        UPDATE tb_medical
        SET
            id_stafkesehatan = ?,
            tanggalpelayanan_medical = ?,
            jampelayanan_medical = ?,
            status = ?
        WHERE id_medical = ?
    `;
    db.query(query, [id_stafkesehatan, tanggal_pelayanan, jam_pelayanan, status, id_medical], (err, results) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        callback(null, results);
    });
}


const updateStatusMedicalServices = (id_medical, status, callback) => {
    const query = `
        UPDATE tb_medical
        SET status = ?
        WHERE id_medical = ?
    `;
    db.query(query, [status, id_medical], (err, result) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        callback(null, result);
    });
};



const deleteMedicalServices = (id_medical, callback) => {
    const query = `
        DELETE FROM tb_medical
        WHERE id_medical = ?
    `;
    db.query(query, [id_medical], (err, result) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        callback(null, result);
    });
};

module.exports = {
    getAllMedicalServices,
    getMedicalServicesById,
    displayDataDokter,
    updateMedicalServices,
    updateStatusMedicalServices,
    deleteMedicalServices
}
