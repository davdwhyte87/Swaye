"use strict";

var Transaction = require('../models/Transaction');

exports.uconfirm = function (req, res) {
    //this function takes the user id from the userData
    var user_id = req.userData.userId;
    Transaction.update({ _id: req.body.trans_id, user: user_id }, { $set: { uconfirmed: true } }).then(function (trans) {
        if (trans) {
            return res.status(200).json({ code: 1, message: "You have confirmed your transaction" });
        } else {
            return res.status(200).json({ code: 0, message: "This transaction does not exist" });
        }
    }).catch(function (error) {
        console.log(error);
        return res.status(200).json({ code: 0, error: error, message: "An error occurred" });
    });
};

exports.aconfirm = function (req, res) {
    Transaction.update({ _id: req.params.trans_id }, { $set: { aconfirmed: true } }).then(function (trans) {
        if (trans) {
            return res.status(200).json({ code: 1, message: "Transaction confirmed" });
        } else {
            return res.status(200).json({ code: 0, message: "This transaction does not exist" });
        }
    }).catch(function (error) {
        console.log(error);
        return res.status(200).json({ code: 0, error: error, message: "An error occurred" });
    });
};

//this gets the transactions belonging to a user
exports.trans = function (req, res) {
    var user_id = req.userData.userId;
    Transaction.find({ user: user_id }).exec().then(function (trans) {
        return res.status(200).json({ code: 1, data: trans });
    }).catch(function (error) {
        return res.status(500).json({ code: 1, message: "An error occurred", error: error });
    });
};

//this gets all the transactions on the platform
exports.atrans = function (req, res) {
    Transaction.find().exec().then(function (trans) {
        return res.status(200).json({ code: 1, data: trans });
    }).catch(function (error) {
        return res.status(500).json({ code: 1, message: "An error occurred", error: error });
    });
};
//# sourceMappingURL=transaction.js.map