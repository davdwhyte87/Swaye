'use strict';

var jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
    try {
        var decode = jwt.verify(req.headers['token'], process.env.JWT);
        req.userData = decode;
        if (req.userData.type == "admin") {
            next();
        } else {
            return res.status(500).json({ code: 0, message: "An error occurred" });
        }
    } catch (error) {
        return res.status(500).json({ code: 0, message: "An error occurred" });
    }
};
//# sourceMappingURL=admin.js.map