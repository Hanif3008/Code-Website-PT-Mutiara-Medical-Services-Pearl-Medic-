const db = require('./db');

const LVaksinDokter = {
    getAllLayananVaksinByStaffId: (staffId, callback) => {
        const query = `
            SELECT 
                v.id_vaksinasi AS id, p.nama_perusahaan, v.jenis_pelayanan, v.nomorpesanan, v.jumlahpasien_vaksin, v.tanggalpemesanan_vaksin, v.tanggalpelayanan_vaksin, v.status, 'vaksin' AS type
            FROM
                tb_vaksinasi v
            JOIN
                tb_perusahaan p ON v.id_perusahaan = p.id_perusahaan
            WHERE
                v.id_stafkesehatan = ? AND v.status = 2
        `;

        db.query(query, [staffId], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },
    getAllLayananDokterByStaffIdVaksin1 : (staffId, callback) => {
        const query = `
            SELECT 
                v.id_vaksinasi AS id, p.nama_perusahaan, v.jenis_pelayanan, v.nomorpesanan, v.jumlahpasien_vaksin, v.tanggalpemesanan_vaksin, v.tanggalpelayanan_vaksin, v.status, 'vaksin' AS type
            FROM
                tb_vaksinasi v
            JOIN
                tb_perusahaan p ON v.id_perusahaan = p.id_perusahaan
            WHERE
                v.id_stafkesehatan = ? AND v.status = 1
        `;

        db.query(query, [staffId], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },
    VaksinDokterDetail: (id_vaksinasi, callback) => {
        const query = `
            SELECT
                v.id_vaksinasi AS id,
                p.nama_perusahaan,
                p.photo_perusahaan,
                v.jenis_pelayanan,
                v.nomorpesanan,
                pr.nama_proyek,
                pr.nomortelepon_proyek,
                v.jampelayanan_vaksin,
                v.tanggalpemesanan_vaksin,
                v.tanggalpelayanan_vaksin,
                v.jumlahpasien_vaksin,
                v.lokasipelayanan_vaksin,
                v.catatan_vaksinasi,
                nv.nama_vaksin,
                v.status,
                'vaksin' AS type
            FROM
                tb_vaksinasi v
            JOIN
                tb_perusahaan p ON v.id_perusahaan = p.id_perusahaan
            JOIN
                tb_proyek pr ON v.id_proyek = pr.id_proyek
            JOIN
                tb_stokvaksin nv ON v.id_vaksin = nv.id_vaksin
            WHERE
                v.id_vaksinasi = ?
        `;
    
        db.query(query, [id_vaksinasi], (err, results) => {
            if (err) {
                console.error('Error in SQL query:', err);
                return callback(err, null);
            }
            console.log('Query result:', results);
            callback(null, results[0]); // Pastikan hasil dikembalikan dengan benar
        });
    }
    
    
};


module.exports = LVaksinDokter;