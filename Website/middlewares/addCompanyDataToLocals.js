const userModel = require('../models/usermodels');

const addCompanyDataToLocals = (req, res, next) => {
    const companyId = req.session.user.id_perusahaan;

    userModel.getCompanyById(companyId, (err, perusahaan) => {
        if (err) {
            console.error('Error fetching company data:', err);
            return res.status(500).send('Internal Server Error');
        }
        if (!perusahaan) {
            return res.status(404).send('Company Not Found');
        }

        res.locals.perusahaan = perusahaan;
        next();
    });
};

module.exports = addCompanyDataToLocals;
