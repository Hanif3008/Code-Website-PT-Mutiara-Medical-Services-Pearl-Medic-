const proyekClientModel = require('../models/proyek_client_models');

const tambahProyekSementara = (req, res) => {
    const { nama_proyek, no_telp, jumlah_karyawan, lokasi_proyek, deskripsi_proyek } = req.body;

    // Validasi data
    if (!nama_proyek || !no_telp || !jumlah_karyawan || !lokasi_proyek || !deskripsi_proyek) {
        return res.status(400).json({ message: 'Semua form wajib diisi' });
    }

    if (isNaN(parseInt(no_telp)) || no_telp.length < 8) {
        return res.status(400).json({ message: 'Nomor telepon wajib berupa angka dan minimal 8 digit' });
    }

    if (isNaN(parseInt(jumlah_karyawan))) {
        return res.status(400).json({ message: 'Jumlah karyawan wajib berupa angka' });
    }

    if (deskripsi_proyek.length < 30) {
        return res.status(400).json({ message: 'Deskripsi proyek wajib memiliki minimal 30 karakter' });
    }

    // Simpan data proyek sementara ke database
    const newData = {
        id_perusahaan: req.session.user.id_perusahaan,
        nama_proyek,
        jumlah_proyek: jumlah_karyawan,
        nomortelepon_proyek: no_telp,
        lokasi_proyek,
        deskripsi_proyek
    };

    proyekClientModel.simpanProyekSementara(newData, (err) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.send('<script>alert("Data berhasil ditambahkan"); window.location="/profile_client";</script>');
    });
};

module.exports = {
    tambahProyekSementara
};

