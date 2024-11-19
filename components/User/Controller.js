
const userService = require('./Service');
const bcrypt = require('bcryptjs');
const login = async (email, password) => {
    try {
        return await userService.login(email, password);
    } catch (error) {
        console.log('user controller login error: ', error);
    }
}

const register = async (email, password, masv) => {
    try {
        return await userService.register(email, password, masv);
    } catch (error) {
        console.log('Register controller login error: ', error);
    }
}
const changePassword = async (email, password, newPassword) => {
    try {
        return await userService.changePassword(email, password, newPassword);
    } catch (error) {
        console.error('User controller login error: ', error);
    }
}
const sendOTP = async function (req, res) {
    try {
        const { email } = req.body;
        const user = await userService.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({message:'Không tìm thấy email'});
        }
        const otp = await userService.generateOTP(email);
        await userService.sendOTPEmail(email, otp);
        res.status(200).json({message:'OTP đã được gửi vui lòng kiểm tra email'});
    } catch (err) {
        console.log(err);
        res.status(500).json({message:'Sever đang lỗi vui lòng thử lại sau'});
    }
};
const sendFeedback = async function (req, res) {
    try {
        const { email, feedback } = req.body;
        await userService.sendFeedBackEmail(email, feedback);
        res.status(200).json({message:'Yêu cầu của bạn đã được gửi, vui lòng đợi email chúng tôi sẽ trả lời bạn sớm nhất'});
    } catch (err) {
        console.log(err);
        res.status(500).json({message:'Sever đang lỗi vui lòng thử lại sau'});
    }
};
const resetPassword = async function (req, res) {
    try {
        const { email, otp, newPassword } = req.body;
        const user = await userService.getUserByEmail(email);
        if (!user) {
            return res.status(404).json('User not found');
        }
        const isOTPValid = await userService.verifyOTP(email, otp);
        if (!isOTPValid) {
            return res.status(400).json('Invalid OTP');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await userService.updatePassword(email, hashedPassword);
        res.status(200).json('Password updated successfully');
    } catch (err) {
        console.log(err);
        res.status(500).json('Internal Server Error');
    };
    
}
module.exports = { login, register, changePassword, sendOTP, resetPassword, sendFeedback };