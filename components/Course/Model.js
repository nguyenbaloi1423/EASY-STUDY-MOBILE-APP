


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MonHocSchema = new Schema({
  tenMonHoc: {
    type: String,
    required: true
  },
  baiHoc: [{
    id: mongoose.Schema.Types.ObjectId,
    nameSubject: String,
    videoID: String,
    linkPdf: String,
    
  }]
});

// Tạo mô hình từ Schema
const MonHoc = mongoose.model('MonHoc', MonHocSchema);

module.exports = MonHoc;
