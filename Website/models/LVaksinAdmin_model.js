const db = require('./db');

const displayVaksinasiServices = (id_vaksinasi, callback) => {
    if (typeof id_vaksinasi !== 'number') {
        const error = new TypeError('id_vaksinasi should be a number');
        console.error(error);
        callback(error, null);
        return;
    }

    const query = `
        SELECT 
            tb_vaksinasi.id_vaksinasi, 
            tb_vaksinasi.id_proyek, 
            tb_vaksinasi.id_perusahaan, 
            tb_vaksinasi.jenis_pelayanan, 
            tb_vaksinasi.nomorpesanan,
            tb_vaksinasi.jumlahpasien_vaksin, 
            tb_vaksinasi.tanggalpemesanan_vaksin, 
            tb_vaksinasi.tanggalpermintaan_vaksin, 
            tb_vaksinasi.tanggalpelayanan_vaksin, 
            tb_vaksinasi.jampermintaan_vaksin, 
            tb_vaksinasi.jampelayanan_vaksin, 
            tb_vaksinasi.lokasipelayanan_vaksin, 
            tb_vaksinasi.id_vaksin, 
            tb_vaksinasi.status, 
            tb_vaksinasi.catatan_vaksinasi,
            tb_perusahaan.nama_perusahaan, 
            tb_proyek.nama_proyek,
            tb_stokvaksin.nama_vaksin, 
            tb_stokvaksin.deskripsi_vaksin, 
            tb_stokvaksin.stock_vaksin
        FROM tb_vaksinasi
        JOIN tb_perusahaan ON tb_vaksinasi.id_perusahaan = tb_perusahaan.id_perusahaan
        JOIN tb_proyek ON tb_vaksinasi.id_proyek = tb_proyek.id_proyek
        JOIN tb_stokvaksin ON tb_vaksinasi.id_vaksin = tb_stokvaksin.id_vaksin
        WHERE tb_vaksinasi.id_vaksinasi = ?
    `;
    db.query(query, [id_vaksinasi], (err, result) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}
const getAllVaksinasiServices = (callback) => {
    const query = `
        SELECT 
            tb_vaksinasi.id_vaksinasi, 
            tb_vaksinasi.tanggalpemesanan_vaksin, 
            tb_vaksinasi.nomorpesanan,
            tb_vaksinasi.status, 
            tb_perusahaan.nama_perusahaan,
            tb_vaksinasi.jumlahpasien_vaksin
        FROM tb_vaksinasi
        JOIN tb_perusahaan ON tb_vaksinasi.id_perusahaan = tb_perusahaan.id_perusahaan
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
const getAllVaksinasiServicesById = (id_vaksinasi, callback) => {
    const query = `
        SELECT
            tb_vaksinasi.id_vaksinasi,
            tb_vaksinasi.id_proyek,
            tb_vaksinasi.id_perusahaan,
            tb_vaksinasi.id_stafkesehatan,
            tb_vaksinasi.jenis_pelayanan,
            tb_vaksinasi.nomorpesanan,
            tb_vaksinasi.jumlahpasien_vaksin,
            tb_vaksinasi.tanggalpemesanan_vaksin,
            tb_vaksinasi.tanggalpermintaan_vaksin,
            tb_vaksinasi.tanggalpelayanan_vaksin,
            tb_vaksinasi.jampermintaan_vaksin,
            tb_vaksinasi.jampelayanan_vaksin,
            tb_vaksinasi.lokasipelayanan_vaksin,
            tb_vaksinasi.id_vaksin,
            tb_vaksinasi.status,
            tb_vaksinasi.catatan_vaksinasi,
            tb_perusahaan.nama_perusahaan,
            tb_perusahaan.photo_perusahaan,
            tb_proyek.nama_proyek,
            tb_proyek.nomortelepon_proyek,
            tb_stokvaksin.nama_vaksin,
            tb_stokvaksin.deskripsi_vaksin,
            tb_stokvaksin.stock_vaksin,
            tb_stafkesehatan.namalengkap_stafkesehatan,
            tb_stafkesehatan.spesialisasi_stafkesehatan,
            tb_stafkesehatan.nomortelepon_stafkesehatan
        FROM tb_vaksinasi
        JOIN tb_perusahaan ON tb_vaksinasi.id_perusahaan = tb_perusahaan.id_perusahaan
        JOIN tb_proyek ON tb_vaksinasi.id_proyek = tb_proyek.id_proyek
        JOIN tb_stokvaksin ON tb_vaksinasi.id_vaksin = tb_stokvaksin.id_vaksin
        LEFT JOIN tb_stafkesehatan ON tb_vaksinasi.id_stafkesehatan = tb_stafkesehatan.id_stafkesehatan
        WHERE tb_vaksinasi.id_vaksinasi = ?
    `;
    db.query(query, [id_vaksinasi], (err, result) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}
const getAlllDataVaccine = (callback) => {
    // ambil semua data dari tb_stokvaksin
    const query = `
        SELECT * FROM tb_stokvaksin
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
const getAllDataVaccineById = (id_vaksin, callback) => {
    // ambil data vaksin berdasarkan id_vaksin
    const query = `
        SELECT * FROM tb_stokvaksin WHERE id_vaksin = ?
    `;
    db.query(query, [id_vaksin], (err, result) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}
const updateDataVaccine = (id_vaksin, data, callback) => {
    //  update data vaksin yang ada di tb_stokvaksin
    const query = `
        UPDATE tb_stokvaksin
        SET nama_vaksin = ?, deskripsi_vaksin = ?, stock_vaksin = ?
        WHERE id_vaksin = ?
    `;
    db.query(query, [data.nama_vaksin, data.deskripsi_vaksin, data.stock_vaksin, id_vaksin], (err, result) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}
const tambahDataVaksin = (data, callback) => {
    // tambah data vaksin ke tb_stokvaksin
    const query = `
        INSERT INTO tb_stokvaksin (nama_vaksin, deskripsi_vaksin, stock_vaksin)
        VALUES (?, ?, ?)
    `;
    db.query(query, [data.nama_vaksin, data.deskripsi_vaksin, data.stock_vaksin], (err, result) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}
const deleteDataVaksin = (id_vaksin, callback) => {
    // hapus data vaksin dari tb_stokvaksin
    const query = `
        DELETE FROM tb_stokvaksin WHERE id_vaksin = ?
    `;
    db.query(query, [id_vaksin], (err, result) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}
const displayDataDokterVaksinServices = (callback) => {
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
const updateVaccineServices = (id_vaksinasi, id_stafkesehatan, tanggal_pelayanan, jam_pelayanan, jumlah_vaksin, status, callback) => {
    const query1 = `
        UPDATE tb_vaksinasi
        SET
            id_stafkesehatan = ?,
            tanggalpelayanan_vaksin = ?,
            jampelayanan_vaksin = ?,
            jumlahpasien_vaksin = ?,
            status = ?
        WHERE
            id_vaksinasi = ?
    `;

    db.query(query1, [id_stafkesehatan, tanggal_pelayanan, jam_pelayanan, jumlah_vaksin, status, id_vaksinasi], (err, result) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }

        // Get the current stock of the vaccine
        const query2 = `
            SELECT stock_vaksin
            FROM tb_stokvaksin
            WHERE id_vaksin = (SELECT id_vaksin FROM tb_vaksinasi WHERE id_vaksinasi = ?)
        `;
        db.query(query2, [id_vaksinasi], (err, result) => {
            if (err) {
                console.log(err);
                callback(err, null);
                return;
            }
            
            const currentStock = result[0].stock_vaksin;
            const newStock = currentStock - jumlah_vaksin;

            // Update the stock of the vaccine
            const query3 = `
                UPDATE tb_stokvaksin
                SET stock_vaksin = ?
                WHERE id_vaksin = (SELECT id_vaksin FROM tb_vaksinasi WHERE id_vaksinasi = ?)
            `;
            db.query(query3, [newStock, id_vaksinasi], (err, result) => {
                if (err) {
                    console.log(err);
                    callback(err, null);
                    return;
                }
                callback(null, result);
            });
        });
    });
};

const deleteVaccineServices = (id_vaksinasi, callback) => {
    const query = `
        DELETE FROM tb_vaksinasi
        WHERE id_vaksinasi = ?
    `;
    db.query(query, [id_vaksinasi], (err, result) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        callback(null, result);
    });
};
const updateStatusVaccineServices = (id_vaksinasi, status, callback) => {
    const query = `
        UPDATE tb_vaksinasi
        SET status = ?
        WHERE id_vaksinasi = ?
    `;
    db.query(query, [status, id_vaksinasi], (err, result) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        callback(null, result);
    });
};

        


module.exports = {
    displayVaksinasiServices,
    getAllVaksinasiServices,
    getAlllDataVaccine,
    getAllDataVaccineById,
    updateDataVaccine,
    tambahDataVaksin,
    getAllVaksinasiServicesById,
    displayDataDokterVaksinServices,
    updateVaccineServices,
    deleteVaccineServices,
    updateStatusVaccineServices,
    deleteDataVaksin
}
