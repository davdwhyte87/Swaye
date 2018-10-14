'use strict';

var Menu = require('../models/Menu');
var base64Img = require('base64-img');
var mongoose = require('mongoose');

exports.add = function (req, res) {
    var fname = randName();
    base64Img.img(req.body._image, 'img/menu', fname, function (err, filepath) {

        if (err) {
            return res.status(500).json({ code: 0, message: "An upload error occured", erro: err });
        }
        if (filepath) {
            var fn = filepath.split('\\').pop().split('/').pop();
            console.log(fn);
            var menu = Menu({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                price: req.body.price,
                image: req.body._image,
                qty: req.body.qty,
                created_at: Date()
            });
            menu.save().then(function (result) {
                console.log(result);
                res.status(200).json({ code: 1, message: "Menu item created", data: result });
            }).catch(function (error) {
                console.log(error);
                res.status(500).json({ code: 0, error: error });
            });
        }
    });
};

function randName() {
    var name = Math.floor(Math.random() * 10000000 + 99000000000);
    return name;
}
function b64toImage(data, fname) {
    base64Img.img(data, 'menu', fname, function (err, filepath) {});
}

//this gets all the menu items
exports.menu = function (req, res) {
    Menu.find().exec().then(function (result) {
        res.status(200).json({ code: 1, data: result });
    }).catch(function (error) {
        res.status(500).json({ error: error });
    });
};

exports.menu_single = function (req, res) {
    var id = req.params.id;
    Menu.findOne({ _id: id }).exec().then(function (result) {
        res.status(200).json({ code: 1, data: result });
    }).catch(function (error) {
        res.status(500).json({ error: error });
    });
};

exports.update = function (req, res) {
    var id = req.params.id;
    Menu.update({ _id: id }, { $set: { name: req.body.name, price: req.body.price, qty: req.body.qty } }).then(function (result) {
        res.status(200).json({ code: 1, message: "Menu updated", data: result });
    }).catch(function (error) {
        res.status(500).json({ code: 0, error: error });
    });
};

exports.take = function (req, res) {
    var id = req.params.id;
    Menu.findOne({ _id: id }).exec().then(function (menu) {
        if (menu) {
            if (menu.qty < 1) {
                return res.status(200).json({ code: 0, message: "Sorry no more, its finished" });
            }
            var current_qty = menu.qty;
            var new_qty = current_qty - req.params.take;
            menu.qty = new_qty;
            menu.save().then(function (result) {
                if (result) {
                    return res.status(200).json({ code: 1 });
                }
            }).catch(function (err) {
                return res.status(500).json({ code: 0, message: "An error occured", error: err });
            });
        } else {
            return res.status(200).json({ code: 0, message: "There is no menu item like that" });
        }
    }).catch(function (err) {
        return res.status(500).json({ code: 0, message: "An error occured", error: err });
    });
};

exports.delete = function (req, res) {
    var id = req.params.id;
    Menu.remove({ _id: id }).then(function (result) {
        res.status(200).json({ code: 1, message: "Menu deleted" });
    }).catch(function (error) {
        console.log(error);
        res.status(200).json({ code: 0, message: "An error occured" });
    });
};

exports.image = function (req, res) {
    var fs = require('fs');
    var name = req.params.name;
    var img = fs.readFileSync('./img/menu/' + name);
    res.writeHead(200, { 'Content-Type': 'image/gif' });
    res.end(img, 'binary');
};
//# sourceMappingURL=menu.js.map