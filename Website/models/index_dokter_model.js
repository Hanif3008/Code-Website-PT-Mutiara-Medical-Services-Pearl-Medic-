const db = require('./db');

const ProfileStaffDokter = {
    getStaffDokterById: (id, callback) => {
        const query = 'SELECT * FROM tb_stafkesehatan WHERE id_stafkesehatan = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result[0]);
        });
    },

    getAllLayananDokterByStaffId: (staffId, callback) => {
        const query = `
            SELECT 
                m.id_medical AS id, 
                p.nama_perusahaan, 
                m.jenis_pelayanan, 
                m.tanggalpelayanan_medical AS tanggal_pelayanan, 
                m.nomorpesanan, 
                m.status, 
                'medical' AS type
            FROM 
                tb_medical m
            JOIN 
                tb_perusahaan p ON m.id_perusahaan = p.id_perusahaan
            WHERE 
                m.id_stafkesehatan = ? AND m.status = 2
    
            UNION
    
            SELECT 
                d.id_darurat AS id, 
                p.nama_perusahaan, 
                d.jenis_pelayanan, 
                d.tglpemesanan_darurat AS tanggal_pelayanan, 
                d.nomorpesanan, 
                d.status, 
                'darurat' AS type
            FROM 
                tb_darurat d
            JOIN 
                tb_perusahaan p ON d.id_perusahaan = p.id_perusahaan
            WHERE 
                d.id_stafkesehatan = ? AND d.status = 2
    
            UNION
    
            SELECT 
                v.id_vaksinasi AS id, 
                p.nama_perusahaan, 
                v.jenis_pelayanan, 
                v.tanggalpelayanan_vaksin AS tanggal_pelayanan, 
                v.nomorpesanan, 
                v.status, 
                'vaksinasi' AS type
            FROM 
                tb_vaksinasi v
            JOIN 
                tb_perusahaan p ON v.id_perusahaan = p.id_perusahaan
            WHERE 
                v.id_stafkesehatan = ? AND v.status = 2
        `;
        
        db.query(query, [staffId, staffId, staffId], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
};

module.exports = ProfileStaffDokter;
