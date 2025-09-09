const db = require("./db");

const LDarurat_dokter = {
    getAllLayananDaruratDokter : (staffId, callback) => {
        const query = `
            SELECT 
                d.id_darurat AS id, p.nama_perusahaan, d.tglpemesanan_darurat, d.jenis_pelayanan, d.nomorpesanan, d.status, 'darurat' AS type
            FROM
                tb_darurat d
            JOIN
                tb_perusahaan p ON d.id_perusahaan = p.id_perusahaan
            WHERE
                d.id_stafkesehatan = ? AND d.status = 2
        `;

        db.query(query, [staffId], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },
    getAllLayananDaruratDokter1 : (staffId, callback) => {
        const query = `
            SELECT 
                d.id_darurat AS id, p.nama_perusahaan, d.tglpemesanan_darurat, d.jenis_pelayanan, d.nomorpesanan, d.status, 'darurat' AS type
            FROM
                tb_darurat d
            JOIN
                tb_perusahaan p ON d.id_perusahaan = p.id_perusahaan
            WHERE
                d.id_stafkesehatan = ? AND d.status = 1
        `;

        db.query(query, [staffId], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },
    DaruratDokterDetail: (id_darurat, callback) => {
        const query = `
            SELECT
                d.id_darurat AS id,
                p.nama_perusahaan,
                p.photo_perusahaan,
                d.jenis_pelayanan,
                d.nomorpesanan,
                pr.nama_proyek,
                pr.nomortelepon_proyek,
                d.tglpemesanan_darurat,
                d.jumlahpasien_darurat,
                d.rsrujukan_darurat,
                d.catatan_darurat,
                d.status,
                'darurat' AS type
            FROM
                tb_darurat d
            JOIN
                tb_perusahaan p ON d.id_perusahaan = p.id_perusahaan
            JOIN
                tb_proyek pr ON d.id_proyek = pr.id_proyek
            WHERE
                d.id_darurat = ?
        `;
    
        db.query(query, [id_darurat], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            console.log("Query Results: ", results);  // <-- Add this line to check results
            callback(null, results[0]);  // Access the first result directly
        });
    }
    
    };


module.exports = LDarurat_dokter;