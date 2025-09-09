const rmVaksinasi_model = require('../models/rmVaksinasi_models');
const { SearchRMVaksinModel } = require('../models/rmVaksinasi_models');

const PesananVDetail = (req, res) => {
    const id_vaksinasi = req.params.id_vaksinasi;

    rmVaksinasi_model.PesananVaksinDetail(id_vaksinasi, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching medical services', error: err });
            return;
        }

        const nomorpesanan = results[0].nomorpesanan;

        rmVaksinasi_model.ShowRMVaksinByNoPesanan(nomorpesanan, (err, resultsRM) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Error fetching medical services', error: err });
                return;
            }
            
            const totalRekamMedis = resultsRM.length;

            res.render('dokter/DataRekamMedis_vaksinasi_dokter', {
                title: 'Detail Pesanan Vaksinasi',
                layout: 'layouts/main-layouts-dokter',
                results: results[0],
                resultsRM: resultsRM,
                totalRekamMedis: totalRekamMedis
            })
        });
    });
}

const NomorPesananRekamMedisV = (req, res) => {
    const id_vaksinasi = req.params.id_vaksinasi;
    rmVaksinasi_model.PesananVaksinDetail(id_vaksinasi, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching medical services', error: err });
            return;
        }
        res.render('dokter/Tambah_DataRekamMedis_vaksinasi_dokter', {
            title: 'Tambah Data Rekam Medis Vaksinasi',
            layout: 'layouts/main-layouts-dokter',
            results: results[0]
        })
    });
}

const TambahDataRekamMedisV = (req, res) => {
    const formData = req.body;
    console.log('Received Form Data:', formData);

    const nomorpesanan = formData.nomorpesanan;

    rmVaksinasi_model.getLastNomorRMV(nomorpesanan, (err, lastNomor) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching last RM number', error: err });
            return;
        }

        lastNomor = lastNomor.toString();
        const newNomorRM = lastNomor.slice(0, -3) + (parseInt(lastNomor.slice(-3)) + 1).toString().padStart(3, '0');
        console.log("Generated nomor_rmVaksinasi:", newNomorRM);

        const {
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
        } = formData;

        rmVaksinasi_model.TambahRMVaksinasi(
            nomorpesanan,
            newNomorRM,
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
            id_vaksinasi,
            (err, results) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ message: 'Error adding new RM data', error: err });
                    return;
                }

                console.log('New RM data added:', results);

                const vaksinasiId = formData.id_vaksinasi;

                console.log("Redirecting to ID :", vaksinasiId);

                return res.redirect(`/DataRekamMedis_vaksinasi_dokter/${vaksinasiId}`);
            }
        );
    });
}

const SearchRMVaksin = (req, res) => {
    const { query, nomorpesanan } = req.query;

    if(!nomorpesanan) {
        return res.status(400).json({ error: 'Nomor Pesanan tidak ditemukan' });
    }

    SearchRMVaksinModel(query, nomorpesanan, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ results });
    });
};

const ShowDetailRMV_dokter = (req, res) => {
    const nomor_rmVaksinasi = req.params.nomor_rmVaksinasi;

    rmVaksinasi_model.ShowRMVDetail(nomor_rmVaksinasi, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching medical services', error: err });
            return;
        }

        if(!results) {
            return res.status(404).json({ message: 'Data RM Vaksinasi tidak ditemukan' });
        }

        res.render('dokter/Detail_DataRekamMedis_vaksinasi_dokter', {
            title: 'Detail Data Rekam Medis Vaksinasi',
            layout: 'layouts/main-layouts-dokter',
            results: results[0]
        })
    });
}

const deleteDataRMvaksin = (req, res) => {
    const nomor_rmVaksinasi = req.params.nomor_rmVaksinasi;

    rmVaksinasi_model.deleteDataRMvaksin(nomor_rmVaksinasi, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error deleting RM data', error: err });
            return;
        }

        console.log('RM data deleted:', results);
        res.redirect('back');
    });
}

const ShowRMVById_client = (req, res) => {
    const id_vaksinasi = req.params.id_vaksinasi;
    console.log('Received id_vaksinasi:', id_vaksinasi);
    rmVaksinasi_model.ShowRMVById(id_vaksinasi, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching medical services', error: err });
            return;
        }

        if (!results || results.length === 0) {
            return res.status(404).json({ message: 'Data RM Vaksinasi tidak ditemukan' });
        }

        // Assuming results is an array, access the first element for the company name
        const vaksinasiData = results[0]; // Assuming the first record holds the needed data
        const nomorpesanan = vaksinasiData.nomorpesanan;

        rmVaksinasi_model.ShowRMVByPesanan(nomorpesanan, (err, vaksinResults) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Error fetching medical services', error: err });
                return;
            }

            const totalvaksinRecords = vaksinResults.length;

            res.render('client/rmVaksin_client', {
                title: 'Data Rekam Medis Vaksinasi',
                layout: 'layouts/main-client-layout',
                results: vaksinasiData, // Pass the single object instead of the array
                totalvaksinRecords: totalvaksinRecords,
                vaksinResults: vaksinResults
            });
        });
    });
};

const ShowDetailRMV_client = (req, res) => {
    const nomor_rmVaksinasi = req.params.nomor_rmVaksinasi;

    rmVaksinasi_model.ShowRMVDetail(nomor_rmVaksinasi, (err, vaksinDetails) => {
        if (err) {
            console.error(err);
            // Kembalikan JSON, bukan render view
            return res.status(500).json({ 
                message: 'Error fetching medical services', 
                error: err 
            });
        }

        if (!vaksinDetails || vaksinDetails.length === 0) {
            // Tetap gunakan JSON untuk data tidak ditemukan
            return res.status(404).json({ 
                message: 'Data RM Vaksinasi tidak ditemukan' 
            });
        }
        
        // Jika data ditemukan, render halaman EJS
        res.render('client/detailrmVaksin_client', {
            title: 'Detail Data Rekam Medis Vaksinasi',
            layout: 'layouts/main-client-layout',
            vaksinDetails: vaksinDetails[0] // Pastikan data diteruskan dengan benar
        });
    });
};


const ShowRMVById_admin = (req, res) => {
    const id_vaksinasi = req.params.id_vaksinasi;

    rmVaksinasi_model.ShowRMVById(id_vaksinasi, (err, orderDetails) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching medical services', error: err });
            return;
        }

        if (!orderDetails) {
            return res.status(404).json({ message: 'Data RM Vaksinasi tidak ditemukan' });
        }

        const nomorpesanan = orderDetails[0].nomorpesanan;

        rmVaksinasi_model.ShowRMVByPesanan(nomorpesanan, (err, vaksinResults) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Error fetching medical services', error: err });
                return;
            }

            const totalvaksinRecords = vaksinResults.length;

            res.render('admin/rmvaksin_admin', {
                title: 'Data Rekam Medis Vaksinasi',
                layout: 'layouts/main-layout-admin',
                orderDetails: orderDetails[0],
                totalvaksinRecords: totalvaksinRecords,
                vaksinResults: vaksinResults
            });
        });
    });
};

const ShowDetailRMV_admin = (req, res) => {
    const nomor_rmVaksinasi = req.params.nomor_rmVaksinasi;

    rmVaksinasi_model.ShowRMVDetail(nomor_rmVaksinasi, (err, vaksinDetails) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error fetching medical services', error: err });
        }

        if (!vaksinDetails) {
            return res.status(404).json({ message: 'Data RM Vaksinasi tidak ditemukan' });
        }

        res.render('admin/DetailrmVaksin_admin', {
            title: 'Detail Data Rekam Medis Vaksinasi',
            layout: 'layouts/main-layout-admin',
            vaksinDetails: vaksinDetails[0]
        });
    });
};



module.exports = {
    PesananVDetail,
    TambahDataRekamMedisV,
    NomorPesananRekamMedisV,
    SearchRMVaksin,
    ShowDetailRMV_dokter,
    deleteDataRMvaksin,
    ShowRMVById_client,
    ShowDetailRMV_client,
    ShowRMVById_admin,
    ShowDetailRMV_admin
}
