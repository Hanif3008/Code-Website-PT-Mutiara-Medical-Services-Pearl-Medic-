const LayananDaruratModel = require('../models/LayananDarurat_models');


const getLayananDaruratClientPage = (req, res) => {
    // Memeriksa apakah pengguna sudah login dan memiliki id_perusahaan
    if (!req.session.user || !req.session.user.id_perusahaan) {
        return res.status(401).send('Unauthorized');
    }
    // Mendapatkan id_perusahaan dari sesi pengguna
    const companyId = req.session.user.id_perusahaan;
    

    // Memanggil model untuk mendapatkan proyek berdasarkan id_perusahaan
    LayananDaruratModel.getProjectsByCompanyId(companyId, (err, projects) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Internal Server Error');
        }

        // Memanggil model untuk mendapatkan rumah sakit yang aktif
        LayananDaruratModel.getActiveHospitals((err, hospitals) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).send('Internal Server Error');
            }

            // Render halaman LayananDarurat
            res.render('client/LayananDarurat_client', {
                title: 'Layanan Darurat',
                layout: 'layouts/main-client-layout',
                projects,
                hospitals
            });
        });
    });
};


const submitEmergencyRequest = (req, res) => {
    console.log(req.body); // Tambahkan ini untuk memeriksa data yang dikirim dalam permintaan POST
    const emergencyRequest = {
        id_proyek: req.body.selectedProject,
        nama_proyek : req.body.nama_proyek,
        jumlah_pasien : req.body.jumlah_pasien,
        id_rsrujukan : req.body.rs_proyek,
        rs_rujukan : req.body.nama_rs,
        namars_rujukan : req.body.nama_rs,
        catatan : req.body.catatan
    };

    // render halaman konfirmasi
    res.render('client/konfirmDarurat_client', { title: 'Konfirmasi Layanan Darurat', layout: 'layouts/main-client-layout', emergencyRequest });
};

const finalKonfirmasiEmergency = (req, res) => {
    // Memeriksa apakah pengguna telah mencentang syarat dan ketentuan
    if (!req.body.terms_agreement) {
        return res.status(400).send('Anda harus menyetujui syarat dan ketentuan.');
    }

    LayananDaruratModel.getLatestDaruratOrder((err, latestOrder) => {
        if (err) {
            console.error('Database error saat mengambil pesanan terakhir:', err);
            return res.status(500).send('Gagal mengambil data pesanan terakhir.');
        }

        // Menentukan nomor pesanan berikutnya
        const nextOrderNumber = latestOrder && latestOrder.nomorpesanan
            ? parseInt(String(latestOrder.nomorpesanan).slice(2)) + 1
            : 1;  // Jika tidak ada pesanan sebelumnya, mulai dari 1

        // Format nomor pesanan dengan awalan "03" untuk layanan darurat
        const formattedOrderNumber = `03${String(nextOrderNumber).padStart(3, '0')}`; // Format: 03001, 03002, dst.

        // Mendapatkan data dari formulir konfirmasi
        const emergencyRequest = {
            id_proyek: req.body.id_proyek,
            id_perusahaan: req.session.user.id_perusahaan,
            jenis_pelayanan: 'Darurat',
            nomorpesanan: formattedOrderNumber,
            rsrujukan_darurat: req.body.rs_rujukan,
            jumlahpasien_darurat: req.body.jumlah_pasien,
            tglpemesanan_darurat: new Date().toISOString().split('T')[0],
            status: 3,
            catatan_darurat: req.body.catatan
        };

        // Memanggil model untuk menyimpan data layanan darurat
        LayananDaruratModel.saveEmergencyService(emergencyRequest, (err) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).send('Internal Server Error');
            }

            // Redirect ke halaman konfirmasi
            res.redirect('/suksesLayanan_client');
        });
    });
};



module.exports = {
    getLayananDaruratClientPage,
    submitEmergencyRequest,
    finalKonfirmasiEmergency
};