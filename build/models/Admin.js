'use strict';

var mongoose = require('mongoose');

var adminSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('Admin', adminSchema);
//# sourceMappingURL=Admin.js.map