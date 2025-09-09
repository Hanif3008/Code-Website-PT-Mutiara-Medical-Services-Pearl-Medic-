const db = require('./db');


const getVaksinasiDetail = {
    PesananVaksinDetail: (id_vaksinasi, callback) => {
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
                return callback(err, null);
            }
            callback(null, results);
        }
        );
    }
}


const getLastNomorRMV = (nomorpesanan, callback) => {
    const query = 'SELECT nomor_rmVaksinasi FROM tb_rmvaksinasi WHERE nomorpesanan = ? ORDER BY nomor_rmvaksinasi DESC LIMIT 1';
    const params = [nomorpesanan + '%'];

    db.query(query, params, (err,results) => {
        if (err) return callback(err);

        console.log('Query Results:', results);

        if(results.length > 0) {
            const lastNomor = results[0].nomor_rmVaksinasi;
            console.log('Last Nomor RM:', lastNomor);

            const lastNomorString = lastNomor.toString();
            const urutanTerakhir = parseInt(lastNomorString.slice(-3), 10);
            const nomorBaru = urutanTerakhir + 1;
            const nomor_rmVaksinasi = nomorpesanan + String(nomorBaru).padStart(3,'0');

            return callback(null, nomor_rmVaksinasi);
        } else {
            return callback(null, nomorpesanan + '001')
        }
    } )
}

const TambahRMVaksinasi = (
    nomorpesanan,
    nomor_rmVaksinasi,
    nama_lengkap,
    nomor_identitas,
    tanggal_lahir,
    jenis_kelamin,
    nomor_telepon,
    email,
    alamat,
    jenis_vaksin,
    tanggal_vaksinasi,
    lokasi_Vaksinasi,
    reaksi_pasien,
    deskripsi_kondisi,
    perawatan_lanjutan,
    id_vaksinasi,
    callback
) => {
    const query = `
        INSERT INTO tb_rmvaksinasi (
            nomorpesanan,
            nomor_rmVaksinasi,
            nama_lengkap,
            nomor_identitas,
            tanggal_lahir,
            jenis_kelamin,
            nomor_telepon,
            email,
            alamat,
            jenis_vaksin,
            tanggal_vaksinasi,
            lokasi_vaksinasi,
            reaksi_pasien,
            deskripsi_kondisi,
            perawatan_lanjutan,
            id_vaksinasi
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    db.query(query, [
        nomorpesanan,
        nomor_rmVaksinasi,
        nama_lengkap,
        nomor_identitas,
        tanggal_lahir,
        jenis_kelamin,
        nomor_telepon,
        email,
        alamat,
        jenis_vaksin,
        tanggal_vaksinasi,
        lokasi_Vaksinasi,
        reaksi_pasien,
        deskripsi_kondisi,
        perawatan_lanjutan,
        id_vaksinasi
    ], callback);
};

// SEARCH RM VAKSIN BY NOMOR PESANAN AND nama_lengkap
const SearchRMVaksinModel = (query, nomorpesanan, callback) => {
    const searchQuery = `
        SELECT * 
        FROM tb_rmvaksinasi 
        WHERE 
            (nomor_rmVaksinasi LIKE ? OR nama_lengkap LIKE ?)
            AND nomorpesanan = ?
    `;
    db.query(searchQuery, [`%${query}%`, `%${query}%`, nomorpesanan], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, results);
    });
};

const ShowRMVaksinByNoPesanan = (nomorpesanan, callback) => {
    const query = "SELECT * FROM tb_rmvaksinasi WHERE nomorpesanan = ?";
    db.query(query, [nomorpesanan], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, results);
    });
};


   
const rmVaksin_model = {
    ShowRMVDetail: (nomor_rmVaksinasi, callback) => {
        const query = `
            SELECT
                rm.nomorpesanan,
                rm.nomor_rmVaksinasi,
                rm.nama_lengkap,
                rm.nomor_identitas,
                rm.tanggal_lahir,
                rm.jenis_kelamin,
                rm.nomor_telepon,
                rm.email,
                rm.alamat,
                rm.jenis_vaksin,
                rm.tanggal_vaksinasi,
                rm.lokasi_vaksinasi,
                rm.reaksi_pasien,
                rm.deskripsi_kondisi,
                rm.perawatan_lanjutan,
                s.namalengkap_stafkesehatan,
                s.spesialisasi_stafkesehatan,
                s.nomortelepon_stafkesehatan,
                v.tanggalpelayanan_vaksin
            FROM
                tb_rmvaksinasi AS rm
            JOIN
                tb_vaksinasi AS v ON rm.id_vaksinasi = v.id_vaksinasi
            JOIN
                tb_stafkesehatan AS s ON v.id_stafkesehatan = s.id_stafkesehatan
            WHERE
                rm.nomor_rmVaksinasi = ?
        `;
        db.query(query, [nomor_rmVaksinasi], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        }
        );
    },
    ShowRMVById: (id_vaksinasi, callback) => {
        const query = `
            SELECT
                v.nomorpesanan,
                p.nama_perusahaan,
                pr.nama_proyek,
                v.jenis_pelayanan,
                v.jumlahpasien_vaksin,
                v.tanggalpelayanan_vaksin AS tanggal_pelayanan,
                COUNT(rm.id_vaksinasi) AS total_rekam_medis
            FROM
                tb_vaksinasi v
            JOIN
                tb_perusahaan p ON v.id_perusahaan = p.id_perusahaan
            JOIN
                tb_proyek pr ON v.id_proyek = pr.id_proyek
            LEFT JOIN
                tb_rmvaksinasi AS rm ON v.id_vaksinasi = rm.id_vaksinasi
            WHERE
                v.id_vaksinasi = ?
                GROUP BY
                v.id_vaksinasi,
                p.nama_perusahaan,
                pr.nama_proyek,
                v.jenis_pelayanan,
                v.jumlahpasien_vaksin,
                v.tanggalpelayanan_vaksin
            `;
        db.query(query, [id_vaksinasi], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        }
        );
    },
    ShowRMVByPesanan: (nomorpesanan, callback) => {
        const query = `
            SELECT
                rm.nomor_rmVaksinasi,
                rm.nama_lengkap,
                rm.jenis_kelamin
            FROM
                tb_rmvaksinasi AS rm
            JOIN
                tb_vaksinasi AS v ON rm.id_vaksinasi = v.id_vaksinasi
            WHERE
                v.nomorpesanan = ?
            `;
        db.query(query, [nomorpesanan], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        }
        );
    }
}

const deleteDataRMvaksin = (nomor_rmVaksinasi, callback) => {
    const query = 'DELETE FROM tb_rmvaksinasi WHERE nomor_rmVaksinasi = ?';
    db.query(query, [nomor_rmVaksinasi], (err, results) => {
        if (err) return callback(err);
        return callback(null, results);
    });
};





module.exports = {
    PesananVaksinDetail: getVaksinasiDetail.PesananVaksinDetail,
    getLastNomorRMV,
    TambahRMVaksinasi,
    ShowRMVaksinByNoPesanan,
    SearchRMVaksinModel,
    ShowRMVDetail: rmVaksin_model.ShowRMVDetail,
    deleteDataRMvaksin,
    ShowRMVById: rmVaksin_model.ShowRMVById,
    ShowRMVByPesanan: rmVaksin_model.ShowRMVByPesanan
}