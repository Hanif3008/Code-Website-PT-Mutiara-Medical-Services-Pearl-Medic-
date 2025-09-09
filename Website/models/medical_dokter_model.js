const db = require('./db');

const ProfileStaffDokterMedical = {
    getAllLayananDokterByStaffIdMedical : (staffId, callback) => {
        const query = `
            SELECT 
                m.id_medical AS id, p.nama_perusahaan, m.jenis_pelayanan,m.nomorpesanan, m.tanggalpemesanan_medical AS tanggal_pemesanan,  m.tanggalpelayanan_medical AS tanggal_pelayanan, m.status, 'medical' AS type
            FROM
                tb_medical m
            JOIN
                tb_perusahaan p ON m.id_perusahaan = p.id_perusahaan
            WHERE
                m.id_stafkesehatan = ? AND m.status = 2
        `;

        db.query(query, [staffId], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },
    getAllLayananDokterByStaffIdMedical1 : (staffId, callback) => {
        const query = `
            SELECT 
                m.id_medical AS id, p.nama_perusahaan, m.jenis_pelayanan, m.nomorpesanan, m.tanggalpemesanan_medical AS tanggal_pemesanan, m.tanggalpelayanan_medical AS tanggal_pelayanan, m.status, 'medical' AS type
            FROM
                tb_medical m
            JOIN
                tb_perusahaan p ON m.id_perusahaan = p.id_perusahaan
            WHERE
                m.id_stafkesehatan = ? AND m.status = 1
        `;

        db.query(query, [staffId], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },
    MedicalDokterDetail: (id_medical, callback) => {
        const query = `
            SELECT 
                m.id_medical AS id, 
                p.nama_perusahaan, 
                p.photo_perusahaan, 
                m.jenis_pelayanan, 
                m.nomorpesanan,
                pr.nama_proyek,  -- Selecting from tb_proyek
                pr.nomortelepon_proyek,  -- Selecting from tb_proyek
                m.jampelayanan_medical, 
                m.tanggalpemesanan_medical AS tanggal_pemesanan, 
                m.tanggalpelayanan_medical AS tanggal_pelayanan, 
                m.jumlahpasien_medical AS jumlah_pasien, 
                m.lokasipelayanan_medical AS lokasi_pelayanan, 
                m.catatan_medical AS catatan, 
                m.status, 
                'medical' AS type
            FROM
                tb_medical m
            JOIN
                tb_perusahaan p ON m.id_perusahaan = p.id_perusahaan
            JOIN
                tb_proyek pr ON m.id_proyek = pr.id_proyek  -- Join with tb_proyek
            WHERE
                m.id_medical = ?
        `;
    
        db.query(query, [id_medical], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            console.log("Query Results: ", results);  // Debugging line
            callback(null, results);
        });
    }
    
    
};





module.exports = ProfileStaffDokterMedical;