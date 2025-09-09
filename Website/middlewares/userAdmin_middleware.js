const userAdminModel = require('../models/userAdmin_models');

const addStaffAdminProfileDataToLocals = (req, res, next) => {
    if (!req.session.user || !req.session.user.id_stafadmin) {
        return res.redirect('/login_admin');
    }

    const staffId = req.session.user.id_stafadmin;

    userAdminModel.getStaffAdminById(staffId, (err, staff) => {
        if (err) {
            console.error('Error fetching staff data:', err);
            return res.status(500).send('Internal Server Error');
        }
        if (!staff) {
            return res.status(404).send('Staff Not Found');
        }
        // Extract the first name
        const firstName = staff.namalengkap_stafadmin.split(' ')[0];
        staff.firstName = firstName;

        res.locals.staff = staff;
        next();
    });
};

module.exports = addStaffAdminProfileDataToLocals;
