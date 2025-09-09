-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 09, 2025 at 02:21 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pearlmedic`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_admin`
--

CREATE TABLE `tb_admin` (
  `id_admin` bigint(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `nama` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_admin`
--

INSERT INTO `tb_admin` (`id_admin`, `username`, `password`, `nama`) VALUES
(1, 'admin', 'admin', 'Abiel');

-- --------------------------------------------------------

--
-- Table structure for table `tb_darurat`
--

CREATE TABLE `tb_darurat` (
  `id_darurat` bigint(11) NOT NULL,
  `id` bigint(11) NOT NULL,
  `lokasi` varchar(100) NOT NULL,
  `rs_tujuan` varchar(50) NOT NULL,
  `deskripsi` varchar(200) NOT NULL,
  `jumlah` bigint(11) NOT NULL,
  `tanggal_pelaporan` date NOT NULL,
  `tambahan` varchar(1000) DEFAULT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_darurat`
--

INSERT INTO `tb_darurat` (`id_darurat`, `id`, `lokasi`, `rs_tujuan`, `deskripsi`, `jumlah`, `tanggal_pelaporan`, `tambahan`, `status`) VALUES
(1, 1, 'Tambang A, kecamatan Subang', 'RS Tegalrejo', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam', 1, '2023-01-04', '', 3),
(2, 3, 'Kecamatan B, Sulawesi Selatan', 'RS Siloam', 'Dibutuhkan Medis segera', 2, '2023-01-05', '', 1),
(3, 1, 'Jakarta', 'Dipilih oleh pearl medic', 'Kecelakaan Darurat', 1, '2023-01-24', '                            Kecelakaan Parah', 1),
(4, 1, 'Jakarta Utara', 'Dipilih oleh pearl medic', 'Kecelakaan Kerja', 2, '2023-01-24', '                            Gawat', 1),
(5, 1, 'Tambang', 'Dipilih oleh pearl medic', 'Kecelakaan karyawan', 1, '2023-02-19', '                            Kecelakaan luka berat', 0),
(6, 3, 'Cimahi Mall, Kota Cimahi', 'Rumah sakit Mitra kasih', 'Bangunan Roboh', 30, '2023-03-15', '                            Kejadian ini terjadi hari senin baru-baru ini sekitar 30 orang tertimpa bangunan, mohon bantuannya', 0),
(7, 3, 'Bec, bandung electronic center', 'RS Hasan Sadikin', 'Gedung terbakar', 20, '2023-03-15', '                            Gedung terbakar, korban butuh bantuan alat pernapasan', 0),
(8, 3, 'Bec, bandung electronic center', 'RS Hasan Sadikin', 'Gedung terbakar', 15, '2023-03-15', '                            membutuhkan alat bantu pernapasan', 0),
(9, 1, 'jl Siratalmustakim no 12', 'Dipilih oleh pearl medic', 'Karyawan Pingsan di kantor', 12, '2023-06-25', '                            butuh ambulans dll', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tb_isi`
--

CREATE TABLE `tb_isi` (
  `id_keranjang` int(11) NOT NULL,
  `id_obat` int(11) DEFAULT NULL,
  `nama_obat` varchar(255) NOT NULL,
  `jumlah` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_isi`
--

INSERT INTO `tb_isi` (`id_keranjang`, `id_obat`, `nama_obat`, `jumlah`) VALUES
(1, 172, '[08j-00002] SANPRIMA TABLET', 30),
(2, 1, '[1.20E-23] CAVIPLEX TABLET', 23),
(2, 3, '[12b-00007] BECOM ZET CPL', 10),
(2, 12, '[04k-00025] SANMOL 500 MG TAB', 10),
(3, 3, '[12b-00007] BECOM ZET CPL', 11),
(4, 67, '[08p-00012] ACYCLOVIR 400 MG', 20),
(4, 73, '[2.00E-08] NIFEDIPIN 10 MG', 11),
(7, 11, '[03c-00073] PARATUSIN TAB', 12),
(7, 8, '[01a-00004] PLANTACID FORTE TB', 12),
(8, 1, '[1.20E-23] CAVIPLEX TABLET', 2);

-- --------------------------------------------------------

--
-- Table structure for table `tb_keranjang`
--

CREATE TABLE `tb_keranjang` (
  `id_keranjang` bigint(11) NOT NULL,
  `id` bigint(11) NOT NULL,
  `alamat` varchar(100) DEFAULT NULL,
  `tanggal_order` date DEFAULT NULL,
  `tanggal_pengiriman` date DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_keranjang`
--

INSERT INTO `tb_keranjang` (`id_keranjang`, `id`, `alamat`, `tanggal_order`, `tanggal_pengiriman`, `status`) VALUES
(1, 1, 'Jl. Raya 2', '2023-01-29', NULL, 4),
(2, 3, 'Jl. Soekarna Hatta', '2023-01-29', '2023-02-05', 3),
(3, 1, 'Jl. ABC', '2023-01-29', '2023-02-02', 1),
(4, 1, 'Jalan Dr. Soetomo 1', '2023-02-18', NULL, 1),
(6, 3, NULL, NULL, NULL, 0),
(7, 1, 'Jl Raqid atid no 13', '2023-06-25', NULL, 2),
(8, 1, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tb_medical`
--

CREATE TABLE `tb_medical` (
  `id_checkup` bigint(11) NOT NULL,
  `id` bigint(11) NOT NULL,
  `tanggal_pelaksanaan` date NOT NULL,
  `lokasi` varchar(100) NOT NULL,
  `jumlah` int(5) NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_medical`
--

INSERT INTO `tb_medical` (`id_checkup`, `id`, `tanggal_pelaksanaan`, `lokasi`, `jumlah`, `status`) VALUES
(1, 2, '2023-01-10', 'Kalimantan Selatan', 200, 1),
(2, 1, '2023-01-02', 'Riau', 100, 1),
(3, 3, '2022-12-07', 'Jakarta Timur', 10, 2),
(5, 1, '2023-01-27', 'Sumatra utara', 26, 2),
(6, 1, '2023-02-03', 'Bandung', 69, 2),
(7, 1, '2023-02-15', 'Jakarta', 200, 2),
(8, 1, '2023-03-03', 'Kalimantan Timur', 40, 2),
(9, 1, '2023-03-23', 'universitas diponegoro', 212, 2),
(10, 1, '2023-03-16', 'jl soekarno hatta, semarang', 300, 2),
(11, 1, '2023-06-26', 'jl namrud no 12', 12, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tb_obat`
--

CREATE TABLE `tb_obat` (
  `id_obat` int(11) NOT NULL,
  `nama_obat` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_obat`
--

INSERT INTO `tb_obat` (`id_obat`, `nama_obat`) VALUES
(1, '[1.20E-23] CAVIPLEX TABLET'),
(2, '[12a-00013] THERAGRAN-M'),
(3, '[12b-00007] BECOM ZET CPL'),
(4, '[12b-00011] NEUROBION 250 MCG TAB'),
(5, '[12c-00021] CA D REDOXON (CDR) EFF 10TB'),
(6, '[12h-00003] SANGOBION CPS'),
(7, '[13f-00011] IMUNOS CPL'),
(8, '[01a-00004] PLANTACID FORTE TB'),
(9, '[01a-00006] POLYSILANE TAB'),
(10, '[01d-00008] NEW DIATABS TAB'),
(11, '[03c-00073] PARATUSIN TAB'),
(12, '[04k-00025] SANMOL 500 MG TAB'),
(13, '[04k-00028] SUMAGESIC TAB'),
(14, '[04l-00028] BODREX TAB'),
(15, '[1.00E-11] DULCOLAX TAB (10)'),
(16, '[03c-00128] LASERIN MADU 60 ML'),
(17, '[04k-00017] PRORIS SUSP 60ML'),
(18, '[16m-00005] THROMBOPHOB GEL 20 G'),
(19, 'MEDIFLEX CR 30 GR'),
(20, '[01a-00042] RHINOS JUNIOR SYR 60ML'),
(21, '[03c-00001] BISOLVON DRP (SOL) 50ML'),
(22, '[03c-00015] NEOZEP FORTE TAB'),
(23, '[03c-00018] PANADOL EXTRA CPL'),
(24, '[03c-00028] DEGIROL TB'),
(25, '[03c-00055] NELLCO SPECIAL OBH 100ML'),
(26, '[03c-00137] OBH IKA 200 ML'),
(27, '[01a-00012] MYLANTA LIQD 150ML'),
(28, '[01i-00020] ANTIMO 50 MG TAB'),
(29, '[08s-00001] COMBANTRIN SUSP ORNG 10ML'),
(30, '[22a-00072] BYE BYE FEVER FOR BABIES'),
(31, '[22a-00073] BYE BYE FEVER K. DEMAM ANAK'),
(32, '[24-00002] SALONPAS HOT @10S'),
(33, '[24-00003] SALONPAS KOYO 10S'),
(34, '[24-00008] VICKS VAPORUB 10G'),
(35, '[24-00033] TAWON M GOSOK EE 60ML'),
(36, '[22b-00014] DUREX EXTRA SAVE 3S'),
(37, '[1.50E+00] BETADINE GARG 190ML'),
(38, '[16g-00004] CALADINE POWDER 60 GR'),
(39, '[16k-00015] HANSAPLAST STRIP ( 2637 )'),
(40, '[22a-00034] EASY TOUCH GLUCOSE STRIP'),
(41, '[22a-00058] KASA HYDROFIL STERIL HUSADA'),
(42, '[22a-00059] KAPAS PEMBALUT 25 G'),
(43, '[22a-00171] KASA GULUNG 10 CM ISI 5'),
(44, '[22a-00374] HUKI COTTON BUDS DEWASA ISI 100'),
(45, '[22c-00006] OPPO KNEE SUPPORT XL 1021'),
(46, '[22c-00157] GELAS CUCI MATA'),
(47, '[04a-00005] VALISANBE INJ 10 mg/ 2 ml'),
(48, '[04a-00013] STESOLID 5 MG TAB'),
(49, '[04a-00015] VALISANBE 5 MG TABLET'),
(50, '[04j-00012] PETHIDIN INJ'),
(51, '[01a-00026] OMEPRAZOLE 20 MG CAP'),
(52, '[01a-00034] LANSOPRAZOLE 30 MG TAB'),
(53, '[02d-00004] BISOPROLOL 5MG TAB'),
(54, '[02i-00001] HCT 25 MG TAB'),
(55, '[02l-00004] SIMVASTATIN 20 MG'),
(56, '[02l-00005] SIMVASTATIN 10 MG'),
(57, '[02l-00007] ATORVASTATIN 20 MG'),
(58, '[02l-00025] CLINDAMYCIN 300 MG CAP'),
(59, '[03b-00024] SALBUTAMOL 2 MG TABLET'),
(60, '[04k-00029] ASAM MEFENAMAT 500MG TAB'),
(61, '[04l-00008] PIROXICAM 10 MG CAP'),
(62, '[05b-00002] ALLOPURINOL 300 MG TAB'),
(63, '[05b-00003] ALLOPURINOL 100 MG'),
(64, '[06i-00006] DOMPERIDON TAB'),
(65, '[08c-00006] AMOXICILLIN 500 MG TABLET'),
(66, '[08k-00001] METRONIDAZOLE 500 MG TAB'),
(67, '[08p-00012] ACYCLOVIR 400 MG'),
(68, '[11b-00009] METFORMIN 500 MG TAB'),
(69, '[1.20E-04] ZINC DISPERSIBLE TAB'),
(70, '[18a-00024] CETIRIZINE 10MG TABLET'),
(71, '[2.00E-01] AMLODIPINE 10MG TAB'),
(72, '[2.00E-05] AMLODIPINE 5 MG CAP'),
(73, '[2.00E-08] NIFEDIPIN 10 MG'),
(74, '[01a-00065] LANCID 30 MG TABLET'),
(75, '[01d-00009] LODIA 2 MG TAB'),
(76, '[01i-00003] VOMETA FT 10 MG TAB'),
(77, '[02a-00038] CEDOCARD 5 MG TAB'),
(78, '[02d-00008] CONCOR 2.5 MG TABLET'),
(79, '[02f-00003] BLOPRESS TAB 8 MG'),
(80, '[02f-00006] CO DIOVAN 80/12.5 MG TAB'),
(81, '[02n-00002] THROMBO ASPILETS TAB'),
(82, '[02n-00005] ASCARDIA 80 MG TAB'),
(83, '[02n-00023] XARELTO 20 MG TABLET'),
(84, '[02s-00005] CEDOCARD 10 MG TAB'),
(85, '[03c-00030] MUCOPECT 30MG TB'),
(86, '[03c-00074] PONSTAN FCT TAB 500 MG CPL'),
(87, '[03c-00134] LAPIFED TABLET'),
(88, '[04l-00004] CATAFLAM 50MG TB'),
(89, '[04l-00005] NEURALGIN RX CPL'),
(90, '[04l-00009] CATAFLAM 25 MG TAB'),
(91, '[04l-00024] FLAMAR 50 MG TAB'),
(92, '[05c-00002] MYONAL TAB'),
(93, '[06b-00002] PRIMOLUT N 5MG TB'),
(94, '[06d-00001] CORTIDEX 0,5MG TB'),
(95, '[06d-00014] LAMESON 8 TAB'),
(96, '[08c-00003] AMOXSAN 500MG CPS'),
(97, '[18a-00001] INCIDAL OD CPS'),
(98, '[18a-00003] DEXTAMINE 2,5MG TB'),
(99, '[18a-00004] INTERHISTIN 50_MG TB'),
(100, '[18a-00017] RHINOS SR CAPS'),
(101, '[18a-00039] ALLERON 4 MG TABLET'),
(102, 'CO-AMOXICLAV TAB 500 MG'),
(103, 'N'),
(104, '[14b-00003] CENDO XITROL ED 5 ML'),
(105, '[1.60E-02] CINOLON CREAM'),
(106, '[16b-00014] SCABIMITE CR 10 G'),
(107, 'DECODERM 10 GR CREAM'),
(108, '[02k-00006] ATROPINE SULFAT 0.25MG/ML INJEKSI'),
(109, '[22a-00224] TERUMO NGT FR NO 16'),
(110, '[22a-00228] TERUMO NEEDLE 21 G'),
(111, '[22a-00392] CATGUT PLAIN 2/0'),
(112, '[22c-00076] SCALPEL BLADE NO. 10 SS'),
(113, '[22c-00153] CHROMIC CAT GUT NO. 2.0'),
(114, '[30-00001] OTSU WATER FOR INJ 25 ML'),
(115, '[01a-00001] OMZ 20_MG CPS'),
(116, '[01a-00002] NEOSANMAG FAST TAB'),
(117, '[01a-00018] POLYSILANE SUSP 100 ML'),
(118, '[01a-00019] RANITIDINE 150 MG TAB'),
(119, '[01a-00035] INPEPSA 100 ML'),
(120, '[01a-00055] RANITIDINE INJ'),
(121, '[01a-00068] PANTOZOL 40 MG TABLET'),
(122, '[01a-00071] INPEPSA 200 ML'),
(123, '[01c-00006] BUSCOPAN INJEKSI'),
(124, '[01d-00014] NEO DIAFORM TB'),
(125, '[01g-00003] PHARMATON VIT TAB'),
(126, '[01h-00001] AMBEVEN CPS'),
(127, '[01i-00005] ANTIMO ANAK SAC'),
(128, '[01i-00012] TRADOSIK INJ'),
(129, '[02d-00005] FARNORMIN TABLET'),
(130, '[02g-00006] NEBILET 5 MG TABLET'),
(131, '[02k-00009] PEHACAIN INJEKSI 2ML'),
(132, '[02l-00038] CRESTOR 20 MG TABLET'),
(133, '[02m-00007] ADONA (AC-17) 10ML INJ'),
(134, '[02n-00014] CARDIO ASPIRIN TAB'),
(135, '[02n-00022] SIMARC 2 TABLET'),
(136, '[039-00001] HYDROGEN PEROXIDE 3% 1 L'),
(137, '[03b-00008] TEOSAL TAB'),
(138, '[03c-00013] FLUDEXIN TB'),
(139, '[03c-00021] TUZALOS CPL'),
(140, '[03c-00047] COMBIPHAR OBH BERDAHAK MENTHOL 100ML'),
(141, '[03c-00081] SANADRYL DMP SYR 120 ML'),
(142, '[03c-00088] WOODS ATT SYR 100 ML'),
(143, '[03c-00112] SANADRYL EXP 120 ML'),
(144, '[03c-00119] AMBROXOL 30MG TABLET'),
(145, '[04a-00008] STESOLID RECTAL TUBE 5MG/2.5 ML'),
(146, '[04a-00011] VALISANBE 2 MG TAB'),
(147, '[04d-00002] BRAXIDIN TB *'),
(148, '[04i-00004] MERISLON 6 MG TAB'),
(149, '[04i-00006] CENDO FLOXA MD 5S'),
(150, '[04i-00009] OPTIMAX TABLET'),
(151, '[04j-00007] TRADOSIK CAP'),
(152, '[04j-00016] CODEIN 10_MG TB'),
(153, '[04k-00004] TEMPRA DROP 15ML'),
(154, '[04k-00008] PANADOL 500MG CPL'),
(155, '[04k-00018] PRORIS SUSP FORTE 50ML'),
(156, '[04K-00026] TEMPRA SYR 60 ML NEW'),
(157, '[04k-00040] SANMOL DROP'),
(158, '[04l-00058] ARCOXIA 90 MG TAB'),
(159, '[04l-00063] IREMAX TABLET'),
(160, '[04l-00067] VOLTAREN EC TAB 50 MG'),
(161, '[04p-00003] BRAINACT INJEKSI'),
(162, '[05b-00005] ZYLORIC 300 MG TAB'),
(163, '[05c-00004] ZITANID TABLET'),
(164, '[05f-00006] WELMOVE STRIP'),
(165, '[06d-00015] METHYLPREDNISOLON 4 MG TAB'),
(166, '[06d-00022] DEXA HARSEN 0.5 MG'),
(167, '[08b-00001] CEFAT 500_MG CPS'),
(168, '[08b-00020] CEFIXIME 200 MG CAPS'),
(169, '[08f-00002] ERYSANBE 500MG CPL'),
(170, '[08g-00001] BAQUINOR 500_MG CPL'),
(171, '[08g-00003] CIPROFLOXACIN 500 MG TAB'),
(172, '[08j-00002] SANPRIMA TABLET'),
(173, '[08n-00013] DIFLUCAN 150 MG TAB'),
(174, '[08n-00033] KANAMYCIN INJEKSI'),
(175, '[1.00E-08] DULCOLAX TAB ISI 4'),
(176, '[11b-00008] GLUCOVANCE 500MG/5MG'),
(177, '[11b-00011] AMARYL 2 MG TAB'),
(178, '[11b-00032] FORXIGA 10 MG TABLET'),
(179, '[11c-00003] EUTHYROX 100 MCG TAB'),
(180, '[1.20E-02] ZEGAVIT CPL'),
(181, '[12a-00004] HEMAVITON ACTION CAP'),
(182, '[12a-00018] CAVIT D3 TAB'),
(183, '[12a-00022] VIT B COMP IPI'),
(184, '[12b-00002] ENERVON C CPL'),
(185, '[12b-00012] NEUROBION FORTE 5000 TAB'),
(186, '[12b-00013] ENERVON C PLUS SYR 120ML'),
(187, '[12c-00004] VITALONG C CPS'),
(188, '[12c-00006] REDOXON EFF DOUBLE ACTION 10TB'),
(189, '[12c-00026] VITALONG C ISI 30 CAP'),
(190, '[12c-00029] VITACIMIN ORANGE TABLET'),
(191, '[13f-00024] FORMUNO TAB'),
(192, '[13f-00027] IMBOOST FORCE SYR 60 ML'),
(193, '[13f-00032] IMBOOST FORCE TAB'),
(194, '[14a-00017] CENDO LYTEERS 15 ML'),
(195, '[14a-00024] CENDO PROTAGENTA MD'),
(196, '[14g-00005] INSTO 7.5 ML'),
(197, '[1.50E-14] KENALOG IN ORABASE'),
(198, '[1.50E-16] LISTERINE ORIGINAL 80 ML'),
(199, '[15b-00002] OTOPAIN EAR DROPS 8 ML'),
(200, '[15e-00008] FG TROCHES TAB'),
(201, '[1.60E-07] CHLORAMFECORT CR'),
(202, '[1.60E-11] ELOCON CREAM 10 GR'),
(203, '[1.60E-16] DIPROGENTA CREAM 10 GR'),
(204, '[16a-00004] BIOPLACENTON YELLY 15 GR'),
(205, '[16a-00021] GENTAMICIN 0.1% 5GR CREAM'),
(206, '[16b-00001] KALPANAX K CREAM 5G'),
(207, '[16d-00004] BENOSON G CREAM 10 GR'),
(208, '[16g-00001] CALADINE LOTION 95ML'),
(209, '[16g-00002] CALADINE POWDER 100G'),
(210, '[16k-00013] BETADINE SOL 15ML'),
(211, '[18a-00030] DEXIGEN CREAM 5GR'),
(212, '[2.00E-03] NORVASK 10MG TB'),
(213, '[2.00E-17] TRUVAZ 20 MG TABLET'),
(214, '[22a-00010] AKURAT TEST KEHAMILAN'),
(215, '[22a-00035] EASY TOUCH URIC ACID TOUCH'),
(216, '[22a-00036] EASY TOUCH CHOLESTEROL STRIP'),
(217, '[22a-00067] STERIMAR SPRAY DWS'),
(218, '[22a-00135] CPR POCKET MASK'),
(219, '[22a-00138] DRUG TEST 5 PARAMETER'),
(220, '[22a-00160] BODY BAG'),
(221, '[22a-00256] TERUMO SYRINGE 5 ML'),
(222, '[22a-00257] LEUKOMED IV FILM 6X8 CM'),
(223, '[22a-00276] MITELLA'),
(224, '[22a-00338] ALCOHOL SWAB'),
(225, '[22a-00356] BASIC DRESSING SET'),
(226, '[22b-00016] DUREX LOVE 3S'),
(227, '[22c-00038] URINE POT CONTAINER 30ML'),
(228, '[22c-00088] CHROMIC CAT GUT NO. 3.0'),
(229, '[22c-00099] SURFLO CATHETER 18 G'),
(230, '[22c-00104] SURFLO CATHETER 16 G'),
(231, '[22c-00116] TERUMO 3 WAY STOP COCK'),
(232, '[22c-00129] SCISSOR'),
(233, '[23-00007] Hour(s)U TOLAK ANGIN+MADU SACH'),
(234, '[24-00012] COUNTERPAIN CR 60G'),
(235, '[24-00016] VOLTAREN GEL 20G'),
(236, '[24-00026] LANG MKP 30ML'),
(237, '[24-00101] VOLTAREN GEL 50 GR'),
(238, '[24-00109] COUNTERPAIN 120 GR'),
(239, '[30-00002] OTSU WATER FOR INJ 1000 ML'),
(240, 'ACETYLCYSTEINE 200 MG KAP'),
(241, 'AMUNIZER DUS'),
(242, 'AVIGAN 200 MG TABLET'),
(243, 'BEJO ANAK JAHE MERAH 12\''),
(244, 'BEJO JAHE MERAH DEWASA 12\'S'),
(245, 'CALDECE EFFERVESCENT 10\'S'),
(246, 'CALNIC PLUS SYR 100ML'),
(247, 'CEREBROFORT GOLD ORANGE 100ML'),
(248, 'COLLAR NECK MERK GEA'),
(249, 'COUNTERPAIN COOL 60 GR'),
(250, 'DETTOL LIQUID 750 ML'),
(251, 'DOPAMINE INJ 200MG/5ML'),
(252, 'DUPHASTON TABLET'),
(253, 'ENTROSTOP HERBAL DEWASA 15ML'),
(254, 'FENTANYL 0.05 MG/ML 2 ML INJ'),
(255, 'FLASHLIGHT C/W BATTERY'),
(256, 'FORGESIC INJEKSI'),
(257, 'FORMULA CONFIDENT 160 GR'),
(258, 'GILLETTE GOAL BLUE'),
(259, 'HANSAPLAST TRANSPARAN 10\'S'),
(260, 'HEVIT-C TAB'),
(261, 'HI-D 5000 IU'),
(262, 'HUFAXICAM 15 MG TAB'),
(263, 'IBUPROFEN 200 MG TAB'),
(264, 'IMBOOST KIDS SYRUP 60 ML'),
(265, 'INTERLAC PRO-D LOZENGERS'),
(266, 'KACAMATA PEMBESAR'),
(267, 'KONDOM SUTRA GERIGI @ 3'),
(268, 'KONDOM SUTRA SUPREME PERFORMAX @ 3'),
(269, 'LACTACYD ODOR FRESH 60 ML'),
(270, 'LOPROLOL 100 MG TABLET'),
(271, 'MAGNIFYING LAMP LT-86C 5 DIOPTER'),
(272, 'MALTOFER CHEW TAB'),
(273, 'METAMIDON INJEKSI 10 ML'),
(274, 'MODALIM 100 MG TAB'),
(275, 'MOXIC 7.5 MG TAB'),
(276, 'MUCOSTA TABLET'),
(277, 'MYCODERM KRIM'),
(278, 'NATUR E 300 IU CAP 32\'S'),
(279, 'NATUR E NOURISHING 300 IU ISI 16'),
(280, 'NEXIUM 20 MG TAB'),
(281, 'NIPE EXPECTORANT ADULT 60 ML'),
(282, 'PAKET STERILE SCALPLE'),
(283, 'PARIET 10 MG TABLET'),
(284, 'PEMBALUT CEPAT NO 4'),
(285, 'PINSET / TWEEZERS'),
(286, 'POLYCROL TABLET'),
(287, 'PRORIS TRIPLE ACTION KAPL'),
(288, 'RIFAMPICIN 600 MG TAB'),
(289, 'ROHTO V EXTRA 7 ML'),
(290, 'SALONPAS GEL 30 GR'),
(291, 'SALONPAS LARGE 2S'),
(292, 'SARIDON EXTRA 10\'S'),
(293, 'SENSIPAD DISPOSABLE UNDERPAD 60X90 CM ISI 10 PCS'),
(294, 'SOS HAND SANITIZER 60 ML'),
(295, 'TEMPRA SYRUP 30 ML'),
(296, 'TERUMO NEEDLE 18G'),
(297, 'THERMOMETER DIGITAL MICROLIFE MT200'),
(298, 'VAKSIN BIO TT'),
(299, 'VARDIPIN 5/80 MG'),
(300, 'VENTOLIN EXPECT SYR'),
(301, 'VICKS FORMULA JAHE MADU 28 ML');

-- --------------------------------------------------------

--
-- Table structure for table `tb_ordervaksin`
--

CREATE TABLE `tb_ordervaksin` (
  `id_ordervaksin` bigint(11) NOT NULL,
  `id` bigint(11) NOT NULL,
  `lokasi` varchar(100) NOT NULL,
  `jumlah` int(9) NOT NULL,
  `tanggal_pelaksanaan` date NOT NULL,
  `nama_vaksin` varchar(30) NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_ordervaksin`
--

INSERT INTO `tb_ordervaksin` (`id_ordervaksin`, `id`, `lokasi`, `jumlah`, `tanggal_pelaksanaan`, `nama_vaksin`, `status`) VALUES
(1, 1, 'Jakarta', 14, '2023-01-19', 'Synflorif', 0),
(2, 1, 'Jakarta', 20, '2023-01-27', 'COVID-19', 1),
(3, 3, 'Papua', 200, '2023-02-03', 'Tetanus', 0),
(4, 1, 'Bandung', 20, '2023-03-03', 'Flu Shot', 0),
(5, 3, 'Jl Buah batu Bandung', 200, '2023-03-19', 'Campak', 0),
(6, 3, 'jl. soeharto Raya 5, Cepu', 250, '2023-03-25', 'Tetract HIB', 0),
(7, 3, 'jl soekarno hatta, bandung', 250, '2023-03-29', 'BCG', 0),
(8, 1, 'Jl Sulaiman no 12', 12, '2023-06-30', 'Covid-19 Booster', 0),
(9, 1, 'jl namrud no 12', 12, '2024-05-18', 'Okavax', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tb_perusahaan`
--

CREATE TABLE `tb_perusahaan` (
  `id` bigint(11) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(25) NOT NULL,
  `nama_perusahaan` varchar(40) NOT NULL,
  `bidang` varchar(14) NOT NULL,
  `alamat` varchar(100) NOT NULL,
  `no_telp` varchar(20) DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT 1,
  `deskripsi` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_perusahaan`
--

INSERT INTO `tb_perusahaan` (`id`, `email`, `password`, `nama_perusahaan`, `bidang`, `alamat`, `no_telp`, `status`, `deskripsi`) VALUES
(1, 'petronas@mail.com', 'password', 'Petronas Nasional', 'Tambang/Minyak', 'Jl. Tanjang Barat, Jakarta Utara', '08113347374', 1, 'Perusahaan minyak asal Malaysia, yang memiliki cabang di indonesia'),
(2, 'sigurros@mail.com', 'password', 'PT Sigur Ros Oil', 'Tambang/Minyak', 'JL. B', NULL, 2, 'Lorem Ipsum'),
(3, 'caleus@gmail.com', 'password', 'PT Caleus Energi', 'Energi', 'Tower A', '0811123456', 1, 'Perusahaan Energi'),
(4, 'PerusahaanA@gmail.com', '', 'Perusahaan A', 'Kesehatan', 'JL. A, Jakarta pusat', '08123432134', 1, 'Test');

-- --------------------------------------------------------

--
-- Table structure for table `tb_vaksin`
--

CREATE TABLE `tb_vaksin` (
  `id_vaksin` bigint(11) NOT NULL,
  `nama_vaksin` varchar(30) NOT NULL,
  `deskripsi_vaksin` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_vaksin`
--

INSERT INTO `tb_vaksin` (`id_vaksin`, `nama_vaksin`, `deskripsi_vaksin`) VALUES
(1, 'Rotarix', 'Mencegah diare karena?rotavorus'),
(2, 'Synflorif', 'Mencegah infeksi pnemokokus IPD'),
(3, 'Infanrif HIB (DPaT-HiB)', 'Mencegah infeksi difteri, Tetanus dan pertusis?tanpa demam'),
(4, 'HIB', 'Mencegah infeksi Otak hemofilus Influenza'),
(5, 'Havrix', 'Mencegah infeksi hepatitis A'),
(6, 'Avaxim', 'Mencegah infeksi hepatitis A'),
(7, 'Avaxim', 'Mencegah infeksi hepatitis A'),
(8, 'Varilrix', 'Mencegah infeksi varicela-cacar ? air'),
(9, 'Engerix B', 'Mencegah infeksi Hepatitis B'),
(10, 'HB Vax', 'Mencegah infeksi Hepatitis B'),
(11, 'Infanrix', 'Mencegah infeksi difteri, Tetanus, Polio dan pertusis tanpa demam'),
(12, 'Okavax', 'Mencegah infeksiVaricella-cacar air'),
(13, 'Polio', 'Mencegah infeksi?polio'),
(14, 'Pediacel', 'Mencegah infeksi difteri, Tetanus, Polio dan pertusis tanpa demam'),
(15, 'Synflorix', 'vaksin Pneumokokus 10 strain'),
(16, 'Prevenar', 'vaksin Pneumokokus 13 strain'),
(17, 'Tetract HIB', 'Mencegah infeksi difteri, Tetanus, Polio dan pertusis HiB demam'),
(19, 'BCG', 'Mencegah infeksi BCG'),
(20, 'Campak', 'Mencegah infeksi Campak'),
(21, 'DPT', 'Mencegah infeksi difteri, Tetanus, Polio dan pertusis demam'),
(22, 'DT', 'Mencegah infeksi difteri, Tetanus'),
(23, 'Tetanus', 'Mencegah infeksi Tetanus'),
(24, 'DPT HB', 'Mencegah infeksi difteri, Tetanus, Polio dan pertusis Hepatitis B'),
(25, 'Act HIB', 'Mencegah infeksi otak HiB'),
(26, 'Trimovax', 'Mencegah infeksi Gondong Campak Rubela (campak Jerman)'),
(27, 'MMR II', 'Mencegah infeksi Gondong Campak Rubela (campak Jerman)'),
(28, 'Euvax B', 'Mencegah infeksi Hepatitis B'),
(29, 'Vaxigrip', 'Mencegah infeksi influenza'),
(30, 'Vaxigrip', 'Mencegah infeksi Influenza'),
(31, 'Typhim', 'Mencegah infeksi tifus'),
(32, 'Typherix', 'Mencegah infeksi Tifus'),
(33, 'Pedvax', 'Mencegah infeksi'),
(34, 'Infanrif HIB IPV', 'Mencegah infeksi difteri, Tetanus, Polio?dan pertusis tanpa demam');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_admin`
--
ALTER TABLE `tb_admin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indexes for table `tb_darurat`
--
ALTER TABLE `tb_darurat`
  ADD PRIMARY KEY (`id_darurat`);

--
-- Indexes for table `tb_keranjang`
--
ALTER TABLE `tb_keranjang`
  ADD PRIMARY KEY (`id_keranjang`);

--
-- Indexes for table `tb_medical`
--
ALTER TABLE `tb_medical`
  ADD PRIMARY KEY (`id_checkup`);

--
-- Indexes for table `tb_obat`
--
ALTER TABLE `tb_obat`
  ADD PRIMARY KEY (`id_obat`);

--
-- Indexes for table `tb_ordervaksin`
--
ALTER TABLE `tb_ordervaksin`
  ADD PRIMARY KEY (`id_ordervaksin`);

--
-- Indexes for table `tb_perusahaan`
--
ALTER TABLE `tb_perusahaan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_vaksin`
--
ALTER TABLE `tb_vaksin`
  ADD PRIMARY KEY (`id_vaksin`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_darurat`
--
ALTER TABLE `tb_darurat`
  MODIFY `id_darurat` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tb_keranjang`
--
ALTER TABLE `tb_keranjang`
  MODIFY `id_keranjang` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tb_medical`
--
ALTER TABLE `tb_medical`
  MODIFY `id_checkup` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tb_obat`
--
ALTER TABLE `tb_obat`
  MODIFY `id_obat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=304;

--
-- AUTO_INCREMENT for table `tb_ordervaksin`
--
ALTER TABLE `tb_ordervaksin`
  MODIFY `id_ordervaksin` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tb_perusahaan`
--
ALTER TABLE `tb_perusahaan`
  MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tb_vaksin`
--
ALTER TABLE `tb_vaksin`
  MODIFY `id_vaksin` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
