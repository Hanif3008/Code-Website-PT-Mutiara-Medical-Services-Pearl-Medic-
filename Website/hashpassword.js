const bcrypt = require('bcrypt');
const db = require('./models/db'); // Pastikan path ke db.js benar

async function hashPasswords() {
    const query = 'SELECT id_perusahaan, password_perusahaan FROM tb_perusahaan';
    db.query(query, async (err, results) => {
        if (err) throw err;
        
        for (const row of results) {
            if (!row.password_perusahaan.startsWith('$2b$')) {
                const hashedPassword = await bcrypt.hash(row.password_perusahaan, 10);
                const updateQuery = 'UPDATE tb_perusahaan SET password_perusahaan = ? WHERE id_perusahaan = ?';
                db.query(updateQuery, [hashedPassword, row.id_perusahaan], (updateErr) => {
                    if (updateErr) throw updateErr;
                });
            }
        }
        console.log('Password hashing complete.');
        db.end();
    });
}

hashPasswords();
