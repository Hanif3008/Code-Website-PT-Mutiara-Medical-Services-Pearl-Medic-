const db = require('./db')

// get data perusahaan

const getDataPerusahaan = (callback) => {
    const query = 'SELECT * FROM tb_perusahaan'
    db.query(query, (err, result) => {
        if (err) {
            return callback(err)
        }
        return callback(null, result)
    }
    )
}

const getDataPerusahaanById = (id_perusahaan, callback) => {
    const query = 'SELECT * FROM tb_perusahaan WHERE id_perusahaan = ?'
    db.query(query, [id_perusahaan], (err, result) => {
        if (err) {
            return callback(err)
        }
        if (result.length === 0) {
            return callback(null, null)
        }
        return callback(null, result[0])
    }
    )
}
const displayEditPerusahaanById = (id_perusahaan, callback) => {
    const query = 'SELECT * FROM tb_perusahaan WHERE id_perusahaan = ?'
    db.query(query, [id_perusahaan], (err, result) => {
        if (err) {
            return callback(err)
        }
        if (result.length === 0) {
            return callback(null, null)
        }
        return callback(null, result[0])
    }
    )
}

const EditDataPerusahaanById = (id_perusahaan, data, callback) => {
    const query = 'UPDATE tb_perusahaan SET nama_perusahaan = ?, bidang_perusahaan = ?, email_perusahaan = ?, username_perusahaan = ?, nomortelepon_perusahaan = ?, alamat_perusahaan = ?, photo_perusahaan = ?, status_perusahaan = ? WHERE id_perusahaan = ?'
    db.query(query, [data.nama_perusahaan, data.bidang_perusahaan, data.email_perusahaan, data.username_perusahaan, data.nomortelepon_perusahaan, data.alamat_perusahaan, data.photo_perusahaan, data.status_perusahaan, id_perusahaan], (err, result) => {
        if (err) {
            return callback(err)
        }
        return callback(null, result)
    }
    )
}

const addDataPerusahaan = (data, callback) => {
    const query = 'INSERT INTO tb_perusahaan SET ?'
    db.query(query, [data], (err, result) => {
        if (err) {
            return callback(err)
        }
        return callback(null, result)
    }
    )
}
const searchDataPerusahaanByname = (nama_perusahaan, callback) => {
    const query = 'SELECT * FROM tb_perusahaan WHERE nama_perusahaan LIKE ?'
    db.query(query, [`%${nama_perusahaan}%`], (err, result) => {
        if (err) {
            return callback(err)
        }
        return callback(null, result)
    }
    )
};
const updateDataPerusahaanById = (id_perusahaan, data, callback) => {
    const query = 'UPDATE tb_perusahaan SET ? WHERE id_perusahaan = ?'
    db.query(query, [data, id_perusahaan], (err, result) => {
        if (err) {
            return callback(err)
        }
        return callback(null, result)
    }
    )
};
const deleteDataPerusahaanById = (id_perusahaan, callback) => {
    const query = 'DELETE FROM tb_perusahaan WHERE id_perusahaan = ?'
    db.query(query, [id_perusahaan], (err, result) => {
        if (err) {
            return callback(err)
        }
        return callback(null, result)
    }
    )
};

const getProyekRequests = (callback) => {
    const query = `
        SELECT pr.*, p.nama_perusahaan 
        FROM tb_proyek_request pr
        JOIN tb_perusahaan p ON pr.id_perusahaan = p.id_perusahaan
    `;
    db.query(query, (err, result) => {
        if (err) {
            return callback(err);
        }
        return callback(null, result);
    });
};

const getProyekRequestsById = (id_proyek_request, callback) => {
    const query = `
        SELECT pr.*, p.nama_perusahaan, p.photo_perusahaan
        FROM tb_proyek_request pr
        JOIN tb_perusahaan p ON pr.id_perusahaan = p.id_perusahaan
        WHERE pr.id_proyek_request = ?
    `;
    db.query(query, [id_proyek_request], (err, result) => {
        if (err) {
            return callback(err);
        }
        if (result.length === 0) {
            return callback(null, null);
        }
        return callback(null, result[0]);
    });
};

const acceptProyekRequest = (id_proyek_request, callback) => {
    const selectQuery = `
        SELECT id_perusahaan, nama_proyek, jumlah_proyek, nomortelepon_proyek, lokasi_proyek, deskripsi_proyek
        FROM tb_proyek_request
        WHERE id_proyek_request = ?
    `;

    const insertQuery = `
        INSERT INTO tb_proyek (id_perusahaan, nama_proyek, jumlah_proyek, nomortelepon_proyek, lokasi_proyek, deskripsi_proyek, status_proyek)
        VALUES (?, ?, ?, ?, ?, ?, 1)
    `;

    const updateQuery = `
        UPDATE tb_proyek_request
        SET status_proyek = 1
        WHERE id_proyek_request = ?
    `;

    db.query(selectQuery, [id_proyek_request], (err, result) => {
        if (err) {
            return callback(err);
        }
        if (result.length === 0) {
            return callback(new Error('Project request not found'));
        }

        const proyek = result[0];
        db.query(insertQuery, [
            proyek.id_perusahaan,
            proyek.nama_proyek,
            proyek.jumlah_proyek,
            proyek.nomortelepon_proyek,
            proyek.lokasi_proyek,
            proyek.deskripsi_proyek
        ], (err, result) => {
            if (err) {
                return callback(err);
            }

            // Update status in tb_proyek_request
            db.query(updateQuery, [id_proyek_request], (err, result) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, result);
            });
        });
    });
};

const rejectProyekRequest = (id_proyek_request, callback) => {
    const updateQuery = `
        UPDATE tb_proyek_request
        SET status_proyek = 2
        WHERE id_proyek_request = ?
    `;

    db.query(updateQuery, [id_proyek_request], (err, result) => {
        if (err) {
            return callback(err);
        }
        return callback(null, result);
    });
};

const displayProyekPerusahaanById = (id_perusahaan, callback) => {
    const query = `
        SELECT tb_proyek.*, tb_perusahaan.nama_perusahaan, tb_perusahaan.photo_perusahaan
        FROM tb_proyek
        JOIN tb_perusahaan ON tb_proyek.id_perusahaan = tb_perusahaan.id_perusahaan
        WHERE tb_proyek.id_perusahaan = ?
    `;
    db.query(query, [id_perusahaan], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};


const searchProyek = (searchTerm, callback) => {
    const query = 'SELECT * FROM tb_proyek WHERE nama_proyek LIKE ?';
    db.query(query, [`%${searchTerm}%`], (err, result) => {
        if (err) {
            return callback(err);
        }
        return callback(null, result);
    });
};

const getDetailProyekById = (id_proyek, callback) => {
    const query = `
        SELECT tb_proyek.*, tb_perusahaan.nama_perusahaan, tb_perusahaan.photo_perusahaan
        FROM tb_proyek
        JOIN tb_perusahaan ON tb_proyek.id_perusahaan = tb_perusahaan.id_perusahaan
        WHERE tb_proyek.id_proyek = ?
    `;
    db.query(query, [id_proyek], (err, result) => {
        if (err) {
            return callback(err);
        }
        return callback(null, result[0]); // Mengembalikan satu hasil proyek
    });
};
const displayEditDetailProyekById = (id_proyek, callback) => {
    const query = `
        SELECT tb_proyek.*, tb_perusahaan.nama_perusahaan, tb_perusahaan.photo_perusahaan
        FROM tb_proyek
        JOIN tb_perusahaan ON tb_proyek.id_perusahaan = tb_perusahaan.id_perusahaan
        WHERE tb_proyek.id_proyek = ?
    `;
    db.query(query, [id_proyek], (err, result) => {
        if (err) {
            return callback(err);
        }
        return callback(null, result[0]); // Mengembalikan satu hasil proyek
    });
};

const editDetailProyekById = (id_proyek, nama_proyek, jumlah_proyek, nomortelepon_proyek, lokasi_proyek,status_proyek, deskripsi_proyek, callback) => {
    const query = `
        UPDATE tb_proyek
        SET nama_proyek = ?, jumlah_proyek = ?, nomortelepon_proyek = ?, lokasi_proyek = ?,status_proyek = ?, deskripsi_proyek = ?
        WHERE id_proyek = ?
    `;
    db.query(query, [nama_proyek, jumlah_proyek, nomortelepon_proyek, lokasi_proyek, status_proyek, deskripsi_proyek, id_proyek], (err, result) => {
        if (err) {
            return callback(err);
        }
        return callback(null, result);
    });
};

const tambahProyek = (id_perusahaan, nama_proyek, jumlah_proyek, nomortelepon_proyek, lokasi_proyek, status_proyek, deskripsi_proyek, callback) => {
    const query = `
        INSERT INTO tb_proyek (id_perusahaan, nama_proyek, jumlah_proyek, nomortelepon_proyek, lokasi_proyek, status_proyek, deskripsi_proyek)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [id_perusahaan, nama_proyek, jumlah_proyek, nomortelepon_proyek, lokasi_proyek, status_proyek, deskripsi_proyek], (err, result) => {
        if (err) {
            return callback(err);
        }
        return callback(null, result);
    });
};

const deleteProyekById = (id_proyek, callback) => {
    const query = 'DELETE FROM tb_proyek WHERE id_proyek = ?';
    db.query(query, [id_proyek], (err, result) => {
        if (err) {
            return callback(err);
        }
        return callback(null, result);
    });
};




module.exports = {
    getDataPerusahaan,
    getDataPerusahaanById,
    getProyekRequests,
    getProyekRequestsById,
    acceptProyekRequest,
    rejectProyekRequest,
    addDataPerusahaan,
    updateDataPerusahaanById,
    displayEditPerusahaanById,
    EditDataPerusahaanById,
    deleteDataPerusahaanById,
    searchDataPerusahaanByname,
    displayProyekPerusahaanById,
    searchProyek,
    getDetailProyekById,
    displayEditDetailProyekById,
    editDetailProyekById,
    tambahProyek,
    deleteProyekById
}
