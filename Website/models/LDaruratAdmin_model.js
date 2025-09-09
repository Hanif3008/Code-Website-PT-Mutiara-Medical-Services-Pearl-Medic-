const db = require('./db');

const displayAllDaruratServices = (callback) => {
    const query = `
        SELECT
            tb_darurat.id_darurat,
            tb_darurat.id_proyek,
            tb_darurat.id_perusahaan,
            tb_darurat.jenis_pelayanan,
            tb_darurat.nomorpesanan,
            tb_darurat.rsrujukan_darurat,
            tb_darurat.jumlahpasien_darurat,
            tb_darurat.tglpemesanan_darurat,
            tb_darurat.status,
            tb_darurat.catatan_darurat,
            tb_proyek.nama_proyek,
            tb_perusahaan.nama_perusahaan
        FROM tb_darurat
        JOIN tb_proyek ON tb_darurat.id_proyek = tb_proyek.id_proyek
        JOIN tb_perusahaan ON tb_darurat.id_perusahaan = tb_perusahaan.id_perusahaan
    `;
    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            callback(err, null);
            return;
        }
        callback(null, result);
    }
    );
}
const displayDaruratServices = (id_darurat, callback) => {
    // tb_darurat, tb_proyek, dan tb_perusahaan

    const query = `
        SELECT
            tb_darurat.id_darurat,
            tb_darurat.id_proyek,
            tb_darurat.id_perusahaan,
            tb_darurat.jenis_pelayanan,
            tb_darurat.nomorpesanan,
            tb_darurat.rsrujukan_darurat,
            tb_darurat.jumlahpasien_darurat,
            tb_darurat.tglpemesanan_darurat,
            tb_darurat.status,
            tb_darurat.catatan_darurat,
            tb_proyek.nama_proyek,
            tb_proyek.nomortelepon_proyek,
            tb_perusahaan.nama_perusahaan,
            tb_perusahaan.photo_perusahaan
        FROM tb_darurat
        JOIN tb_proyek ON tb_darurat.id_proyek = tb_proyek.id_proyek
        JOIN tb_perusahaan ON tb_darurat.id_perusahaan = tb_perusahaan.id_perusahaan
        WHERE tb_darurat.id_darurat = ?
    `;
    db.query(query, [id_darurat], (err, result) => {
        if (err) {
            console.error(err);
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

const displayDaruratServicesById = (id_darurat, callback) => {
    const query = `
        SELECT
            tb_darurat.id_darurat,
            tb_darurat.id_proyek,
            tb_darurat.id_perusahaan,
            tb_darurat.id_stafkesehatan,
            tb_darurat.jenis_pelayanan,
            tb_darurat.nomorpesanan,
            tb_darurat.rsrujukan_darurat,
            tb_darurat.jumlahpasien_darurat,
            tb_darurat.tglpemesanan_darurat,
            tb_darurat.status,
            tb_darurat.catatan_darurat,
            tb_proyek.nama_proyek,
            tb_proyek.nomortelepon_proyek,
            tb_perusahaan.nama_perusahaan,
            tb_perusahaan.photo_perusahaan,
            tb_stafkesehatan.namalengkap_stafkesehatan,
            tb_stafkesehatan.nomortelepon_stafkesehatan,
            tb_stafkesehatan.spesialisasi_stafkesehatan
        FROM tb_darurat
        JOIN tb_proyek ON tb_darurat.id_proyek = tb_proyek.id_proyek
        JOIN tb_perusahaan ON tb_darurat.id_perusahaan = tb_perusahaan.id_perusahaan
        LEFT JOIN tb_stafkesehatan ON tb_darurat.id_stafkesehatan = tb_stafkesehatan.id_stafkesehatan
        WHERE tb_darurat.id_darurat = ?
    `;
    db.query(query, [id_darurat], (err, result) => {
        if (err) {
            console.error(err);
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

const displayDataDokterDaruratServices = (callback) => {
    const query = `
        SELECT * FROM tb_stafkesehatan
    `;
    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            callback(err, null);
            return;
        }
        callback(null, result);
    }
    );
}

const UpdateDaruratServices = (id_darurat, id_stafkesehatan, status, callback) => {
    const query = `
        UPDATE tb_darurat
        SET 
            id_stafkesehatan = ?,
            status = ?
        WHERE id_darurat = ?
    `;
    db.query(query, [id_stafkesehatan, status, id_darurat], (err, result) => {
        if (err) {
            console.error(err);
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

const updateStatusDaruratServices = (id_darurat, status, callback) => {
    const query = `
        UPDATE tb_darurat
        SET
            status = ?
        WHERE id_darurat = ?
    `;
    db.query(query, [status, id_darurat], (err, result) => {
        if (err) {
            console.error(err); 
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

const deleteDaruratServices = (id_darurat, callback) => {
    const query = `
        DELETE FROM tb_darurat
        WHERE id_darurat = ?
    `;  
    db.query(query, [id_darurat], (err, result) => {
        if (err) {
            console.error(err);
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}




module.exports = {
    displayDaruratServices,
    displayAllDaruratServices,
    displayDaruratServicesById,
    displayDataDokterDaruratServices,
    UpdateDaruratServices, 
    updateStatusDaruratServices,
    deleteDaruratServices
}