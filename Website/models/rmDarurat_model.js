const db = require('./db');

const getDaruratDetail = {
    PesananDaruratDetail: (id_darurat, callback) => {
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
                d.catatan_darurat
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
            callback(null, results);
        }
        );
    }
}

const getLastNomorRMD = (nomorpesanan, callback) => {
    const query = "SELECT nomor_rmDarurat FROM tb_rmdarurat WHERE nomorpesanan = ? ORDER BY nomor_rmDarurat DESC LIMIT 1";
    const params = [nomorpesanan + '%'];

    db.query(query, params, (err,results) => {
        if (err) return callback(err);

        console.log('Query Results:', results);

        if(results.length > 0) {
            const lastNomor = results[0].nomor_rmDarurat;
            console.log('Last Nomor RM:', lastNomor);

            const lastNomorString = lastNomor.toString();
            const urutanTerakhir = parseInt(lastNomorString.slice(-3), 10);
            const nomorBaru = urutanTerakhir + 1;
            const nomor_rmDarurat = nomorpesanan + String(nomorBaru).padStart(3,'0');

            return callback(null, nomor_rmDarurat);
        } else {
            return callback(null, nomorpesanan + '001');
        }
    });
}

const TambahRMDarurat = (
    nomorpesanan,
    nomor_rmDarurat,
    nama_lengkap,
    nomor_identitas,
    tanggal_lahir,
    jenis_kelamin,
    nomor_telepon,
    alamat,
    waktu_kedatangan,
    keluhan_utama,
    riwayat_penyakit,
    konsumsi_obat,
    alergi,
    tekanan_darah,
    denyut_jantung,
    suhu_tubuh,
    laju_pernapasan,
    diagnosa_awal,
    tindakan_awal,
    perawatan_lanjutan,
    id_darurat,
    callback
) => {
    const query = `
        INSERT INTO tb_rmdarurat (
            nomorpesanan,
            nomor_rmDarurat,
            nama_lengkap,
            nomor_identitas,
            tanggal_lahir,
            jenis_kelamin,
            nomor_telepon,
            alamat,
            waktu_kedatangan,
            keluhan_utama,
            riwayat_penyakit,
            konsumsi_obat,
            alergi,
            tekanan_darah,
            denyut_jantung,
            suhu_tubuh,
            laju_pernapasan,
            diagnosa_awal,
            tindakan_awal,
            perawatan_lanjutan,
            id_darurat
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;
    db.query(query, [
        nomorpesanan,
        nomor_rmDarurat,
        nama_lengkap,
        nomor_identitas,
        tanggal_lahir,
        jenis_kelamin,
        nomor_telepon,
        alamat,
        waktu_kedatangan,
        keluhan_utama,
        riwayat_penyakit,
        konsumsi_obat,
        alergi,
        tekanan_darah,
        denyut_jantung,
        suhu_tubuh,
        laju_pernapasan,
        diagnosa_awal,
        tindakan_awal,
        perawatan_lanjutan,
        id_darurat
    ], callback);
}

const ShowRMDaruratByNoPesanan = (nomorpesanan, callback) => {
    const query = "SELECT * FROM tb_rmdarurat WHERE nomorpesanan = ?";
    db.query(query, [nomorpesanan], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, results);
    });
}

const rmDarurat_model = {
    showRMDDetail: (nomor_rmDarurat, callback) => {
        const query = `
            SELECT
                rm.nomorpesanan,
                rm.nomor_rmDarurat,
                rm.nama_lengkap,
                rm.nomor_identitas,
                rm.tanggal_lahir,
                rm.jenis_kelamin,
                rm.nomor_telepon,
                rm.alamat,
                rm.waktu_kedatangan,
                rm.keluhan_utama,
                rm.riwayat_penyakit,
                rm.konsumsi_obat,
                rm.alergi,
                rm.tekanan_darah,
                rm.denyut_jantung,
                rm.suhu_tubuh,
                rm.laju_pernapasan,
                rm.diagnosa_awal,
                rm.tindakan_awal,
                rm.perawatan_lanjutan,
                s.namalengkap_stafkesehatan,
                s.spesialisasi_stafkesehatan,
                s.nomortelepon_stafkesehatan,
                d.tglpemesanan_darurat
            FROM
                tb_rmdarurat AS rm
            JOIN
                tb_darurat AS d ON rm.id_darurat = d.id_darurat
            JOIN
                tb_stafkesehatan AS s ON d.id_stafkesehatan = s.id_stafkesehatan
            WHERE
                rm.nomor_rmDarurat = ?
        `;

        db.query(query, [nomor_rmDarurat], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },
    ShowRMDById: (id_darurat, callback) => {
        const query = `
            SELECT
                d.nomorpesanan,
                p.nama_perusahaan,
                pr.nama_proyek,
                d.jenis_pelayanan,
                d.jumlahpasien_darurat,
                d.tglpemesanan_darurat,
                COUNT(rm.id_darurat) AS jumlah_rmDarurat
            FROM
                tb_darurat d
            JOIN
                tb_perusahaan p ON d.id_perusahaan = p.id_perusahaan
            JOIN
                tb_proyek pr ON d.id_proyek = pr.id_proyek
            LEFT JOIN
                tb_rmdarurat rm ON d.id_darurat = rm.id_darurat
            WHERE
                d.id_darurat = ?
            GROUP BY
                d.id_darurat,
                p.nama_perusahaan,
                pr.nama_proyek,
                d.jenis_pelayanan,
                d.jumlahpasien_darurat,
                d.tglpemesanan_darurat
        `;
        db.query(query, [id_darurat], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },
    ShowRMDByPesanan: (nomorpesanan, callback) => {
        const query = `
            SELECT
                rm.nomor_rmDarurat,
                rm.nama_lengkap,
                rm.jenis_kelamin
            FROM
                tb_rmdarurat AS rm
            JOIN    
                tb_darurat AS d ON rm.id_darurat = d.id_darurat
            WHERE
                d.nomorpesanan = ?
            `;
        db.query(query, [nomorpesanan], (err, results) => {
            console.log("Query Executed:", query);
            console.log("Query Parameters:", [nomorpesanan]);
            console.log("Query Results:", results);
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        }
        );
    }
}

const deleteDataRMD = (nomor_rmDarurat, callback) => {
    const query = "DELETE FROM tb_rmdarurat WHERE nomor_rmDarurat = ?";
    db.query(query, [nomor_rmDarurat], (err, results) => {
        if (err) return callback(err);
        return callback(null, results);
    });
}


module.exports = {
    PesananDaruratDetail: getDaruratDetail.PesananDaruratDetail,
    getLastNomorRMD: getLastNomorRMD,
    TambahRMDarurat,
    ShowRMDaruratByNoPesanan,
    showRMDDetail: rmDarurat_model.showRMDDetail,
    deleteDataRMD,
    ShowRMDByPesanan: rmDarurat_model.ShowRMDByPesanan,
    ShowRMDById: rmDarurat_model.ShowRMDById
}