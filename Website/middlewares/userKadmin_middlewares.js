const ProfileModel = require('../models/profileKstaff_model');


const addProfileDataToLocals = (req, res, next) => {
    const kstaffId = req.session.user.id_kstafadmin;

    ProfileModel.getKstaffAdminById(kstaffId, (err, kstaff) => {
        if (err) {
            console.error('Error fetching kstaff data:', err);
            return res.status(500).send('Internal Server Error');
        }
        if (!kstaff) {
            return res.status(404).send('Kstaff Not Found');
        }

        res.locals.kstaff = kstaff;
        next();
    });
};

module.exports = addProfileDataToLocals;