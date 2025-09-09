const LayananVaksinModel = require('../models/LayananVaksin_models');

const getLayananVaksinClientPage = (req, res) => {
    // Memeriksa apakah pengguna sudah login dan memiliki id_perusahaan
    if (!req.session.user || !req.session.user.id_perusahaan) {
        return res.status(401).send('Unauthorized');
    }
    
    // Mendapatkan id_perusahaan dari sesi pengguna
    const companyId = req.session.user.id_perusahaan;
    

    // Memanggil model untuk mendapatkan proyek berdasarkan id_perusahaan
    LayananVaksinModel.getProjectsByCompanyId(companyId, (err, projects) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Internal Server Error');
        }

        // Memanggil model untuk mendapatkan rumah sakit yang aktif
        LayananVaksinModel.getActiveHospitals((err, hospitals) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).send('Internal Server Error');
            }

        // Memanggil model untuk mendapatkan layanan vaksin
        LayananVaksinModel.getVaccineServices((err, services) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).send('Internal Server Error');
            }

            // Render halaman LayananVaks
            res.render('client/LayananVaksin_client', {
                title: 'Layanan Vaksinasi',
                layout: 'layouts/main-client-layout',
                projects,
                hospitals,
                services
            });
        });
    });
});
};

const submitVaccineRequest = (req, res) => {
    console.log(req.body); // Tambahkan ini untuk memeriksa data yang dikirim dalam permintaan POST
    const vaccineRequest = {
        id_proyek: req.body.selectedProject,
        nama_proyek : req.body.nama_proyek,
        jumlah_pasien_vaksin: req.body.jumlah_proyek,
        lokasipelayanan_vaksin: req.body.lokasi_pelaksanaan,
        jenis_vaksin: req.body.jenis_vaksin,
        nama_vaksin : req.body.nama_vaksin,
        tanggalpermintaan_vaksin: req.body.tanggal_pemeriksaan,
        jampermintaan_vaksin: req.body.jam_pemeriksaan,
        catatan_vaksin: req.body.catatan
    };

    // Render konfirmVaksin_client.ejs dengan data vaccineRequest
    res.render('client/konfirmVaksin_client', { title: 'Konfirmasi Vaksinasi', layout: 'layouts/main-client-layout', vaccineRequest });
};

const finalKonfirmasiVaksin = (req, res) => {
    // Memeriksa apakah pengguna telah mencentang syarat dan ketentuan
    if (!req.body.terms_agreement) {
        return res.status(400).send('Anda harus menyetujui syarat dan ketentuan.');
    }

    // Ambil jumlah pesanan terbaru dari database
    LayananVaksinModel.getLatestVaksinOrder((err, latestOrder) => {
        if (err) {
            console.error('Database error saat mengambil pesanan terakhir:', err);
            return res.status(500).send('Gagal mengambil data pesanan terakhir.');
        }

        // Menentukan nomor pesanan berikutnya
        const nextOrderNumber = latestOrder && latestOrder.nomorpesanan
            ? parseInt(String(latestOrder.nomorpesanan).slice(2)) + 1
            : 1;

        // Format nomor pesanan dengan awalan "02" untuk layanan vaksinasi
        const formattedOrderNumber = `02${String(nextOrderNumber).padStart(3, '0')}`; // Contoh: 02001, 02002, dst.

        // Mendapatkan data dari formulir konfirmasi
        const vaccineRequest = {
            id_proyek: req.body.id_proyek,
            id_perusahaan: req.session.user.id_perusahaan,
            jenis_pelayanan: 'Vaksinasi',
            nomorpesanan: formattedOrderNumber,
            jumlahpasien_vaksin: req.body.jumlah_pasien_vaksin,
            tanggalpemesanan_vaksin: new Date().toISOString().split('T')[0],
            tanggalpermintaan_vaksin: req.body.tanggalpermintaan_vaksin,
            tanggalpelayanan_vaksin: '',
            jampermintaan_vaksin: req.body.jampermintaan_vaksin,
            jampelayanan_vaksin: '',
            lokasipelayanan_vaksin: req.body.lokasipelayanan_vaksin,
            id_vaksin: req.body.id_vaksin,
            status: 3, // Status default untuk "Belum dilayani"
            catatan_vaksinasi: req.body.catatan_vaksin || '' // Catatan opsional
        };

        // Simpan data ke dalam tabel tb_vaksin
        LayananVaksinModel.saveVaccineRequest(vaccineRequest, (err) => {
            if (err) {
                console.error('Database error saat menyimpan permintaan vaksin:', err);
                return res.status(500).send('Gagal menyimpan permintaan vaksin.');
            }

            // Redirect ke halaman sukses
            res.redirect('/suksesLayanan_client');
        });
    });
};

module.exports = {
    getLayananVaksinClientPage,
    submitVaccineRequest,
    finalKonfirmasiVaksin
};