const Apotik = require('../models/apotik_models');
const KeranjangSementara = require('../models/ks_models');
const proyekClientModel = require('../models/proyek_client_models');
const PembelianObat = require('../models/pembelian_obat_models'); // Import model untuk pembelian obat


exports.showStokObat = (req, res) => {
    const currentPage = parseInt(req.query.page) || 1;
    const itemsPerPage = 12;
    const searchTerm = req.query.search || '';
    const user = req.session.user || {};

    KeranjangSementara.getData(user.id_perusahaan, (err, keranjangData) => {
        if (err) {
            console.error('Error fetching keranjang data:', err);
            keranjangData = [];
        }
        console.log('Isi keranjangData:', keranjangData);

        if (searchTerm) {
            Apotik.searchObat(searchTerm, currentPage, itemsPerPage, (result) => {
                res.render('client/LayananApotik_client', {
                    title: 'Apotek Pearl Medic',
                    layout: 'layouts/main-client-layout',
                    obat: result.data,
                    totalPages: result.totalPages,
                    currentPage: currentPage,
                    searchTerm: searchTerm,
                    user: user,
                    keranjangData: keranjangData
                });
            });
        } else {
            Apotik.getStokObat(currentPage, itemsPerPage, (result) => {
                res.render('client/LayananApotik_client', {
                    title: 'Apotek Pearl Medic',
                    layout: 'layouts/main-client-layout',
                    obat: result.data,
                    totalPages: result.totalPages,
                    currentPage: currentPage,
                    searchTerm: '',
                    user: user,
                    keranjangData: keranjangData
                });
            });
        }
    });
};

exports.showCheckout = (req, res) => {
    const user = req.session.user; // Get the logged-in user data
    const id_perusahaan = user.id_perusahaan; // Get the id_perusahaan from the logged-in user data

    // Fetch shopping cart data for the logged-in company
    KeranjangSementara.getData(id_perusahaan, (err, keranjangData) => {
        if (err) {
            console.error('Error fetching shopping cart data:', err);
            keranjangData = [];
        }

        // Fetch projects related to the logged-in company
        proyekClientModel.getProjectsByCompanyId(id_perusahaan, (err, projects) => {
            if (err) {
                console.error('Error fetching projects data:', err);
                projects = [];
            }
            res.render('client/checkoutApotik_client', {
                title: 'Checkout Apotik',
                layout: 'layouts/main-client-layout',
                keranjangData: keranjangData, // Pass the shopping cart data to the view
                projects: projects // Pass the projects data to the view
            });
        });
    });
};


exports.checkoutPembelianObat = (req, res) => {
    const user = req.session.user; // Dapatkan data user yang sedang login
    const id_perusahaan = user.id_perusahaan; // Dapatkan ID perusahaan user

    // Dapatkan data dari form
    const { proyek, alamat, catatan } = req.body;

    // Pastikan proyek dan alamat terisi
    if (!proyek || !alamat) {
        return res.status(400).send("Proyek dan alamat wajib diisi");
    }

    // Dapatkan data keranjang sementara
    KeranjangSementara.getData(id_perusahaan, (err, keranjangData) => {
        if (err) {
            console.error('Error fetching shopping cart data:', err);
            keranjangData = [];
        }

        // Simpan data pembelian obat ke database
        PembelianObat.createPembelianObat(id_perusahaan, proyek, keranjangData, alamat, catatan, (err) => {
            if (err) {
                console.error('Error saving purchase data:', err);
                return res.status(500).send("Terjadi kesalahan saat menyimpan data pembelian obat");
            }

            // Hapus data keranjang sementara setelah berhasil checkout
            KeranjangSementara.hapusSemuaData(id_perusahaan, (err) => {
                if (err) {
                    console.error('Error clearing shopping cart data:', err);
                    // Lanjutkan ke halaman sukses meskipun terjadi kesalahan pada penghapusan data keranjang sementara
                }
                
                // Redirect ke halaman sukses
                res.redirect('/suksesLayanan_client');
            });
        });
    });
};
