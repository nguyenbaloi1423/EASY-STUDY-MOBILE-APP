const Monhoc = require('./Model');


const thembaihoc = async (idMonHoc, baiHoc) => {
    try {
        const monHoc = await Monhoc.findById(idMonHoc);
        if (!monHoc) {
            throw new Error('Không tìm thấy môn học');
        }

        monHoc.baiHoc.push(baiHoc);
        await monHoc.save();

        return monHoc;
    } catch (error) {
        throw error;
    }
}
const themmonhoc = async (tenMonHoc) => {
    try {
        const monHoc = new Monhoc({ tenMonHoc });
        await monHoc.save();
        return monHoc;
    } catch (error) {
        throw error;
    }
}
const getAllMonhoc = async (id) => {
    try {
        return await Monhoc.findById(id);
    } catch (error) {
        console.log('Get all product error: ', error);
    }
    return null;
}
const getMonHoc = async (idMonHoc, idBaiHoc) => {
    try {
        const monHoc = await Monhoc.findById(idMonHoc);
        if (!monHoc) {
            throw new Error('Không tìm thấy môn học');
        }
        const baiHoc = monHoc.baiHoc.id(idBaiHoc);
        if (!baiHoc) {
            throw new Error('Không tìm thấy bài học');
        }
        return baiHoc;
    } catch (error) {
        throw new Error('Không thể lấy bài học');
    }
}
const getAll = async () => {
    try {
        return await Monhoc.find();
    } catch (error) {
        console.error(error);
    }
};


module.exports = { thembaihoc, themmonhoc, getAllMonhoc, getMonHoc, getAll };
