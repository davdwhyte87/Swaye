'use strict';

var jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
    try {
        jwt.verify(req.headers['token'], process.env.JWT, function (err, dc) {
            if (err) {
                return res.status(200).json({ code: 0, message: "An error occured" });
            }
            req.userData = dc;
            console.log(dc);
            if (req.userData.type = "user") {
                next();
            } else {
                return res.status(200).json({ code: 0, message: "An error occured" });
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ code: 190, message: "An error occured" });
    }
};
//# sourceMappingURL=auth.js.map