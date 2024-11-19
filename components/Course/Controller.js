const Service = require('./Service');

const thembaihoc = async (idMonHoc, baiHoc) => {
  try {
    return await Service.thembaihoc(idMonHoc, baiHoc);
  } catch (error) {
    console.log('user controller thembaiHoc error: ', error);
  }
}
const themmonhoc = async (tenMonHoc) => {
  try {
    return await Service.themmonhoc(tenMonHoc);
  } catch (error) {
    console.log('user controller monhoc error: ', error);
  }
}
const getAllMonhoc = async (id) => {
  try {
    return await Service.getAllMonhoc(id);
  } catch (error) {
    console.log('user controller getall error: ', error);
  }
}
const getMonHoc = async (idMonHoc, idBaiHoc) => {
  try {
    return await Service.getMonHoc(idMonHoc, idBaiHoc);
  } catch (error) {
    console.log('user controller thembaiHoc error: ', error);
  }
}
const getAll = async () => {
  try {
    return await Service.getAll();
  }catch(error) {
    console.log('getall error: ', error);
  }
}

module.exports = { thembaihoc, themmonhoc, getAllMonhoc, getMonHoc, getAll };
