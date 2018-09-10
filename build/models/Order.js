'use strict';

var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    summary: { type: String, required: true },
    price: { type: Number, required: true },
    confirmed: { type: Boolean, required: true, default: false },
    date: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = mongoose.model('Order', orderSchema);
//# sourceMappingURL=Order.js.map