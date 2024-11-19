const express = require('express');
const router = express.Router();
const controller = require('../components/Course/Controller')

/* GET users listing. */
// router.post('/addLesson', controller.thembaihoc);
router.post('/:idMonHoc/baihoc', async (req, res) => {
  try {
    const { idMonHoc } = req.params;
    const { nameSubject, videoID, linkPdf } = req.body;

    const baiHoc = { nameSubject, videoID, linkPdf };
    const monHoc = await controller.thembaihoc(idMonHoc, baiHoc);

    return res.status(200).json({ message: 'Thêm bài học thành công', monHoc });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi' });
  }
});
router.post('/addmonhoc', async (req, res) => {
  try {
    const { tenMonHoc } = req.body;

    const monHoc = await controller.themmonhoc(tenMonHoc);

    return res.status(200).json({ message: 'Thêm môn học thành công', monHoc: monHoc });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi' });
  }
});
router.get('/getmonhoc/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const monHoc = await controller.getAllMonhoc(id);

    return res.status(200).json({ message: 'lấy môn học thành công', monHoc: monHoc });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi' });
  }
});
router.get('/:idMonHoc/baihoc/:idBaiHoc', async (req, res) => {
  try {
    const { idMonHoc, idBaiHoc } = req.params;
    const baiHoc = await controller.getMonHoc(idMonHoc, idBaiHoc)
    return res.status(200).json({ message: 'lấy bài học thành công', baiHoc: baiHoc });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi' });
  }
})
router.get('/getall', async (req, res) => {
  try {
    const all = await controller.getAll();
    return res.status(200).json({ message: 'lấy tất cả nè', all });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi' });
  }
});
module.exports = router;
