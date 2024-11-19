const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Service = require('./Service');

const schema = new Schema({
    id: { type: ObjectId},
    masv: { type: String},
    email: {type: String, require: true, unique: true},
    password: { type: String, require: true},
    otp: {
          type: String,
          required: false
        }
});

module.exports =mongoose.models.user || mongoose.model('user', schema);
