

const checkRegister = (req, res, next)=>{
    const {masv, email, password} = req.body;
    if (!masv || !email || !password) {
        return res.status(400).json({
            status: false,
            message: 'Nhập tất cả',
        })
    }else{
        let regex = /^[\w-]+(\.[\w-]+)*@fpt.edu.vn$/;
        if(!regex.test(email)){
            return res.status(400).json({
                status: false,
                message: 'Email phải là email của FPTedu',
            })
        }
        if (password.length < 8) {
            return res.status(400).json({
                status: false,
                message: 'Mật khẩu phải ít nhất 8 ký tự',
            })
        }
    }
    return next()
}

module.exports = {checkRegister}