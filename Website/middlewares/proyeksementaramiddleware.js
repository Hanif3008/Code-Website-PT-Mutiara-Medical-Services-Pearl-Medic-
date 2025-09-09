const tempproyek_model = require('../models/proyeksementara_model');

// Middleware untuk menambahkan data proyek sementara sesuai dengan id perusahaan ke locals
const addTempProyekDataToLocals = (req, res, next) => {
  const companyId = req.session.user.id_perusahaan;

  tempproyek_model.getTempProjectsByCompanyId(companyId, (err, tempprojects) => {
    if (err) {
      console.error('Error fetching temporary project data:', err);
      return res.status(500).send('Internal Server Error');
    }

    res.locals.tempprojects = tempprojects;
    next();
  });
};

module.exports = addTempProyekDataToLocals;
