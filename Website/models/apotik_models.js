// apotik_models.js

const db = require('./db');

// Mendapatkan data stok obat berdasarkan halaman
exports.getStokObat = (page, itemsPerPage, callback) => {
  const offset = (page - 1) * itemsPerPage; // Menghitung offset untuk query LIMIT

  db.query('SELECT COUNT(*) as totalCount FROM tb_stokobat', (err, totalCountResult) => {
    if (err) {
      console.error('Error fetching total count:', err);
      callback({ data: [], totalPages: 1 }); // Mengembalikan data kosong jika terjadi kesalahan
    } else {
      const totalCount = totalCountResult[0].totalCount;
      const totalPages = Math.ceil(totalCount / itemsPerPage); // Menghitung total halaman

      db.query('SELECT * FROM tb_stokobat LIMIT ?, ?', [offset, itemsPerPage], (err, result) => {
        if (err) {
          console.error('Error fetching data:', err);
          callback({ data: [], totalPages: 1 }); // Mengembalikan data kosong jika terjadi kesalahan
        } else {
          callback({ data: result, totalPages: totalPages }); // Mengembalikan data dan total halaman
        }
      });
    }
  });
};

// Mencari obat berdasarkan nama
exports.searchObat = (searchTerm, page, itemsPerPage, callback) => {
  const offset = (page - 1) * itemsPerPage;
  const likeSearchTerm = `%${searchTerm}%`;

  db.query('SELECT COUNT(*) as totalCount FROM tb_stokobat WHERE nama_obat LIKE ?', [likeSearchTerm], (err, totalCountResult) => {
    if (err) {
      console.error('Error fetching total count:', err);
      callback({ data: [], totalPages: 1 });
    } else {
      const totalCount = totalCountResult[0].totalCount;
      const totalPages = Math.ceil(totalCount / itemsPerPage);

      db.query('SELECT * FROM tb_stokobat WHERE nama_obat LIKE ? LIMIT ?, ?', [likeSearchTerm, offset, itemsPerPage], (err, result) => {
        if (err) {
          console.error('Error fetching data:', err);
          callback({ data: [], totalPages: 1 });
        } else {
          callback({ data: result, totalPages: totalPages });
        }
      });
    }
  });
};
