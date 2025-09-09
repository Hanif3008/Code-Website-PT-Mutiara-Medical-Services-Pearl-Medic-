const medical_dokter_model = require('../models/medical_dokter_model');
const rmMedical_model = require ('../models/rmMedical_model');
const { SearchRMMedicalModel } = require('../models/rmMedical_model');


const DataPesananRekamMedis = (req, res) => {
    const id_medical = req.params.id_medical;

    medical_dokter_model.MedicalDokterDetail(id_medical, (err, PelayananMedical) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching medical services', error: err });
            return;
        }

        const nomorpesanan = PelayananMedical[0].nomorpesanan;

        rmMedical_model.ShowRMMedicalByNoPesanan(nomorpesanan, (err, RekamMedis) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Error fetching medical records', error: err });
                return;
            }

            const totalRekamMedis = RekamMedis.length; // Hitung total data rekam medis

            res.render('dokter/DataRekamMedis_medical_dokter', {
                title: 'Data Rekam Medis Pesanan',
                layout: 'layouts/main-layouts-dokter',
                PelayananMedical: PelayananMedical[0],
                RekamMedis: RekamMedis,
                totalRekamMedis: totalRekamMedis // Kirim total rekam medis ke EJS
            });
        });
    });
};

const DetailDataPesananRekamMedis = (req, res) => {
    const nomor_rmMedical = req.params.nomor_rmMedical;

    rmMedical_model.showRMMedicalByNomor_rmMedical(nomor_rmMedical, (err, RekamMedisDetail) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching medical record details', error: err });
            return;
        }

        if (!RekamMedisDetail) {
            res.status(404).render('error', { 
                message: 'Rekam medis tidak ditemukan',
                layout: 'layouts/main-layouts-dokter' 
            });
            return;
        }

        res.render('dokter/Detail_DataRekamMedis_medical_dokter', {
            title: 'Detail Rekam Medis',
            layout: 'layouts/main-layouts-dokter',
            RekamMedisDetail: RekamMedisDetail, // Kirim data rekam medis
            StafKesehatan: {
                namalengkap_stafkesehatan: RekamMedisDetail.namalengkap_stafkesehatan,
                spesialisasi_stafkesehatan: RekamMedisDetail.spesialisasi_stafkesehatan,
                nomortelepon_stafkesehatan: RekamMedisDetail.nomortelepon_stafkesehatan
            }, // Kirim data staf kesehatan
        });
    });
};

const DeleteDataRekamMedis = (req, res) => {
    const nomor_rmMedical = req.params.nomor_rmMedical;

    rmMedical_model.deleteDataRMmedis(nomor_rmMedical, (err, result) => {
        if (err) {
            console.error("Error deleting medical record:", err);
            res.status(500).json({ message: 'Error deleting medical record', error: err });
            return;
        }

        console.log("Medical record deleted successfully:", result);
        res.redirect('back'); // Kembali ke halaman sebelumnya
    });
};

const NomorPesananRekamMedis = (req,res) =>{
    const id_medical = req.params.id_medical;
    medical_dokter_model.MedicalDokterDetail(id_medical, (err,PelayananMedical) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching medical services', error: err });
            return;
        }
        res.render('dokter/Tambah_DataRekamMedis_medical_dokter', {
            title: 'Tambah Data Rekam Medis Pesanan',
            layout: 'layouts/main-layouts-dokter',
            PelayananMedical: PelayananMedical[0],
            success: req.flash('success'),
            error: req.flash('error')
        });
    });
};

const TambahDataRekamMedis = (req, res) => {
    const formData = req.body;
    console.log("Received form data:", formData);

    if (!formData.nomorpesanan) {
        return res.status(400).json({ error: "Nomor Pesanan tidak ditemukan." });
    }

    const nomorpesanan = formData.nomorpesanan;

    // Mendapatkan nomor RM dinamis
    rmMedical_model.getLastNomorRM(nomorpesanan, (err, lastNomor) => {
        if (err) {
            console.error("Error fetching last nomor RM:", err);
            return res.status(500).json({ error: "Failed to fetch last nomor RM." });
        }

        lastNomor = lastNomor.toString();  // Convert to string if it's not already
        const newNomorRM = lastNomor.slice(0, -3) + (parseInt(lastNomor.slice(-3)) + 1).toString().padStart(3, '0');
        console.log("Generated nomor_rmMedical:", newNomorRM);

        // Destructure formData to get all the necessary fields
        const {
            id_medical,  // Get id_medical from the formData
            nama_lengkap,
            nomor_identitas,
            tanggal_lahir,
            jenis_kelamin,
            nomor_telepon,
            email,
            jabatan,
            nomor_asuransi,
            alamat,
            rp_keluarga,
            rp_pribadi,
            kebiasaan_merokok,
            kebiasaan_alkohol,
            kebiasaan_olahraga,
            alergi,
            pola_makan,
            keluhan_pasien,
            tinggi_badan,
            berat_badan,
            indeks_massatubuh,
            tekanan_darah,
            denyut_nadi,
            pemeriksaan_mata,
            pemeriksaan_telinga,
            pemeriksaan_tenggorokan,
            pemeriksaan_jantung,
            pemeriksaan_paru,
            pemeriksaan_abdomen,
            hemoglobin,
            komentar_hemoglobin,
            kolesterol_total,
            komentar_kolesterol,
            asam_urat,
            komentar_asamurat,
            diagnosa,
            rekomendasi_medis,
            catatan_tambahan,
        } = formData;

        // Call model function to insert new medical record
        rmMedical_model.TambahRMMedical(
            id_medical,
            nomorpesanan,
            newNomorRM,  // Use the newNomorRM generated
            nama_lengkap,
            nomor_identitas,
            tanggal_lahir,
            jenis_kelamin,
            nomor_telepon,
            email,
            jabatan,
            nomor_asuransi,
            alamat,
            rp_keluarga,
            rp_pribadi,
            kebiasaan_merokok,
            kebiasaan_alkohol,
            kebiasaan_olahraga,
            alergi,
            pola_makan,
            keluhan_pasien,
            tinggi_badan,
            berat_badan,
            indeks_massatubuh,
            tekanan_darah,
            denyut_nadi,
            pemeriksaan_mata,
            pemeriksaan_telinga,
            pemeriksaan_tenggorokan,
            pemeriksaan_jantung,
            pemeriksaan_paru,
            pemeriksaan_abdomen,
            hemoglobin,
            komentar_hemoglobin,
            kolesterol_total,
            komentar_kolesterol,
            asam_urat,
            komentar_asamurat,
            diagnosa,
            rekomendasi_medis,
            catatan_tambahan,
            (err, result) => {
                if (err) {
                    console.error("Error adding medical record:", err);
                    return res.status(500).json({ error: "Failed to add medical record." });
                }

                console.log("Medical record added successfully:", result);

                // Use id_medical from formData for redirect
                const medicalId = formData.id_medical; // Using the id_medical from formData

                console.log("Redirecting to ID:", medicalId);

                // Redirect to the page using id_medical from formData
                return res.redirect(`/DataRekamMedis_medical_dokter/${medicalId}`);
            }
        );
    });
};


const ShowRMMedicalById = (req, res) => {
    const id_medical = req.params.id_medical;

    rmMedical_model.ShowRMMedicalById(id_medical, (err, orderDetails) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching medical order details', error: err });
            return;
        }
    
        if (!orderDetails) {
            res.status(404).render('error', { 
                message: 'Data pesanan tidak ditemukan', 
                layout: 'layouts/main-client-layout' 
            });
            return;
        }
        console.log("Order Details:", orderDetails); // Log untuk memastikan data ditemukan
        console.log("Nomor Pesanan:", orderDetails.nomorpesanan); // Log untuk memastikan nomor pesanan ada

        const nomorpesanan = orderDetails.nomorpesanan;

        rmMedical_model.ShowRMMedicalRecordsByPesanan(nomorpesanan, (err, medicalRecords) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Error fetching medical records', error: err });
                return;
            }
        
            // Hitung total rekam medis
            const totalMedicalRecords = medicalRecords.length;
        
            res.render('client/rmMedical_client', {
                title: 'Rekam Medis Medical Check Up',
                layout: 'layouts/main-client-layout',
                orderDetails: orderDetails,
                medicalRecords: medicalRecords,
                totalMedicalRecords: totalMedicalRecords, // Kirim total rekam medis ke template
            });
        });        
    });
};

const ShowDetailRMMedical = (req, res) => {
    const nomor_rmMedical = req.params.nomor_rmMedical;

    rmMedical_model.ShowDetailRMMedical(nomor_rmMedical, (err, medicalDetails) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching medical record details', error: err });
            return;
        }

        if (!medicalDetails) {
            res.status(404).render('error', { 
                message: 'Detail data rekam medis tidak ditemukan', 
                layout: 'layouts/main-client-layout' 
            });
            return;
        }

        res.render('client/detailrmMedical_client', {
            title: 'Detail Rekam Medis',
            layout: 'layouts/main-client-layout',
            medicalDetails: medicalDetails
        });
    });
};

const ShowRMMedicalByIdforAdmin = (req, res) => {
    const id_medical = req.params.id_medical;

    rmMedical_model.ShowRMMedicalById(id_medical, (err, orderDetails) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching medical order details', error: err });
            return;
        }

        if (!orderDetails) {
            res.status(404).render('error', {
                message: 'Data pesanan tidak ditemukan',
                layout: 'layouts/main-client-layout'
            });
            return;
        }

        const nomorpesanan = orderDetails.nomorpesanan;

        rmMedical_model.ShowRMMedicalRecordsByPesanan(nomorpesanan, (err, medicalRecords) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Error fetching medical records', error: err });
                return;
            }
            
            // Hitung total rekam medis
            const totalMedicalRecords = medicalRecords.length;

            res.render('admin/rmMedical_admin', {
                title: 'Rekam Medis Medical Check Up',
                layout: 'layouts/main-layout-admin',
                orderDetails: orderDetails,
                medicalRecords: medicalRecords,
                totalMedicalRecords: totalMedicalRecords, // Kirim total rekam medis ke template
            });
        });
    });
};

const ShowDetailRMMedicalforAdmin = (req, res) => {
    const nomor_rmMedical = req.params.nomor_rmMedical;

    rmMedical_model.ShowDetailRMMedical(nomor_rmMedical, (err, medicalDetails) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching medical record details', error: err });
            return;
        }

        if (!medicalDetails) {
            res.status(404).render('error', {
                message: 'Detail data rekam medis tidak ditemukan',
                layout: 'layouts/main-client-layout'
            });
            return;
        }

        res.render('admin/detailrmMedical_admin', {
            title: 'Detail Rekam Medis',
            layout: 'layouts/main-layout-admin',
            medicalDetails: medicalDetails
        });
    });
};

const SearchRMMedical = (req, res) => {
    const { query, nomorpesanan } = req.query;
  
    if (!nomorpesanan) {
      return res.status(400).json({ error: "Nomor pesanan tidak ditemukan." });
    }
  
    SearchRMMedicalModel(query, nomorpesanan, (err, results) => {
      if (err) {
        console.error("Database error:", err); // Debug error database
        return res.status(500).json({ error: "Failed to search medical records." });
      }
      res.json({ results });
    });
  };
  


module.exports = {
    DataPesananRekamMedis,
    TambahDataRekamMedis,
    NomorPesananRekamMedis,
    DetailDataPesananRekamMedis,
    DeleteDataRekamMedis,
    ShowRMMedicalById,
    ShowDetailRMMedical,
    ShowRMMedicalByIdforAdmin,
    ShowDetailRMMedicalforAdmin,
    SearchRMMedical
};
