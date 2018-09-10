'use strict';

var Admin = require('../models/Admin');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.create = function (req, res) {
    Admin.findOne({ email: req.body.email }).exec().then(function (admin) {
        if (admin == null) {
            bcrypt.hash(req.body.password, 10, function (err, hash) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ code: 0, error: err });
                }
                var admin = Admin({
                    _id: new mongoose.Types.ObjectId(),
                    name: req.body.name,
                    email: req.body.email,
                    password: hash
                });
                admin.save().then(function (admin) {
                    return res.status(200).json({ code: 1, message: "Admin created", data: admin });
                }).catch(function (error) {
                    console.log(error);
                    return res.status(500).json({ code: 0, message: "An error occured", error: error });
                });
            });
        } else {
            return res.status(200).json({ code: 0, message: "This admin already exists" });
        }
    }).catch(function (error) {
        console.log(error);
        return res.status(500).json({ code: 0, message: "An error occured", error: error });
    });
};

exports.login = function (req, res) {
    Admin.findOne({ email: req.body.email }).exec().then(function (admin) {
        if (admin.length < 1) {
            return res.status(200).json({ code: 0, message: "This admin does not exist" });
        } else {
            bcrypt.compare(req.body.password, admin.password, function (err, result) {
                if (err) {
                    return res.status(500).json({ code: 0, message: "An error occurred" });
                }
                if (result) {
                    var token = jwt.sign({ email: admin.email, adminId: admin._id, type: "admin" }, process.env.JWT, {
                        expiresIn: "24h"
                    });
                    return res.status(200).json({ code: 1, message: "Signin successfull", token: token });
                } else {
                    return res.status(200).json({ code: 0, message: "Authentication failed" });
                }
            });
        }
    });
};

exports.admins = function (req, res) {
    Admin.find().exec().then(function (admins) {
        return res.status(200).json({ code: 1, data: admins });
    }).catch(function (error) {
        console.log(error);
        return res.status(500).json({ code: 0, message: "An error occured", error: error });
    });
};

exports.seed = function (req, res, next) {
    Admin.find().exec().then(function (admins) {
        if (admins.length == 0) {
            var adm = process.env.admin;
            bcrypt.hash(process.env.ADMIN_PASS, 10, function (err, hash) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ code: 0, error: err });
                }
                var admin = Admin({
                    _id: new mongoose.Types.ObjectId(),
                    name: process.env.ADMIN_NAME,
                    email: process.env.ADMIN_EMAIL,
                    password: hash
                });
                admin.save().then(function (admin) {
                    return res.status(200).json({ code: 1, message: "Admin created", data: admin });
                }).catch(function (error) {
                    console.log(error);
                    return res.status(500).json({ code: 0, message: "An error occured", error: error });
                });
            });
        } else {
            return res.status(200).json({ code: 0, message: "Admin already exists" });
        }
    }).catch(function (error) {
        console.log(error);
        return res.status(500).json({ code: 0, message: "An error occured", error: error });
    });
};
//# sourceMappingURL=admin.js.map