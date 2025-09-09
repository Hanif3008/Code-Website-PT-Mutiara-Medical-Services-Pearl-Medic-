const admin_model = require('../models/dashboard_admin_model');

const getAllLayananMasuk = (req, res) => {
  admin_model.getAllLayananMasuk((error, results) => {
    if (error) {
      console.error('Error fetching data:', error);
      return res.status(500).send('Error fetching data');
    }

    admin_model.getallProyekIn((error, resultsProyek) => {
        if (error) {
            console.error('Error fetching data:', error);
            return res.status(500).send('Error fetching data');
        }
        res.render('admin/index_admin', {
            title: 'Dashboard Admin',
            layout: 'layouts/main-layout-admin',
            layananMasuk: results,
            ProyekMasuk: resultsProyek
        });
    });
    });
};



module.exports = {
  getAllLayananMasuk,
};
