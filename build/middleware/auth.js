'use strict';

var jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
    try {
        var decode = jwt.verify(req.headers['token'], process.env.JWT);
        req.userData = decode;
        if (req.userData.type = "user") {
            next();
        } else {
            return res.status(500).json({ code: 0, message: "An error occured" });
        }
    } catch (error) {
        return res.status(500).json({ code: 0, message: "An error occured" });
    }
};
//# sourceMappingURL=auth.js.map