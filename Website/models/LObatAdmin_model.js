const db = require('./db');

const getAllObatServices = (callback) => {
    const query = `
        SELECT 
            tb_pelayananobat.id_pelayananobat,
            tb_pelayananobat.tgl_pemesananobat,
            tb_pelayananobat.status_pesanan,
            tb_pelayananobat.nomorpesanan,
            tb_perusahaan.nama_perusahaan
        FROM tb_pelayananobat
        JOIN tb_perusahaan ON tb_pelayananobat.id_perusahaan = tb_perusahaan.id_perusahaan
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        callback(null, results);
    }
    );
}


const getObatServicesById = (id_pelayananobat, callback) => {
    const query = `
        SELECT
            tb_pelayananobat.id_pelayananobat,
            tb_pelayananobat.id_perusahaan,
            tb_pelayananobat.id_proyek,
            tb_pelayananobat.lokasi_pengirimanobat,
            tb_pelayananobat.tgl_pemesananobat,
            tb_pelayananobat.catatantambahanobat,
            tb_pelayananobat.nomorpesanan,
            tb_pelayananobat.status_pesanan,
            tb_pelayananobat.tgl_pengiriman,
            tb_pelayananobat.jenis_pelayanan,
            tb_pelayananobat.keranjangData,
            tb_perusahaan.nama_perusahaan,
            tb_perusahaan.photo_perusahaan,
            tb_proyek.nama_proyek,
            tb_proyek.nomortelepon_proyek
        FROM tb_pelayananobat
        JOIN tb_perusahaan ON tb_pelayananobat.id_perusahaan = tb_perusahaan.id_perusahaan
        JOIN tb_proyek ON tb_pelayananobat.id_proyek = tb_proyek.id_proyek
        WHERE tb_pelayananobat.id_pelayananobat = ?
    `;
    db.query(query, [id_pelayananobat], (err, results) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }

        if (results[0] && results[0].keranjangData) {
            // Parsing keranjangData JSON
            results[0].keranjangData = JSON.parse(results[0].keranjangData);

            // Ambil stock_obat dari tb_obat berdasarkan id_obat di keranjangData
            const keranjangData = results[0].keranjangData;
            const idsObat = keranjangData.map(item => item.id_obat);

            if (idsObat.length > 0) {
                // Query untuk mengambil stok obat
                const queryStok = `SELECT id_obat, stock_obat FROM tb_stokobat WHERE id_obat IN (?)`;
                db.query(queryStok, [idsObat], (err, stokResults) => {
                    if (err) {
                        console.log(err);
                        callback(err, null);
                        return;
                    }

                    // Buat objek lookup stok berdasarkan id_obat
                    const stokLookup = {};
                    stokResults.forEach(stokItem => {
                        stokLookup[stokItem.id_obat] = stokItem.stock_obat;
                    });

                    // Tambahkan stok ke keranjangData
                    results[0].keranjangData = keranjangData.map(item => ({
                        ...item,
                        stock_obat: stokLookup[item.id_obat] || 0 // default 0 jika tidak ada stok
                    }));

                    callback(null, results[0]);
                });
            } else {
                callback(null, results[0]);
            }
        } else {
            callback(null, results[0]);
        }
    });
};

const updateStokObat = (id_obat, jumlah_obat, callback) => {
    const query = `
        UPDATE tb_stokobat
        SET stock_obat = stock_obat - ?
        WHERE id_obat = ? AND stock_obat >= ?;  -- Pastikan stok cukup sebelum mengurangi
    `;
    db.query(query, [jumlah_obat, id_obat, jumlah_obat], (err, results) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        callback(null, results);
    });
};


const updateObatServices = (id_pelayananobat, tgl_pengiriman, status_pesanan, keranjangData, callback) => {
    const query = `
        UPDATE tb_pelayananobat 
        SET 
            tgl_pengiriman = ?,
            status_pesanan = ?
        WHERE id_pelayananobat = ?
    `;
    
    db.query(query, [tgl_pengiriman, status_pesanan, id_pelayananobat], (err, results) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }

        // Setelah mengupdate status, kurangi stok obat
        const tasks = keranjangData.map(item => {
            return new Promise((resolve, reject) => {
                updateStokObat(item.id_obat, item.jumlah_obat, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });
        });

        Promise.all(tasks)
            .then(() => callback(null, results))
            .catch(err => callback(err, null));
    });
};


const updateStatusObatServices = (id_pelayananobat, status_pesanan, callback) => {
    const query = `
        UPDATE tb_pelayananobat
        SET status_pesanan = ?
        WHERE id_pelayananobat = ?
    `;
    db.query(query, [status_pesanan, id_pelayananobat], (err, results) => {
        if (err) {
            console.log(err);   
            callback(err, null);
            return;
        }   
        callback(null, results);
    });
};


const deleteObatServices = (id_pelayananobat, callback) => {
    const query = `
        DELETE FROM tb_pelayananobat
        WHERE id_pelayananobat = ?
    `;
    db.query(query, [id_pelayananobat], (err, results) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        callback(null, results);
    });
};


const getAllStokObat = (callback) => {
    const query = `
        SELECT * FROM tb_stokobat
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        callback(null, results);
    });
};

const searchObatName = (nama_obat, callback) => {
    const query = `
        SELECT * FROM tb_stokobat
        WHERE nama_obat LIKE ?
    `;
    const searchTerm = `%${nama_obat}%`; // Prepare search term for LIKE query

    db.query(query, [searchTerm], (err, results) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        callback(null, results);
    });
};


const DisplayStockObatById = (id_obat, callback) => {
    const query = `
        SELECT * FROM tb_stokobat
        WHERE id_obat = ?
    `;
    db.query(query, [id_obat], (err, results) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        callback(null, results[0]);
    });
};


const editStockObatById = (id_obat, data, callback) => {
    const query = 'UPDATE tb_stokobat SET nama_obat = ?, jenis_obat = ?, jenis_kemasan = ?, obat_photo = ?, deskripsi_obat = ?, stock_obat = ? WHERE id_obat = ?';
    db.query(query, [data.nama_obat, data.jenis_obat, data.jenis_kemasan, data.obat_photo, data.deskripsi_obat, data.stock_obat, id_obat], (err, results) => {
        if (err) {
            return callback(err);
        }
        return callback(null, results);
    });
};


const addDataObat = (data, callback) => {
    const query = 'INSERT INTO tb_stokobat (nama_obat, jenis_obat, jenis_kemasan, obat_photo, deskripsi_obat, stock_obat) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [data.nama_obat, data.jenis_obat, data.jenis_kemasan, data.obat_photo, data.deskripsi_obat, data.stock_obat], (err, results) => {
        if (err) {
            return callback(err);
        }
        return callback(null, results);
    });
};

const deleteStokObat = (id_obat, callback) => {
    const query = `DELETE FROM tb_stokobat WHERE id_obat = ?`;
    
    db.query(query, [id_obat], (err, results) => {
        if (err) {
            console.log('Error executing query:', err);
            callback(err, null);
            return;
        }
        
        console.log('Delete operation results:', results);  // Log the result
        
        if (results.affectedRows === 0) {
            callback(new Error('No rows affected, check if the ID exists'), null);
        } else {
            callback(null, results);
        }
    });
};



module.exports = {
    getAllObatServices,
    getObatServicesById,
    updateObatServices,
    updateStokObat,
    updateStatusObatServices,
    deleteObatServices,
    getAllStokObat,
    searchObatName,
    DisplayStockObatById,
    editStockObatById,
    addDataObat,
    deleteStokObat
}