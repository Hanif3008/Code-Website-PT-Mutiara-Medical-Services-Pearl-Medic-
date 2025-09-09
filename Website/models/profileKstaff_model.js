const db = require('./db');

const ProfileKstaff = {
    getKstaffAdminById: (id, callback) => {
        const query = 'SELECT * FROM tb_kepalastafadmin WHERE id_kstafadmin = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result[0]);
        });
    },
    updateKstaffAdminById: (id, newData, callback) => {
        const query = 'UPDATE tb_kepalastafadmin SET ? WHERE id_kstafadmin = ?';
        db.query(query, [newData, id], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
    },
    updatePasswordById: (id, newPassword, callback) => {
        const query = 'UPDATE tb_kepalastafadmin SET password_kstafadmin = ? WHERE id_kstafadmin = ?';
        db.query(query, [newPassword, id], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
    },
    getKstaffAdminByIdAsync: async (id) => {
        return new Promise((resolve, reject) => {
            ProfileKstaff.getKstaffAdminById(id, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },
    updatePasswordByIdAsync: async (id, newPassword) => {
        return new Promise((resolve, reject) => {
            ProfileKstaff.updatePasswordById(id, newPassword, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },
    addKstaffAdmin: (newAkun, callback) => {
        const query = 'INSERT INTO tb_stafadmin SET ?';
        db.query(query, [newAkun], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
    },
    addKstaffAdminAsync: async (newAkun) => {
        return new Promise((resolve, reject) => {
            ProfileKstaff.addKstaffAdmin(newAkun, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },
   getAllKstaffAdmin: (callback) => {
        const query = 'SELECT * FROM tb_stafadmin';
        db.query(query, (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result); // Ubah hasil query menjadi result
        });
    },
    getstaffAdminById : (id, callback) => {
        const query = 'SELECT * FROM tb_stafadmin WHERE id_stafadmin = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result[0]);
        });
    },
    getstaffAdminByIdAsync : async (id) => {
        return new Promise((resolve, reject) => {
            ProfileKstaff.getstaffAdminById(id, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },
    updatestaffAdmin: (id, newData, callback) => {
        const query = 'UPDATE tb_stafadmin SET ? WHERE id_stafadmin = ?';
        db.query(query, [newData, id], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
    },
      updatestaffAdminAsync: async (id, newData) => {
        return new Promise((resolve, reject) => {
            ProfileKstaff.updatestaffAdmin(id, newData, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },
    updatestaffPassword: (id, newPassword, callback) => {
        const query = 'UPDATE tb_stafadmin SET password_stafadmin = ? WHERE id_stafadmin = ?';
        db.query(query, [newPassword, id], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
    },
    updatestaffPasswordAsync: async (id, newPassword) => {
        return new Promise((resolve, reject) => {
            ProfileKstaff.updatestaffPassword(id, newPassword, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },
    deletestaffAdmin: (id, callback) => {
        const query = 'DELETE FROM tb_stafadmin WHERE id_stafadmin = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
    },
    deletestaffAdminAsync: async (id) => {
        return new Promise((resolve, reject) => {
            ProfileKstaff.deletestaffAdmin(id, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

};


module.exports = ProfileKstaff;
