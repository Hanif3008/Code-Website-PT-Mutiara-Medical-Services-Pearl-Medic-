const db = require('./db');


const getLastNomorRM = (nomorpesanan, callback) => {
    const query = 'SELECT nomor_rmMedical FROM tb_rmmedical WHERE nomorpesanan = ? ORDER BY nomor_rmMedical DESC LIMIT 1;';
    const params = [nomorpesanan + '%'];  // Untuk memastikan mendapatkan nomor dengan prefix yang sama
    
    db.query(query, params, (err, results) => {
        if (err) return callback(err);

        console.log("Query results:", results);  // Log the results to check the structure

        if (results.length > 0) {
            const lastNomor = results[0].nomor_rmMedical;
            console.log("Last Nomor RM:", lastNomor);  // Log lastNomor value

            // Convert to string if it's not already
            const lastNomorString = lastNomor.toString();  
            const urutanTerakhir = parseInt(lastNomorString.slice(-3), 10);  // Ambil urutan 3 digit terakhir
            const nomorBaru = urutanTerakhir + 1;
            const nomor_rmMedical = nomorpesanan + String(nomorBaru).padStart(3, '0'); // Menambahkan nomor baru

            return callback(null, nomor_rmMedical);
        } else {
            // Jika belum ada, mulai dari 1001001
            return callback(null, nomorpesanan + '001');
        }
    });
};


const TambahRMMedical = (id_medical,nomorpesanan, nomor_rmMedical, nama_lengkap, nomor_identitas, tanggal_lahir, jenis_kelamin, nomor_telepon, email, jabatan, nomor_asuransi, alamat, rp_keluarga, rp_pribadi, kebiasaan_merokok, kebiasaan_alkohol, kebiasaan_olahraga, alergi, pola_makan, keluhan_pasien, tinggi_badan, berat_badan, indeks_massatubuh, tekanan_darah, denyut_nadi, pemeriksaan_mata, pemeriksaan_telinga, pemeriksaan_tenggorokan, pemeriksaan_jantung, pemeriksaan_paru, pemeriksaan_abdomen, hemoglobin, kolesterol_total, asam_urat, komentar_hemoglobin, komentar_kolesterol, komentar_asamurat, diagnosa, rekomendasi_medis, catatan_tambahan, callback) => {
    const query = `INSERT INTO tb_rmmedical (
        id_medical,nomorpesanan, nomor_rmMedical, nama_lengkap, nomor_identitas, tanggal_lahir, jenis_kelamin, nomor_telepon, email, jabatan,
        nomor_asuransi, alamat, rp_keluarga, rp_pribadi, kebiasaan_merokok, kebiasaan_alkohol, kebiasaan_olahraga, alergi, pola_makan,
        keluhan_pasien, tinggi_badan, berat_badan, indeks_massatubuh, tekanan_darah, denyut_nadi, pemeriksaan_mata, pemeriksaan_telinga,
        pemeriksaan_tenggorokan, pemeriksaan_jantung, pemeriksaan_paru, pemeriksaan_abdomen, hemoglobin, kolesterol_total, asam_urat,
        komentar_hemoglobin, komentar_kolesterol, komentar_asamurat, diagnosa, rekomendasi_medis, catatan_tambahan
    ) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [
        id_medical,nomorpesanan, nomor_rmMedical, nama_lengkap, nomor_identitas, tanggal_lahir, jenis_kelamin, nomor_telepon, email, jabatan,
        nomor_asuransi, alamat, rp_keluarga, rp_pribadi, kebiasaan_merokok, kebiasaan_alkohol, kebiasaan_olahraga, alergi, pola_makan,
        keluhan_pasien, tinggi_badan, berat_badan, indeks_massatubuh, tekanan_darah, denyut_nadi, pemeriksaan_mata, pemeriksaan_telinga,
        pemeriksaan_tenggorokan, pemeriksaan_jantung, pemeriksaan_paru, pemeriksaan_abdomen, hemoglobin, kolesterol_total, asam_urat,
        komentar_hemoglobin, komentar_kolesterol, komentar_asamurat, diagnosa, rekomendasi_medis, catatan_tambahan
    ], callback);
};


const ShowRMMedicalByNoPesanan = (nomorpesanan, callback) => {
    const query = "SELECT * FROM tb_rmmedical WHERE nomorpesanan = ?";
    db.query(query, [nomorpesanan], (err, result) => {
        if (err) {
            return callback(err);
        }
        return callback(null, result);
    });
};
const showRMMedicalByNomor_rmMedical = (nomor_rmMedical, callback) => {
    const query = `
        SELECT 
            rm.id_medical,
            rm.nomorpesanan,
            rm.nomor_rmMedical,
            rm.nama_lengkap,
            rm.nomor_identitas,
            rm.tanggal_lahir,
            rm.jenis_kelamin,
            rm.nomor_telepon,
            rm.email,
            rm.jabatan,
            rm.nomor_asuransi,
            rm.alamat,
            rm.rp_keluarga,
            rm.rp_pribadi,
            rm.kebiasaan_merokok,
            rm.kebiasaan_alkohol,
            rm.kebiasaan_olahraga,
            rm.alergi,
            rm.pola_makan,
            rm.keluhan_pasien,
            rm.tinggi_badan,
            rm.berat_badan,
            rm.indeks_massatubuh,
            rm.tekanan_darah,
            rm.denyut_nadi,
            rm.pemeriksaan_mata,
            rm.pemeriksaan_telinga,
            rm.pemeriksaan_tenggorokan,
            rm.pemeriksaan_jantung,
            rm.pemeriksaan_paru,
            rm.pemeriksaan_abdomen,
            rm.hemoglobin,
            rm.kolesterol_total,
            rm.asam_urat,
            rm.komentar_hemoglobin,
            rm.komentar_kolesterol,
            rm.komentar_asamurat,
            rm.diagnosa,
            rm.rekomendasi_medis,
            rm.catatan_tambahan,
            m.tanggalpelayanan_medical,
            s.namalengkap_stafkesehatan,
            s.spesialisasi_stafkesehatan,
            s.nomortelepon_stafkesehatan
        FROM 
            tb_rmmedical AS rm
        JOIN 
            tb_medical AS m ON rm.id_medical = m.id_medical
        JOIN 
            tb_stafkesehatan AS s ON m.id_stafkesehatan = s.id_stafkesehatan
        WHERE 
            rm.nomor_rmMedical = ?;
    `;

    db.query(query, [nomor_rmMedical], (err, result) => {
        if (err) {
            return callback(err);
        }
        return callback(null, result[0]); // Ambil hanya satu hasil (detail)
    });
};


const deleteDataRMmedis = (nomor_rmMedical, callback) => {
    const query = 'DELETE FROM tb_rmmedical WHERE nomor_rmMedical = ?';
    db.query(query, [nomor_rmMedical], (err, result) => {
        if (err) return callback(err);
        return callback(null, result);
    });
};


const rmMedical_model = {
    ShowRMMedicalById: (id_medical, callback) => {
        const query = `
            SELECT 
                m.nomorpesanan, 
                p.nama_perusahaan, 
                pr.nama_proyek, 
                m.jenis_pelayanan, 
                m.jumlahpasien_medical,
                m.tanggalpelayanan_medical AS tanggal_pelayanan, 
                COUNT(rm.id_rmmedical) AS total_rekam_medis
            FROM 
                tb_medical m
            JOIN 
                tb_perusahaan p ON m.id_perusahaan = p.id_perusahaan
            JOIN 
                tb_proyek pr ON m.id_proyek = pr.id_proyek
            LEFT JOIN 
                tb_rmmedical rm ON m.id_medical = rm.id_medical
            WHERE 
                m.id_medical = ?
            GROUP BY 
                m.id_medical, p.nama_perusahaan, pr.nama_proyek, m.jenis_pelayanan, m.tanggalpelayanan_medical
        `;
        db.query(query, [id_medical], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result[0]);
        });
    },
    ShowRMMedicalRecordsByPesanan: (nomorpesanan, callback) => {
        const query = `
            SELECT 
                rm.nomor_rmMedical, 
                rm.nama_lengkap, 
                rm.jenis_kelamin
            FROM 
                tb_rmmedical rm
            JOIN 
                tb_medical m ON rm.id_medical = m.id_medical
            WHERE 
                m.nomorpesanan = ?
        `;
        db.query(query, [nomorpesanan], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
    ShowDetailRMMedical: (nomor_rmMedical, callback) => {
        const query = `
            SELECT 
                rm.id_medical,
                rm.nomorpesanan,
                rm.nomor_rmMedical,
                rm.nama_lengkap,
                rm.nomor_identitas,
                rm.tanggal_lahir,
                rm.jenis_kelamin,
                rm.nomor_telepon,
                rm.email,
                rm.jabatan,
                rm.nomor_asuransi,
                rm.alamat,
                rm.rp_keluarga,
                rm.rp_pribadi,
                rm.kebiasaan_merokok,
                rm.kebiasaan_alkohol,
                rm.kebiasaan_olahraga,
                rm.alergi,
                rm.pola_makan,
                rm.keluhan_pasien,
                rm.tinggi_badan,
                rm.berat_badan,
                rm.indeks_massatubuh,
                rm.tekanan_darah,
                rm.denyut_nadi,
                rm.pemeriksaan_mata,
                rm.pemeriksaan_telinga,
                rm.pemeriksaan_tenggorokan,
                rm.pemeriksaan_jantung,
                rm.pemeriksaan_paru,
                rm.pemeriksaan_abdomen,
                rm.hemoglobin,
                rm.kolesterol_total,
                rm.asam_urat,
                rm.komentar_hemoglobin,
                rm.komentar_kolesterol,
                rm.komentar_asamurat,
                rm.diagnosa,
                rm.rekomendasi_medis,
                rm.catatan_tambahan,
                m.tanggalpelayanan_medical,
                s.namalengkap_stafkesehatan,
                s.spesialisasi_stafkesehatan,
                s.nomortelepon_stafkesehatan
            FROM 
                tb_rmmedical AS rm
            JOIN 
                tb_medical AS m ON rm.id_medical = m.id_medical
            JOIN 
                tb_stafkesehatan AS s ON m.id_stafkesehatan = s.id_stafkesehatan
            WHERE 
                rm.nomor_rmMedical = ?;
        `;

        db.query(query, [nomor_rmMedical], (err, result) => {
            if (err) {
                return callback(err);
            }
            return callback(null, result[0]); // Ambil hanya satu hasil (detail)
        });
    }
}


const SearchRMMedicalModel = (query, nomorpesanan, callback) => {
    const searchQuery = `
      SELECT * 
      FROM tb_rmmedical
      WHERE 
        (nomor_rmMedical LIKE ? OR nama_lengkap LIKE ?) 
        AND nomorpesanan = ?
    `;
    db.query(searchQuery, [`%${query}%`, `%${query}%`, nomorpesanan], (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  };
  




module.exports = {
    TambahRMMedical,
    getLastNomorRM,
    ShowRMMedicalByNoPesanan,
    showRMMedicalByNomor_rmMedical,
    deleteDataRMmedis,
    rmMedical_model,
    ShowRMMedicalById: rmMedical_model.ShowRMMedicalById,
    ShowRMMedicalRecordsByPesanan: rmMedical_model.ShowRMMedicalRecordsByPesanan,
    ShowDetailRMMedical: rmMedical_model.ShowDetailRMMedical,
    SearchRMMedicalModel
}