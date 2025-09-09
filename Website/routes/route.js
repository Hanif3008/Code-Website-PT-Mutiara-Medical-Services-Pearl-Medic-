const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
// ============= controller ==============
const loginClientController = require('../controllers/loginclient_controllers');
const StafAdminController = require('../controllers/loginadmin_controllers');
const DokterController = require('../controllers/logindokter_controllers');
const KepalaAdminController = require('../controllers/loginKadmin_controllers');
const ApotikController = require('../controllers/apotik_controller');
const KeranjangController = require('../controllers/ks_controller');
const profileClientController = require('../controllers/profile_client_controllers');
const tambahProyekController = require('../controllers/proyek_client_controllers'); 
const usercontroller = require('../controllers/usercontroller');
const pembelianObatController = require('../controllers/pembelianobatcontroller');
const LayananMedicalController = require('../controllers/LayananMedical_controller');
const LayananVaksinController = require('../controllers/LayananVaksin_controller');
const LayananDaruratController = require('../controllers/LayananDarurat_controller');
const historiobatClientController = require('../controllers/historiobatClientController');
const { getMedicalDetail } = require('../controllers/historimedicalClient_controllers');
const { getVaksinDetail } = require('../controllers/historivaksinClient_controller');
const { getDaruratDetail } = require('../controllers/historidaruratclient_controller');
const { getProfileKstaff } = require('../controllers/profileKstaff_controller');
const { editProfileKstaff, updateProfileKstaff, uploadpic, getGantiPassKadmin, changePasswordKadmin } = require('../controllers/profileKstaff_controller');
const { tambahAkunStafAdmin } = require('../controllers/KstaffadminAkun_controller');
const { renderIndexKadmin } = require('../controllers/KstaffadminAkun_controller');
const { renderDetailStafAdmin } = require('../controllers/KstaffadminAkun_controller');
const { renderEditDetailAkun, updateDetailAkun, renderpasswordAkun, updatePassword, deletestaffAdmin } = require('../controllers/KstaffadminAkun_controller');
const { getRSadmin, getRSadminById, editRSadmin, updateRSadmin, searchRSadmin, addRSadmin, deleteRSadmin } = require('../controllers/RSadmin_controller');
const { getDokter, getDokterById, addDataDokter, searchDataDokter, editDataDokter,updateDataDokter, deleteDataDokter, renderpassDokter, updatePasswordDoctor } = require('../controllers/LDokter_controllers');
const { deleteProyekById,tambahProyek, displayEditDetailProyekById,getDetailProyekById , displayProyekPerusahaan, getPerusahaan,getProyekRequestsById, acceptProyekRequest,rejectProyekRequest, getPerusahaanById, addDataPerusahaan, displayEditPerusahaan, EditDataPerusahaan,deleteDataPerusahaanById, searchDataPerusahaanByname, searchProyek,editDetailProyekByIds } = require('../controllers/perusahaanAdmin_controller');
const { updateStatusVaccineServices,deleteVaccineServices, updateVaksinasiService,getVaksinasiServiceDetailById,tambahDataVaksin, updateDataVaccine, getAllDataVaccineById,getAllVaksinasiServices,getAlllDataVaccine,deleteDataVaksin } = require('../controllers/LVaksinAdmin_controller');
const { deleteDaruratServices,updateStatusDaruratServices,UpdateDaruratServices,displayAllDaruratServices,displayAllDataDaruratById } = require('../controllers/LDaruratAdmin_controller');
const {updateMedicalServices,getAllMedicalServices, getMedicalServicesById, updateStatusMedicalServices,  deleteMedicalServices} = require('../controllers/LMedicalAdmin_controller');
const {deleteStokObat, getAllObatServices, getObatServicesById, updateObatServices, updateStatusObatServices,deleteObatServices, DisplayAllStockObat, searchObatName, DisplayStockObatById,editStockObatById,addDataObat} = require('../controllers/LObatAdmin_controller');
const {getAllLayananMasuk} = require('../controllers/dashboard_admin_controller');
const {getAllLayananDokter} = require('../controllers/index_dokter_controller');
const {getAllLayananDokterByStaffIdMedical, MedicalDokterDetail} = require('../controllers/medical_dokter_controller');
const { getAllLayananDaruratDokterByStaffId, DaruratDokterDetail } = require('../controllers/LDarurat_dokter_controller');
const {getAllLayananVaksinByStaffId,  VaksinDokterDetail } = require('../controllers/LVaksin_dokter_controller');
const { DataPesananRekamMedis, TambahDataRekamMedis, NomorPesananRekamMedis, DetailDataPesananRekamMedis, DeleteDataRekamMedis, ShowRMMedicalById, ShowDetailRMMedical, ShowRMMedicalByIdforAdmin, ShowDetailRMMedicalforAdmin, SearchRMMedical} = require('../controllers/rmMedical_controller');
const { PesananVDetail, TambahDataRekamMedisV, NomorPesananRekamMedisV, SearchRMVaksin, ShowDetailRMV_dokter, deleteDataRMvaksin, ShowRMVById_client, ShowDetailRMV_client, ShowRMVById_admin, ShowDetailRMV_admin } = require('../controllers/rmVaksinasi_controller');
const { PesananDDetail, NomorPesananRekamMedisD, TambahDataRekamMedisD, ShowDetailRMD_dokter, deleteDataRMD, ShowRMDById_client, ShowDetailRMD_client, ShowRMDById_admin, ShowDetailRMD_admin } = require('../controllers/rmDarurat_controller');

// ============= middleware ==============
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const dokterMiddleware = require('../middlewares/dokterMiddleware');
const KadminMiddleware = require('../middlewares/KadminMiddleware');
const RoleMiddleware = require('../middlewares/RoleMiddleware');
const addCompanyDataToLocals = require('../middlewares/addCompanyDataToLocals');
const historiMiddleware = require('../middlewares/historimiddleware');
const historiMedicalMiddleware = require('../middlewares/historimedicalmiddleware');
const historiVaksinMiddleware = require('../middlewares/historivaksin_middleware');
const historiDaruratMiddleware = require('../middlewares/historidarurat_middleware');
const userKadminMiddleware = require('../middlewares/userKadmin_middlewares');
const addStaffAdminProfileDataToLocals = require('../middlewares/userAdmin_middleware');
const addStaffDokterProfileDataToLocals = require('../middlewares/userDokterMiddleware');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/img'); // Mengubah direktori destinasi menjadi 'assets/img'
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });


// Routes Login Client, Admin, Dokter

// ============ Route Login Client ============
router.get('/login_client', (req, res) => {
    res.render('client/login_client', { title: 'Login', subtitle: 'Client', layout: 'layouts/main-layout-login' });
});
router.get('/logout_client', loginClientController.logout);
// ============ Route Login Client ============

// ============ Route Login admin ============
router.get('/login_admin', (req, res) => {
    res.render('admin/login_admin', { title: 'Login Admin', subtitle: 'Staff Administrasi', layout: 'layouts/main-layout-login' });
});
router.get('/logout_admin', StafAdminController.logout);
// ============ Route Login admin ============

// ============ Route Login dokter ============
router.get('/login_dokter', (req, res) => {
    res.render('dokter/login_dokter', { title: 'Login Dokter', subtitle: 'Staf Kesehatan', layout: 'layouts/main-layout-login' });
});
router.get('/logout_dokter', DokterController.logout);
// ============ Route Login dokter ============
router.get('/login_KepalaAdmin', (req, res) => {
    res.render('Kadmin/login_KepalaAdmin', { title: 'Login Kepala Admin', subtitle:'Kepala Administrasi', layout: 'layouts/main-layout-login' }); 
});   
router.get('/logout_KepalaAdmin', KepalaAdminController.logout);



// END Routes Login Client, Admin, Dokter


// Halaman Client
router.get('/', authMiddleware, RoleMiddleware('Client'), usercontroller.mainpageuser);
router.get('/profile_client', authMiddleware, RoleMiddleware('Client'), historiMiddleware,historiMedicalMiddleware,historiVaksinMiddleware, historiDaruratMiddleware, profileClientController.getProfileClient);
router.get('/editprofile_client', authMiddleware, RoleMiddleware('Client'), profileClientController.getEditProfileClient);
router.get('/tambahproyek_client', authMiddleware, RoleMiddleware('Client'), usercontroller.showTambahProyek);
router.get('/changepass_client', authMiddleware, RoleMiddleware('Client'), addCompanyDataToLocals, (req, res) => {
    res.render('client/changepass_client', { title: 'Ganti Password', layout: 'layouts/main-client-layout' });
});
router.get('/detailproyek_client', authMiddleware, RoleMiddleware('Client'), addCompanyDataToLocals,profileClientController.getProjectDetail);
router.get('/editdetailproyek_client', authMiddleware, RoleMiddleware('Client'), addCompanyDataToLocals, (req, res) => {
    res.render('client/editdetailproyek_client', { title: 'Edit Detail Proyek', layout: 'layouts/main-client-layout' });
});
router.get('/historimedical_client', authMiddleware, RoleMiddleware('Client'), addCompanyDataToLocals, getMedicalDetail);
router.get('/historidarurat_client', authMiddleware, RoleMiddleware('Client'), addCompanyDataToLocals, getDaruratDetail);
router.get('/historivaksin_client', authMiddleware, RoleMiddleware('Client'), addCompanyDataToLocals, getVaksinDetail);
router.get('/historiobat_client', authMiddleware, RoleMiddleware('Client'),addCompanyDataToLocals, historiobatClientController.getPelayananDetail);
router.get('/rmMedical_client/:id_medical', authMiddleware, RoleMiddleware('Client'), addCompanyDataToLocals, ShowRMMedicalById);
router.get('/detailrmMedical_client/:nomor_rmMedical', authMiddleware, RoleMiddleware('Client'), addCompanyDataToLocals, ShowDetailRMMedical);
router.get('/rmdarurat_client/:id_darurat', authMiddleware, RoleMiddleware('Client'), addCompanyDataToLocals, ShowRMDById_client);
router.get('/detailrmDarurat_client/:nomor_rmDarurat', authMiddleware, RoleMiddleware('Client'), addCompanyDataToLocals,  ShowDetailRMD_client);
router.get('/rmvaksin_client/:id_vaksinasi', authMiddleware, RoleMiddleware('Client'), addCompanyDataToLocals, ShowRMVById_client);
router.get('/detailrmVaksin_client/:nomor_rmVaksinasi', authMiddleware, RoleMiddleware('Client'), addCompanyDataToLocals, ShowDetailRMV_client);
router.get('/LayananMedical_client', authMiddleware, RoleMiddleware('Client'), addCompanyDataToLocals, LayananMedicalController.getLayananMedicalClientPage);
router.get('/LayananVaksin_client', authMiddleware, RoleMiddleware('Client'), addCompanyDataToLocals, LayananVaksinController.getLayananVaksinClientPage);
router.get('/LayananDarurat_client', authMiddleware, RoleMiddleware('Client'), addCompanyDataToLocals, LayananDaruratController.getLayananDaruratClientPage);
router.get('/konfirmMedical_client', authMiddleware, RoleMiddleware('Client'), addCompanyDataToLocals, LayananMedicalController.submitMedicalRequest );
router.get('/konfirmVaksin_client', authMiddleware, RoleMiddleware('Client'), addCompanyDataToLocals, LayananVaksinController.submitVaccineRequest );
router.get('/konfirmDarurat_client', authMiddleware, RoleMiddleware('Client'), addCompanyDataToLocals, LayananDaruratController.submitEmergencyRequest );
router.get('/tentangkami_client', authMiddleware, RoleMiddleware('Client'), addCompanyDataToLocals, (req, res) => {
    res.render('client/tentangkami_client', { title: 'Tentang Kami', layout: 'layouts/main-client-layout' });
});
router.get('/LayananApotik_client', authMiddleware, RoleMiddleware('Client'), addCompanyDataToLocals, ApotikController.showStokObat);
router.get('/checkoutApotik_client', authMiddleware, RoleMiddleware('Client'), addCompanyDataToLocals, ApotikController.showCheckout);
router.get('/suksesLayanan_client', authMiddleware, RoleMiddleware('Client'), addCompanyDataToLocals, (req, res) => {
    res.render('client/suksesLayanan_client', { title: 'Sukses Layanan', layout: 'layouts/main-client-layout' });
});


// END Halaman Client

// Routes Admin
router.get('/index_admin', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'), getAllLayananMasuk);
router.get('/LDarurat_admin',addStaffAdminProfileDataToLocals,adminMiddleware,RoleMiddleware('Staff Administrasi'),  displayAllDaruratServices );
router.get('/LPelayananDetailDarurat_admin/:id_darurat', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'), displayAllDataDaruratById);
router.get('/rmdarurat_admin/:id_darurat', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'), ShowRMDById_admin);
router.get('/DetailrmDarurat_admin/:nomor_rmDarurat', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'), ShowDetailRMD_admin);
router.get('/LMedical_admin',addStaffAdminProfileDataToLocals,adminMiddleware,RoleMiddleware('Staff Administrasi'), getAllMedicalServices );
router.get('/LPelayananDetailMedical_admin/:id_medical', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'), getMedicalServicesById);
router.get('/rmMedical_admin/:id_medical', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'), ShowRMMedicalByIdforAdmin);
router.get('/DetailrmMedical_admin/:nomor_rmMedical', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'), ShowDetailRMMedicalforAdmin);
router.get('/LVaksin_admin',addStaffAdminProfileDataToLocals,adminMiddleware,RoleMiddleware('Staff Administrasi'),  getAllVaksinasiServices );
router.get('/LObat_Admin', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'), getAllObatServices);
router.get('/LObat_Admin_Detail/:id_pelayananobat' , addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'),  getObatServicesById);
router.get('/searchObat', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'), searchObatName);
router.get('/profilestaff_admin',addStaffAdminProfileDataToLocals,adminMiddleware,RoleMiddleware('Staff Administrasi'), (req, res) => {
    res.render('admin/profilestaff_admin', { title: 'Profile Staff', layout: 'layouts/main-layout-admin' });
});
router.get('/LPelayananDetail_admin/:id_vaksinasi', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'), getVaksinasiServiceDetailById);
router.get('/StokObat_admin',addStaffAdminProfileDataToLocals,adminMiddleware,RoleMiddleware('Staff Administrasi'), DisplayAllStockObat);
router.get('/StokObat_admin_details/:id_obat',addStaffAdminProfileDataToLocals,adminMiddleware,RoleMiddleware('Staff Administrasi'), DisplayStockObatById);
router.get('/StokVaksin_admin',addStaffAdminProfileDataToLocals,adminMiddleware,RoleMiddleware('Staff Administrasi'), getAlllDataVaccine );
router.get('/DetailStokVaksin_admin/:id_vaksin' ,addStaffAdminProfileDataToLocals,adminMiddleware,RoleMiddleware('Staff Administrasi'), getAllDataVaccineById  );
router.get('/LPerusahaan_admin',addStaffAdminProfileDataToLocals,adminMiddleware,RoleMiddleware('Staff Administrasi'), getPerusahaan );
router.get('/PerusahaanDetail_admin/:id_perusahaan',addStaffAdminProfileDataToLocals,adminMiddleware,RoleMiddleware('Staff Administrasi'),  getPerusahaanById );
router.get('/EditProfilPerusahaan_admin/:id_perusahaan',addStaffAdminProfileDataToLocals,adminMiddleware,RoleMiddleware('Staff Administrasi'), displayEditPerusahaan );
router.get('/TambahAPerusahaan_admin',addStaffAdminProfileDataToLocals,adminMiddleware, RoleMiddleware('Staff Administrasi'),(req, res) => {
    res.render('admin/TambahAPerusahaan_admin', { title: 'Tambah Akun Perusahaan', layout: 'layouts/main-layout-admin' });
});
router.get('/searchPerusahaan_admin',addStaffAdminProfileDataToLocals,adminMiddleware,RoleMiddleware('Staff Administrasi'), searchDataPerusahaanByname );
router.get('/ProyekP_admin/:id_perusahaan', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'), displayProyekPerusahaan);
router.get('/DetailProyekP_admin/:id_proyek', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'), getDetailProyekById);
router.get('/EditDetailProyekP_admin/:id_proyek',addStaffAdminProfileDataToLocals,adminMiddleware,RoleMiddleware('Staff Administrasi'), displayEditDetailProyekById );
router.get('/ReqProyekP_admin/:id_proyek_request',addStaffAdminProfileDataToLocals,adminMiddleware,RoleMiddleware('Staff Administrasi'),getProyekRequestsById );
router.get('/DetailPDokter_admin/:id_stafkesehatan',addStaffAdminProfileDataToLocals,adminMiddleware,RoleMiddleware('Staff Administrasi'), getDokterById);
router.get('/EditPDokter_admin/:id_stafkesehatan',addStaffAdminProfileDataToLocals,adminMiddleware, RoleMiddleware('Staff Administrasi'),  editDataDokter);
router.get('/searchDokter', searchDataDokter);
router.get('/EditPassPDokter_admin/:id_stafkesehatan',addStaffAdminProfileDataToLocals,adminMiddleware,RoleMiddleware('Staff Administrasi'), renderpassDokter );
router.get('/LDokter_admin',addStaffAdminProfileDataToLocals,adminMiddleware,RoleMiddleware('Staff Administrasi'), getDokter);
router.get('/TambahDokter_admin',addStaffAdminProfileDataToLocals,adminMiddleware,RoleMiddleware('Staff Administrasi'), (req, res) => {
    res.render('admin/TambahDokter_admin', { title: 'Tambah Dokter', layout: 'layouts/main-layout-admin' });
});
router.get('/LRs_admin',addStaffAdminProfileDataToLocals,adminMiddleware,RoleMiddleware('Staff Administrasi'), getRSadmin);
router.get('/DetailRS_admin/:id_rs', adminMiddleware, addStaffAdminProfileDataToLocals, RoleMiddleware('Staff Administrasi'), getRSadminById);
router.get('/EditDetailRS_admin/:id_rs',adminMiddleware,addStaffAdminProfileDataToLocals,RoleMiddleware('Staff Administrasi'), editRSadmin);
router.get('/TambahRS_admin',adminMiddleware,addStaffAdminProfileDataToLocals,RoleMiddleware('Staff Administrasi'), (req, res) => {
    res.render('admin/TambahRS_admin', { title: 'Tambah Rumah Sakit', layout: 'layouts/main-layout-admin' });
});
router.get('/searchRS', adminMiddleware, RoleMiddleware('Staff Administrasi'), searchRSadmin);
router.get('/rmvaksin_admin/:id_vaksinasi' ,addStaffAdminProfileDataToLocals,adminMiddleware,RoleMiddleware('Staff Administrasi'), ShowRMVById_admin);
router.get('/DetailrmVaksin_admin/:nomor_rmVaksinasi',addStaffAdminProfileDataToLocals,adminMiddleware,RoleMiddleware('Staff Administrasi'), ShowDetailRMV_admin);



// Kepala Admin
router.get('/index_Kadmin', KadminMiddleware, userKadminMiddleware, RoleMiddleware('Kepala Staf Administrasi'), renderIndexKadmin);
router.get('/profileKstaff_admin', KadminMiddleware,userKadminMiddleware, RoleMiddleware('Kepala Staf Administrasi'), getProfileKstaff);
router.get('/editPKstaff_admin', authMiddleware, KadminMiddleware,userKadminMiddleware, RoleMiddleware('Kepala Staf Administrasi'), editProfileKstaff);
router.get('/gantipass_Kadmin', authMiddleware, KadminMiddleware,userKadminMiddleware, RoleMiddleware('Kepala Staf Administrasi'), getGantiPassKadmin);
router.get('/tambahakun_Kadmin', authMiddleware, KadminMiddleware,userKadminMiddleware, RoleMiddleware('Kepala Staf Administrasi'), (req, res) => {
    res.render('Kadmin/tambahakun_Kadmin', { title: 'Tambah Akun', layout: 'layouts/main-layout-Kadmin' });
});
router.get('/detailStafAdmin/:id', authMiddleware, KadminMiddleware,userKadminMiddleware, RoleMiddleware('Kepala Staf Administrasi'), renderDetailStafAdmin); // Mengarahkan ke controller
router.get('/editDetailAkun/:id', authMiddleware, KadminMiddleware, userKadminMiddleware, RoleMiddleware('Kepala Staf Administrasi'), renderEditDetailAkun);
router.get('/gantiPassDetailAkun/:id', authMiddleware, KadminMiddleware, userKadminMiddleware, RoleMiddleware('Kepala Staf Administrasi'), renderpasswordAkun);








// Staff Dokter
router.get('/index_dokter', addStaffDokterProfileDataToLocals ,dokterMiddleware,RoleMiddleware('Staf Kesehatan'), getAllLayananDokter);
router.get('/LDarurat_dokter', addStaffDokterProfileDataToLocals,dokterMiddleware,RoleMiddleware('Staf Kesehatan'),  getAllLayananDaruratDokterByStaffId);
router.get('/LMedical_dokter', addStaffDokterProfileDataToLocals, dokterMiddleware,RoleMiddleware('Staf Kesehatan'), getAllLayananDokterByStaffIdMedical);
router.get('/LVaksin_dokter',addStaffDokterProfileDataToLocals, dokterMiddleware,RoleMiddleware('Staf Kesehatan'), getAllLayananVaksinByStaffId );
router.get('/profile_dokter',addStaffDokterProfileDataToLocals, dokterMiddleware,RoleMiddleware('Staf Kesehatan'), (req, res) => {
    res.render('dokter/profile_dokter', { title: 'Profile Dokter', layout: 'layouts/main-layouts-dokter' });
});
router.get('/LMedical_dokter_detail/:id_medical',addStaffDokterProfileDataToLocals, dokterMiddleware,RoleMiddleware('Staf Kesehatan'), MedicalDokterDetail);
router.get('/LDarurat_dokter_detail/:id_darurat',addStaffDokterProfileDataToLocals, dokterMiddleware,RoleMiddleware('Staf Kesehatan'),  DaruratDokterDetail );
router.get('/LVaksin_dokter_detail/:id_vaksinasi', addStaffDokterProfileDataToLocals, dokterMiddleware, RoleMiddleware('Staf Kesehatan'), VaksinDokterDetail);

router.get('/DataRekamMedis_medical_dokter/:id_medical', addStaffDokterProfileDataToLocals, dokterMiddleware, RoleMiddleware('Staf Kesehatan'), DataPesananRekamMedis);
router.get('/Tambah_DataRekamMedis_medical_dokter/:id_medical', addStaffDokterProfileDataToLocals, dokterMiddleware, RoleMiddleware('Staf Kesehatan'), NomorPesananRekamMedis);
router.get('/Detail_DataRekamMedis_medical_dokter/:nomor_rmMedical', addStaffDokterProfileDataToLocals, dokterMiddleware, RoleMiddleware('Staf Kesehatan'), DetailDataPesananRekamMedis);
router.get('/Edit_Detail_DataRekamMedis_medical_dokter', addStaffDokterProfileDataToLocals, dokterMiddleware, RoleMiddleware('Staf Kesehatan'), (req, res) => {
    res.render('dokter/Edit_Detail_DataRekamMedis_medical_dokter', { title: 'Data Rekam Medis', layout: 'layouts/main-layouts-dokter' });
});
router.get('/DataRekamMedis_vaksinasi_dokter/:id_vaksinasi', addStaffDokterProfileDataToLocals, dokterMiddleware, RoleMiddleware('Staf Kesehatan'), PesananVDetail);
router.get('/Tambah_DataRekamMedis_vaksinasi_dokter/:id_vaksinasi', addStaffDokterProfileDataToLocals, dokterMiddleware, RoleMiddleware('Staf Kesehatan'), NomorPesananRekamMedisV);
router.get('/Detail_DataRekamMedis_vaksinasi_dokter/:nomor_rmVaksinasi', addStaffDokterProfileDataToLocals, dokterMiddleware, RoleMiddleware('Staf Kesehatan'), ShowDetailRMV_dokter);
router.get('/Edit_Detail_DataRekamMedis_vaksinasi_dokter', addStaffDokterProfileDataToLocals, dokterMiddleware, RoleMiddleware('Staf Kesehatan'), (req, res) => {
    res.render('dokter/Edit_Detail_DataRekamMedis_vaksinasi_dokter', { title: 'Data Rekam Medis', layout: 'layouts/main-layouts-dokter' });
});
router.get('/DataRekamMedis_darurat_dokter/:id_darurat', addStaffDokterProfileDataToLocals, dokterMiddleware, RoleMiddleware('Staf Kesehatan'), PesananDDetail)
router.get('/Tambah_DataRekamMedis_darurat_dokter/:id_darurat', addStaffDokterProfileDataToLocals, dokterMiddleware, RoleMiddleware('Staf Kesehatan'), NomorPesananRekamMedisD);
router.get('/Detail_DataRekamMedis_darurat_dokter/:nomor_rmDarurat', addStaffDokterProfileDataToLocals, dokterMiddleware, RoleMiddleware('Staf Kesehatan'), ShowDetailRMD_dokter);
router.get('/Edit_Detail_DataRekamMedis_darurat_dokter', addStaffDokterProfileDataToLocals, dokterMiddleware, RoleMiddleware('Staf Kesehatan'), (req, res) => {
    res.render('dokter/Edit_Detail_DataRekamMedis_darurat_dokter', { title: 'Data Rekam Medis', layout: 'layouts/main-layouts-dokter' });
});


// CLIENT POST
router.post('/login_client', loginClientController.login);
router.post('/editprofile_client', authMiddleware, RoleMiddleware('Client'), upload.single('photo'), profileClientController.updateProfileClient);
router.post('/changepass_client', authMiddleware, RoleMiddleware('Client'), profileClientController.changePassword);
router.post('/tambahproyek_client', authMiddleware, RoleMiddleware('Client'), tambahProyekController.tambahProyekSementara);
router.post('/tambah-ke-keranjang', authMiddleware, KeranjangController.tambahKeKeranjang);
router.post('/hapus-dari-keranjang', authMiddleware, KeranjangController.hapusDariKeranjang);
router.post('/delete_temp_project', authMiddleware, RoleMiddleware('Client'), profileClientController.deleteTempProject);
router.post('/checkoutPembelianObat', authMiddleware, RoleMiddleware('Client'), addCompanyDataToLocals, ApotikController.checkoutPembelianObat);
router.post('/checkout', pembelianObatController.clearCartMiddleware, pembelianObatController.processCheckout);
router.post('/tempkonfirmMedical_client', authMiddleware, RoleMiddleware('Client'), addCompanyDataToLocals, LayananMedicalController.submitMedicalRequest);
router.post('/finalkonfirm_client', LayananMedicalController.finalKonfirmMedicalRequest);
router.post('/tempkonfirmVaksin_client', authMiddleware, RoleMiddleware('Client'), addCompanyDataToLocals, LayananVaksinController.submitVaccineRequest);
router.post('/finalkonfirmVaksin_client', LayananVaksinController.finalKonfirmasiVaksin);
router.post('/tempkonfirmDarurat_client', authMiddleware, RoleMiddleware('Client'), addCompanyDataToLocals, LayananDaruratController.submitEmergencyRequest);
router.post('/finalkonfirmDarurat_client', LayananDaruratController.finalKonfirmasiEmergency);
// ADMIN POST
router.post('/login_admin', StafAdminController.login);
router.post('/EditDetailRS_admin/:id_rs', adminMiddleware, addStaffAdminProfileDataToLocals, RoleMiddleware('Staff Administrasi'), upload.single('photo_rs'), updateRSadmin);
router.post('/TambahRS_admin', upload.single('photo_rs'), addRSadmin); // Add this line
router.delete('/DetailRS_admin/:id_rs', adminMiddleware, RoleMiddleware('Staff Administrasi'), deleteRSadmin);
router.post('/TambahDokter_admin', upload.single('photo_stafkesehatan'), addDataDokter);
router.post('/EditDetailDokter_admin/:id_stafkesehatan', adminMiddleware, addStaffAdminProfileDataToLocals, RoleMiddleware('Staff Administrasi'), upload.single('photo_stafkesehatan'), updateDataDokter);
router.delete('/DetailPDokter_admin/:id_stafkesehatan', adminMiddleware, RoleMiddleware('Staff Administrasi'), deleteDataDokter);
router.post('/updateDokterPassword/:id_stafkesehatan', adminMiddleware, RoleMiddleware('Staff Administrasi'), updatePasswordDoctor);
router.post('/acceptProyekRequest/:id_proyek_request', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'), acceptProyekRequest);
router.post('/rejectProyekRequest/:id_proyek_request', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'), rejectProyekRequest);
router.post('/tambahAkunPerusahaan', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'), upload.single('photo_perusahaan'), addDataPerusahaan);
router.post('/EditDataPerusahaan/:id_perusahaan', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'), upload.single('photo_perusahaan'),  EditDataPerusahaan);
router.delete('/deleteDataPerusahaanById/:id_perusahaan', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'), deleteDataPerusahaanById);
router.get('/searchProyek', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'), searchProyek);
router.post('/EditDetailProyekP_admin/:id_proyek', editDetailProyekByIds);
router.post('/tambahProyekP_admin', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'), tambahProyek);
router.delete('/deleteProyekP_admin/:id_proyek', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'), deleteProyekById);
router.post('/EditDetailStokVaksin_admin/:id_vaksin', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'), updateDataVaccine);
router.post('/tambahStokVaksin_admin', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'), tambahDataVaksin);
router.post('/LPelayananDetail_admin/:id_vaksinasi/update', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'), updateVaksinasiService);
router.post('/deleteVaccine/:id_vaksinasi', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'),  deleteVaccineServices);
router.post('/changestatusVaccine/:id_vaksinasi', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'),  updateStatusVaccineServices);
router.post('/LPelayananDaruratDetail_admin/:id_darurat/update', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'), UpdateDaruratServices);
router.post('/changeStatusDarurat/:id_darurat', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'),  updateStatusDaruratServices);
router.post('/deleteDarurat/:id_darurat', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'), deleteDaruratServices);
router.post('/LPelayananMedicalDetail_admin/:id_medical/update', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'), updateMedicalServices);
router.post('/changeStatusMedical/:id_medical', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'), updateStatusMedicalServices);
router.post('/deleteMedical/:id_medical', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'), deleteMedicalServices);
router.post('/LPelayananObatDetail_admin/:id_pelayananobat/update', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'), updateObatServices);
router.post('/changeStatusObat/:id_pelayananobat', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'), updateStatusObatServices);  
router.post('/deleteObat/:id_pelayananobat', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'), deleteObatServices);
router.post('/deleteDataVaksinById/:id_vaksin', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'), deleteDataVaksin);
router.post('/EditDataObat_admin/:id_obat', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'),upload.single('obat_photo'), editStockObatById);
router.post('/tambahDataObat_admin', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'), upload.single('obat_photo'), addDataObat);
router.post('/deleteStokObatById/:id_obat', addStaffAdminProfileDataToLocals, adminMiddleware, RoleMiddleware('Staff Administrasi'), deleteStokObat);
// DOKTER POST
router.post('/login_dokter', DokterController.login);
router.post('/Tambah_DataRekamMedis_medical_dokter', addStaffDokterProfileDataToLocals, dokterMiddleware, RoleMiddleware('Staf Kesehatan'), TambahDataRekamMedis);
router.post('/Tambah_DataRekamMedis_vaksinasi_dokter', addStaffDokterProfileDataToLocals, dokterMiddleware, RoleMiddleware('Staf Kesehatan'), TambahDataRekamMedisV);
router.post('/delete_DataRekamMedis/:nomor_rmMedical', dokterMiddleware, RoleMiddleware('Staf Kesehatan'), DeleteDataRekamMedis);
router.post('/deleteDataRMvaksin/:nomor_rmVaksinasi', dokterMiddleware, RoleMiddleware('Staf Kesehatan'), deleteDataRMvaksin);
router.post('/Tambah_DataRekamMedis_darurat_dokter', addStaffDokterProfileDataToLocals, dokterMiddleware, RoleMiddleware('Staf Kesehatan'), TambahDataRekamMedisD);
router.get('/searchRMVaksinasi', addStaffDokterProfileDataToLocals, dokterMiddleware, RoleMiddleware('Staf Kesehatan'), SearchRMVaksin);
router.get('/searchRMMedical', addStaffDokterProfileDataToLocals, dokterMiddleware, RoleMiddleware('Staf Kesehatan'), SearchRMMedical);
router.post('/deleteDataRMD/:nomor_rmDarurat', dokterMiddleware, RoleMiddleware('Staf Kesehatan'), deleteDataRMD);



// KEPALA ADMIN POST
router.post('/login_KepalaAdmin', KepalaAdminController.login);
router.post('/editPKstaff_admin', authMiddleware, KadminMiddleware, RoleMiddleware('Kepala Staf Administrasi'),uploadpic.single('photo_kstafadmin'), updateProfileKstaff);
router.post('/gantipass_Kadmin', authMiddleware, KadminMiddleware, RoleMiddleware('Kepala Staf Administrasi'), changePasswordKadmin);
router.post('/tambahakun_Kadmin', upload.single('photo_kstafadmin'), authMiddleware, KadminMiddleware, userKadminMiddleware, RoleMiddleware('Kepala Staf Administrasi'), tambahAkunStafAdmin);
router.post('/updateDetailAkun/:id', upload.single('photo_kstafadmin'),authMiddleware, KadminMiddleware, userKadminMiddleware, RoleMiddleware('Kepala Staf Administrasi'), updateDetailAkun);
router.post('/gantipass_stafadmin/:id', authMiddleware, KadminMiddleware, userKadminMiddleware, RoleMiddleware('Kepala Staf Administrasi'), updatePassword);
router.delete('/deleteStafAdmin/:id', authMiddleware, KadminMiddleware, userKadminMiddleware, RoleMiddleware('Kepala Staf Administrasi'), deletestaffAdmin);



// DELETE CLIENT
module.exports = router;



