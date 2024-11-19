const userModel = require('./Model');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');


const login = async (email, password) => {
  try {
    let user = await userModel.findOne({ email });
    if (user) {
      const isMatch = bcrypt.compareSync(password, user.password);
      return isMatch ? user : false;
    }
  } catch (error) {
    console.log('Lỗi rồi bạn ơi', error);
  }
  return false;
}

const register = async (email, password, masv) => {
  try {
    let user = await userModel.findOne({ email });
    if (!user) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      await userModel.create({
        email: email,
        password: hash,
        masv: masv,
      });
      return true;
    }
  } catch (error) {
    console.log('User register error: ', error);
  }
  return false;
}
const changePassword = async (email, password, newPassword) => {

  try {
    let user = await userModel.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return false;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword; // Lưu mật khẩu mới đã được mã hóa
    await user.save();
    return true;

  } catch (error) {
    console.log("User service register error", error);
    return false; // Trả về false khi có lỗi
  }

};
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'iamdemon.dev@gmail.com',
    pass: 'naoxvujkcvkfyill',
  }
});

const getUserByEmail = async function (email) {
  return await userModel.findOne({ email });
};

const generateOTP = async function (email) {
  const otp = Math.floor(100000 + Math.random() * 900000);
  await userModel.findOneAndUpdate({ email }, { otp }, { upsert: true });
  return otp;
};

const verifyOTP = async function (email, otp) {
  const otpRecord = await userModel.findOne({ email });
  if (!otpRecord) {
    return false;
  }
  return otpRecord.otp == otp;
};

const updatePassword = async function (email, newPassword) {
  await userModel.findOneAndUpdate({ email }, { password: newPassword });
};

const sendOTPEmail = async function (email, otp) {
  const mailOptions = {
    from: 'EASY STUDY MOBILE APP <iamdemon.dev@gmail.com>',
    to: email,
    subject: 'Bạn Đã Yêu Cầu Quên Mật Khẩu',
    html: `Mã OTP để đặt lại mật khẩu của bạn: ${otp}. Mã có hiệu lực 10 phút`,
  };
  await transporter.sendMail(mailOptions);

};
const sendFeedBackEmail = async function (email, feedback, attachmentPath) {
  const mailOptions = {
    from: 'EASY STUDY MOBILE APP <iamdemon.dev@gmail.com>',
    to: 'Devnguyenthanhan26@gmail.com',
    subject: 'Một người dùng đã nhờ sự hỗ trợ của bạn',
    html: `Người cần bạn hỗ trợ là: ${email}<br><br>Nội dung cần hỗ trợ là: ${feedback}`,
  };
  await transporter.sendMail(mailOptions);
  const attachments = [];
  if (attachmentPath) {
    attachments.push({ path: attachmentPath });
  }
}
// const getUserById = async (userId) => {
//   try {
//     const user = await userModel.findById(userId);
//     return user;
//   } catch (error) {
//     throw new Error('Failed to get user');
//   }
// };

// // Hàm getAll: Lấy danh sách tất cả người dùng
// const getAllUsers = async () => {
//   try {
//     const users = await userModel.find();
//     return users;
//   } catch (error) {
//     throw new Error('Failed to get all users');
//   }
// };


module.exports = { login, register, changePassword, getUserByEmail, generateOTP, verifyOTP, updatePassword, sendOTPEmail, sendFeedBackEmail };