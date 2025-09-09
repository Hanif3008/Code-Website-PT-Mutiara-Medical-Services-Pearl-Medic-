const db = require('./db');

const getAllLayananMasuk = (callback) => {
  const query = `
    SELECT 
      o.id_pelayananobat AS id, -- menambahkan id_pelayananobat
      p.nama_perusahaan, 
      o.jenis_pelayanan AS jenis_pelayanan,
      o.nomorpesanan,
      o.status_pesanan AS status,
      'pembelian obat' AS jenis_layanan -- menambahkan label jenis layanan
    FROM tb_pelayananobat o
    JOIN tb_perusahaan p ON o.id_perusahaan = p.id_perusahaan
    WHERE o.status_pesanan = 3

    UNION ALL

    SELECT 
      m.id_medical AS id, -- menambahkan id_medical
      p.nama_perusahaan, 
      m.jenis_pelayanan AS jenis_pelayanan,
      m.nomorpesanan,
      m.status AS status,
      'medical check up' AS jenis_layanan -- menambahkan label jenis layanan
    FROM tb_medical m
    JOIN tb_perusahaan p ON m.id_perusahaan = p.id_perusahaan
    WHERE m.status = 3

    UNION ALL

    SELECT 
      d.id_darurat AS id, -- menambahkan id_darurat
      p.nama_perusahaan, 
      d.jenis_pelayanan AS jenis_pelayanan,
      d.nomorpesanan,
      d.status AS status,
      'darurat' AS jenis_layanan -- menambahkan label jenis layanan
    FROM tb_darurat d
    JOIN tb_perusahaan p ON d.id_perusahaan = p.id_perusahaan
    WHERE d.status = 3

    UNION ALL

    SELECT 
      v.id_vaksinasi AS id, -- menambahkan id_vaksinasi
      p.nama_perusahaan, 
      v.jenis_pelayanan AS jenis_pelayanan,
      v.nomorpesanan,
      v.status AS status,
      'vaksinasi' AS jenis_layanan -- menambahkan label jenis layanan
    FROM tb_vaksinasi v
    JOIN tb_perusahaan p ON v.id_perusahaan = p.id_perusahaan
    WHERE v.status = 3;
  `;

  db.query(query, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    callback(null, results);
  });
};


const getallProyekIn = (callback) => {
    const query = `
    SELECT  
        tb_proyek_request.id_proyek_request,
        tb_proyek_request.id_perusahaan,
        tb_proyek_request.nama_proyek,
        tb_proyek_request.status_proyek,
        tb_perusahaan.nama_perusahaan
    FROM tb_proyek_request
    JOIN tb_perusahaan ON tb_proyek_request.id_perusahaan = tb_perusahaan.id_perusahaan
    WHERE tb_proyek_request.status_proyek = 0;
    `;
    db.query(query, (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};

module.exports = {
    getAllLayananMasuk,
    getallProyekIn
};
