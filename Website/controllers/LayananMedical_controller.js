// controllers/LayananMedical_controller.js
const layananMedicalModel = require('../models/LayananMedical_model');

const getLayananMedicalClientPage = (req, res) => {
    // Memeriksa apakah pengguna sudah login dan memiliki id_perusahaan
    if (!req.session.user || !req.session.user.id_perusahaan) {
        return res.status(401).send('Unauthorized');
    }
    
    // Mendapatkan id_perusahaan dari sesi pengguna
    const companyId = req.session.user.id_perusahaan;
    

    // Memanggil model untuk mendapatkan proyek berdasarkan id_perusahaan
    layananMedicalModel.getProjectsByCompanyId(companyId, (err, projects) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Internal Server Error');
        }

        // Memanggil model untuk mendapatkan rumah sakit yang aktif
        layananMedicalModel.getActiveHospitals((err, hospitals) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).send('Internal Server Error');
            }

            // Render halaman LayananMedical_client dengan data yang didapatkan dari model
            res.render('client/LayananMedical_client', {
                title: 'Layanan Medical Check Up',
                layout: 'layouts/main-client-layout',
                projects,
                hospitals
            });
        });
    });
};
const submitMedicalRequest = (req, res) => {
    console.log(req.body); // Tambahkan ini untuk memeriksa data yang dikirim dalam permintaan POST
    const medicalRequest = {
        id_proyek: req.body.selectedProject,
        nama_proyek : req.body.nama_proyek,
        jumlah_pasien_medical: req.body.jumlah_proyek,
        lokasipelayanan_medical: req.body.lokasi_pelaksanaan,
        tanggalpermintaan_medical: req.body.tanggal_pemeriksaan_input,
        jampermintaan_medical: req.body.proyek_medicals,
        catatan_medical: req.body.catatan
    };

    // Render konfirmMedical_client.ejs dengan data medicalRequest
    res.render('client/konfirmMedical_client', { title: 'Konfirmasi Medical Check Up', layout: 'layouts/main-client-layout', medicalRequest });
};

const finalKonfirmMedicalRequest = (req, res) => {
    // Memeriksa apakah pengguna telah mencentang syarat dan ketentuan
    if (!req.body.terms_agreement) {
        return res.status(400).send('Anda harus menyetujui syarat dan ketentuan.');
    }

    // Ambil jumlah pesanan terbaru dari database
    layananMedicalModel.getLatestMedicalOrder((err, latestOrder) => {
        if (err) {
            console.error('Database error saat mengambil pesanan terakhir:', err);
            return res.status(500).send('Gagal mengambil data pesanan terakhir.');
        }

        // Format nomor pesanan
        const nextOrderNumber = latestOrder && latestOrder.nomorpesanan 
            ? parseInt(String(latestOrder.nomorpesanan).slice(2)) + 1 
            : 1;

        const formattedOrderNumber = `01${String(nextOrderNumber).padStart(3, '0')}`; // Format: 01001, 01002, dst.

        // Mendapatkan data dari formulir konfirmasi
        const medicalRequest = {
            id_proyek: req.body.selectedProject,
            id_perusahaan: req.session.user.id_perusahaan,
            jenis_pelayanan: 'Medical Check Up',
            nomorpesanan: formattedOrderNumber,
            jumlahpasien_medical: req.body.jumlahpasien_medical,
            tanggalpemesanan_medical: new Date().toISOString().split('T')[0],
            tanggalpermintaan_medical: req.body.tanggalpermintaan_medical,
            tanggalpelayanan_medical: '',
            jampermintaan_medical: req.body.jampermintaan_medical,
            jampelayanan_medical: '',
            lokasipelayanan_medical: req.body.lokasipelayanan_medical,
            status: 3,
            catatan_medical: req.body.catatan_medical || ''
        };

        // Simpan data ke dalam tabel tb_medical
        layananMedicalModel.saveMedicalRequest(medicalRequest, (err) => {
            if (err) {
                console.error('Database error saat menyimpan permintaan medis:', err);
                return res.status(500).send('Gagal menyimpan permintaan medis.');
            }

            // Redirect ke halaman sukses
            res.redirect('/suksesLayanan_client');
        });
    });
};



module.exports = {
    getLayananMedicalClientPage,
    submitMedicalRequest,
    finalKonfirmMedicalRequest
};