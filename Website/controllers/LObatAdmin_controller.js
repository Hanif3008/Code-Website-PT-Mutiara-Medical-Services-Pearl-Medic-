const LObatAdmin_model = require('../models/LObatAdmin_model');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const db = require('../models/db');

const getAllObatServices = (req, res) => {
    LObatAdmin_model.getAllObatServices((err, PelayananObat) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching obat services', error: err });
            return;
        }
        res.render('admin/LObat_admin', { 
            title: 'Pelayanan Obat',
            layout: 'layouts/main-layout-admin',
            PelayananObat: PelayananObat
        });
    });
}

const getObatServicesById = (req, res) => {
    const id_pelayananobat = req.params.id_pelayananobat;
    LObatAdmin_model.getObatServicesById(id_pelayananobat, (err, PelayananObat) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching obat services', error: err });
            return;
        }
        res.render('admin/LObat_Admin_detail', {
            title: 'Detail Pelayanan Obat',
            layout: 'layouts/main-layout-admin',
            PelayananObat: PelayananObat,
            keranjangData: PelayananObat.keranjangData // keranjangData sekarang berisi stock_obat
        });
    });
};

const updateObatServices = (req, res) => {
    const id_pelayananobat = req.params.id_pelayananobat;
    const { tgl_pengiriman, status_pesanan } = req.body;

    LObatAdmin_model.getObatServicesById(id_pelayananobat, (err, PelayananObat) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching obat services', error: err });
            return;
        }

        const tglPengirimanSebelumnya = new Date(PelayananObat.tgl_pengiriman);
        const tglPengirimanBaru = new Date(tgl_pengiriman);

        if (tglPengirimanBaru < tglPengirimanSebelumnya) {
            res.status(400).json({ message: 'Tanggal pengiriman baru tidak boleh kurang dari tanggal pengiriman sebelumnya.' });
            return;
        }

        // Mengupdate status pesanan dan stok obat
        LObatAdmin_model.updateObatServices(id_pelayananobat, tgl_pengiriman, status_pesanan, PelayananObat.keranjangData, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Error updating obat services', error: err });
                return;
            }
            res.redirect('/LObat_admin');
        });
    });
};

const updateStatusObatServices = (req, res) => {
    const id_pelayananobat = req.params.id_pelayananobat;
    const { status_pesanan } = req.body;  // Correctly get status_pesanan from req.body

    LObatAdmin_model.updateStatusObatServices(id_pelayananobat, status_pesanan, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error updating obat services', error: err });
            return;
        }
        res.redirect('/LObat_admin');
    });
};

const deleteObatServices = (req, res) => {
    const id_pelayananobat = req.params.id_pelayananobat;
    LObatAdmin_model.deleteObatServices(id_pelayananobat, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error deleting obat services', error: err });
            return;
        }
        res.redirect('/LObat_admin');
    });
};

const DisplayAllStockObat = (req, res) => {
    LObatAdmin_model.getAllStokObat((err, StockObat) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching stock obat', error: err });
            return;
        }
        res.render('admin/StokObat_admin', {
            title: 'Stock Obat',
            layout: 'layouts/main-layout-admin',
            StockObat: StockObat
        });
    });
};

const searchObatName = (req, res) => {
    const nama_obat = req.query.nama_obat; // Get search query from request

    if (!nama_obat) {
        res.status(400).json({ message: 'Nama obat is required' });
        return;
    }

    LObatAdmin_model.searchObatName(nama_obat, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error searching obat by name', error: err });
            return;
        }
        res.json(results); // Respond with the search results as JSON
    });
};

const DisplayStockObatById = (req, res) => {
    const id_obat = req.params.id_obat;
    LObatAdmin_model.DisplayStockObatById(id_obat, (err, StockObat) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching stock obat', error: err });
            return;
        }
        res.render('admin/StokObat_admin_details', {
            title: 'Detail Obat',
            layout: 'layouts/main-layout-admin',
            StockObat: StockObat
        });
    });
};

const editStockObatById = async (req, res) => {
    const id_obat = req.params.id_obat;
    const {
        nama_obat,
        jenis_obat,
        jenis_kemasan,
        photo_obat,
        stock_obat,
        deskripsi_obat
    } = req.body;

    // Initialize obat_photo with the existing value from req.body
    let obat_photo = photo_obat; 

    if (req.file) {
        const tempPath = req.file.path;
        const targetDir = path.join(__dirname, "../assets/img");
        const targetPath = path.join(targetDir, req.file.filename);

        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        try {
            await new Promise((resolve, reject) => {
                fs.rename(tempPath, targetPath, (err) => {
                    if (err) {
                        console.error(err);
                        return reject(err);
                    }
                    resolve();
                });
            });

            obat_photo = req.file.filename; // Update the obat_photo only if a new file is uploaded
        } catch (err) {
            console.error(err);
            return res.status(500).send('Could not upload the file');
        }
    } else {
        // If no new file is uploaded, obat_photo should retain its existing value
        // Fetch the current obat_photo from the database if not provided in the request body
        if (!obat_photo) {
            try {
                const [existingRecord] = await new Promise((resolve, reject) => {
                    const query = 'SELECT obat_photo FROM tb_stokobat WHERE id_obat = ?';
                    db.query(query, [id_obat], (err, results) => {
                        if (err) return reject(err);
                        resolve(results);
                    });
                });

                obat_photo = existingRecord ? existingRecord.obat_photo : null;
            } catch (err) {
                console.error(err);
                return res.status(500).send('Could not retrieve existing photo');
            }
        }
    }

    const updatedStockObat = {
        nama_obat,
        jenis_obat,
        jenis_kemasan,
        obat_photo,
        stock_obat,
        deskripsi_obat
    };

    LObatAdmin_model.editStockObatById(id_obat, updatedStockObat, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Could not update stock obat');
        }
        console.log('Data Has Been Updated', result);
        res.redirect('/StokObat_admin');
    });
};


const  addDataObat = (req, res) => {
    const {
        nama_obat,
        jenis_obat,
        jenis_kemasan,
        photo_obat,
        stock_obat,
        deskripsi_obat
    } = req.body;
    let obat_photo = photo_obat;
    if(req.file){
        const tempPath = req.file.path;
        const targetDir = path.join(__dirname, "../assets/img");
        const targetPath = path.join(targetDir, req.file.filename);

        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }
        fs.rename(tempPath, targetPath, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Could not upload the file');
            }

            obat_photo = req.file.filename;
            const newObat = {
                nama_obat,
                jenis_obat,
                jenis_kemasan,
                obat_photo,
                stock_obat,
                deskripsi_obat
            };
            LObatAdmin_model.addDataObat(newObat, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Could not add new obat');
                }
                console.log('Data Has Been Added', result);
                res.redirect('/StokObat_admin');
            });
        });
    } else {
        const newObat = {
            nama_obat,
            jenis_obat,
            jenis_kemasan,
            obat_photo,
            stock_obat,
            deskripsi_obat
        };
        LObatAdmin_model.addDataObat(newObat, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Could not add new obat');
            }
            console.log('Data Has Been Added', result);
            res.redirect('/StokObat_admin');
        });
    }
};

const deleteStokObat = (req, res) => {
    const id_obat = req.params.id_obat;

    LObatAdmin_model.deleteStokObat(id_obat, (err, result) => {
        if (err) {
            console.error('Error deleting stock obat:', err);
            res.status(500).json({ message: 'Error deleting stock obat', error: err.message });
            return;
        }
        
        console.log('Deletion success, response:', result);
        
        res.json({ message: 'data obat berhasil dihapus' });
    });
};

module.exports = {
    getAllObatServices,
    getObatServicesById,
    updateObatServices,
    updateStatusObatServices,
    deleteObatServices,
    DisplayAllStockObat,
    searchObatName,
    DisplayStockObatById,
    editStockObatById,
    addDataObat,
    deleteStokObat
}