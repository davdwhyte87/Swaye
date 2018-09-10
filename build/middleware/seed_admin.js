'use strict';

var Admin = require('../models/Admin');
var bcrypt = require('bcrypt');

module.exports = function (req, res, next) {
    Admin.find().exec().then(function (admins) {
        if (!admins) {
            var adm = process.env.admin;
            bcrypt.hash(adm.password, 10, function (err, hash) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ code: 0, error: err });
                }
                var admin = Admin({
                    _id: new mongoose.Types.ObjectId(),
                    name: adm.name,
                    email: adm.email,
                    password: hash
                });
                admin.save().then(function (admin) {
                    return res.status(200).json({ code: 1, message: "Admin created", data: admin });
                }).catch(function (error) {
                    console.log(error);
                    return res.status(500).json({ code: 0, message: "An error occured", error: error });
                });
            });
        }
    }).catch(function (error) {
        console.log(error);
        return res.status(500).json({ code: 0, message: "An error occured", error: error });
    });
};
//# sourceMappingURL=seed_admin.js.map