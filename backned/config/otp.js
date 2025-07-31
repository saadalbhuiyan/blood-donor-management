const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');

const sendOTP = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password',
        },
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Admin OTP for Login',
        text: `Your OTP is: ${otp}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP sent');
    } catch (error) {
        console.error('Error sending OTP: ', error);
    }
};

const generateOTP = () => {
    return otpGenerator.generate(6, { digits: true, upperCase: false, specialChars: false });
};

module.exports = { sendOTP, generateOTP };
