// models/baihoc.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Định nghĩa Schema cho mô hình "Bài học"
const BaiHocSchema = new Schema({
  videoId: {
    type: String,
    required: true
  },
  linkPdf: {
    type: String,
    required: true
  }
});

// Tạo mô hình từ Schema
const BaiHoc = mongoose.model('BaiHoc', BaiHocSchema);

module.exports = BaiHoc;
