const rmDarurat_model = require('../models/rmDarurat_model');

const PesananDDetail = (req, res) => {
    const id_darurat = req.params.id_darurat;

    rmDarurat_model.PesananDaruratDetail(id_darurat, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }

        const nomorpesanan = results[0].nomorpesanan;

        rmDarurat_model.ShowRMDaruratByNoPesanan(nomorpesanan, (err, resultsRM) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }

            const totalRekamMedis = resultsRM.length;

            res.render('dokter/DataRekamMedis_darurat_dokter', {
                title: 'Data Rekam Medis Darurat',
                layout : 'layouts/main-layouts-dokter',
                results: results[0],
                resultsRM: resultsRM,
                totalRekamMedis: totalRekamMedis
            });
        });
    });
}

const NomorPesananRekamMedisD = (req, res) => {
    const id_darurat = req.params.id_darurat;

    rmDarurat_model.PesananDaruratDetail(id_darurat, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }

        res.render('dokter/Tambah_DataRekamMedis_darurat_dokter', {
            title: 'Tambah Data Rekam Medis Darurat',
            layout : 'layouts/main-layouts-dokter',
            results: results[0]
        });
    });
}

const TambahDataRekamMedisD = (req, res) => {
    const formData = req.body;
    console.log(formData);

    const nomorpesanan = formData.nomorpesanan;

    rmDarurat_model.getLastNomorRMD(nomorpesanan, (err, lastNomor) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }

        lastNomor = lastNomor.toString();
        const newNomorRM = lastNomor.slice(0, -3) + (parseInt(lastNomor.slice(-3)) + 1).toString().padStart(3, '0');
        console.log("Generated Nomor RM:", newNomorRM);

        const {
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
        } = formData;

        rmDarurat_model.TambahRMDarurat(
            nomorpesanan,
            newNomorRM,
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
            (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Internal Server Error'
                    });
                }

                console.log(results);

                const daruratId = formData.id_darurat;
                console.log(daruratId);

                return res.redirect(`/DataRekamMedis_darurat_dokter/${daruratId}`);
            }
        );
    });
}

const ShowDetailRMD_dokter = (req, res) => {
    const nomor_rmDarurat = req.params.nomor_rmDarurat;

    rmDarurat_model.showRMDDetail(nomor_rmDarurat, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }

        if(!results){
            return res.status(404).json({
                message: 'Data Rekam Medis Darurat Not Found'
            });
        }

        res.render('dokter/Detail_DataRekamMedis_darurat_dokter', {
            title: 'Detail Data Rekam Medis Darurat',
            layout : 'layouts/main-layouts-dokter',
            results: results[0]
        });
    });
}

const deleteDataRMD = (req, res) => {
    const nomor_rmDarurat = req.params.nomor_rmDarurat;

    rmDarurat_model.deleteDataRMD(nomor_rmDarurat, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }

        console.log(results);
        res.redirect('back');
    });
}

const ShowRMDById_client = (req, res) => {
    const id_darurat = req.params.id_darurat;
    console.log(id_darurat);
    rmDarurat_model.ShowRMDById(id_darurat, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }

        if(!results || results.length === 0){
            return res.status(404).json({
                message: 'Data Rekam Medis Darurat Not Found'
            });
        }

        const daruratData = results[0];
        const nomorpesanan = daruratData.nomorpesanan;

        rmDarurat_model.ShowRMDByPesanan(nomorpesanan, (err, daruratResults) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }

            const totaldaruratRecords = daruratResults.length;
            console.log(daruratResults);

            res.render('client/rmdarurat_client', {
                title: 'Rekam Medis Darurat',
                layout : 'layouts/main-client-layout',
                results : daruratData,
                daruratResults : daruratResults,
                totaldaruratRecords : totaldaruratRecords
            });
        });
    });
}

const ShowDetailRMD_client = (req, res) => {
    const nomor_rmDarurat = req.params.nomor_rmDarurat;

    rmDarurat_model.showRMDDetail(nomor_rmDarurat, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }

        if(!results || results.length === 0){
            return res.status(404).json({
                message: 'Data Rekam Medis Darurat Not Found'
            });
        }

        res.render('client/detailrmDarurat_client', {
            title: 'Detail Data Rekam Medis Darurat',
            layout : 'layouts/main-client-layout',
            results: results[0]
        });
    });
}

const ShowRMDById_admin = (req, res) => {
    const id_darurat = req.params.id_darurat;

    rmDarurat_model.ShowRMDById(id_darurat, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }

        if(!results || results.length === 0){
            return res.status(404).json({
                message: 'Data Rekam Medis Darurat Not Found'
            });
        }

        const nomorpesanan = results[0].nomorpesanan;

        rmDarurat_model.ShowRMDByPesanan(nomorpesanan, (err, daruratResults) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            
            const totaldaruratRecords = daruratResults.length;

            res.render('admin/rmdarurat_admin', {
                title: 'Rekam Medis Darurat',
                layout : 'layouts/main-layout-admin',
                results : results[0],
                daruratResults : daruratResults,
                totaldaruratRecords : totaldaruratRecords
            });
        });
    });
}


const ShowDetailRMD_admin = (req, res) => {
    const nomor_rmDarurat = req.params.nomor_rmDarurat;

    rmDarurat_model.showRMDDetail(nomor_rmDarurat, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }

        if(!results || results.length === 0){
            return res.status(404).json({
                message: 'Data Rekam Medis Darurat Not Found'
            });
        }
        
        res.render('admin/DetailrmDarurat_admin', {
            title: 'Detail Data Rekam Medis Darurat',
            layout : 'layouts/main-layout-admin',
            results: results[0]
        });
    });
}




module.exports = {
    PesananDDetail,
    NomorPesananRekamMedisD,
    TambahDataRekamMedisD,
    ShowDetailRMD_dokter,
    deleteDataRMD,
    ShowRMDById_client,
    ShowDetailRMD_client,
    ShowRMDById_admin,
    ShowDetailRMD_admin
}