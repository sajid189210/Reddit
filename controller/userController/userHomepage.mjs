import { sendEmail } from "../../config/mailer.mjs";

//* OTP Generator.
const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000); // Random 6-digit OTP
    return otp;
};

export const userSignUp = async (req, res) => {
    const { email } = req.body;

    const otp = generateOTP();
    const otpExpirationTime = Date.now() + 60000;

    req.session.otp = otp;
    req.session.otpExpirationTime = otpExpirationTime;

    const subject = 'Your OTP for Authentication';
    const text = `Your OTP is: ${otp}`;
    const html = `<h1>Your OTP is: ${otp}</h1><p>This OTP will expire in 1 minute.</p>`;

    try {
        // Send email with OTP
        const info = await sendEmail(email, subject, text, html);
        if (!info.accepted || info.accepted.length === 0) {
            throw new Error('Email was not accepted by the recipient server.');
        }

        res.status(200).json({
            success: true,
            message: `Enter the 6-digit code we sent to ${email}`,
        });

    } catch (error) {
        console.error(`Error in userSignUp: ${error.message}`);

        // Handle specific email-sending errors
        if (error.message.includes('Email was not accepted')) {
            return res.status(500).json({
                success: false,
                message: 'Failed to send OTP. Please try again later.',
            });
        }

        res.status(500).json({
            success: false,
            message: 'Internal server error. Please try again later.',
            error: error.message,
        });
    }
};


export const verifyOTP = (req, res) => {
    const { otpInput } = req.body;
    const otpExpiry = req.session.otpExpirationTime;
    const otp = req.session.otp;
    const currentTime = Date.now();

    

    try {
        // Check if OTP has expired
        if (currentTime > otpExpiry) {
            return res.status(400).json({ success: false, message: 'OTP has expired! Please request a new one.' });
        }

        // Check if OTP is correct
        if (otpInput !== otp) {
            return res.status(400).json({ success: false, message: 'Incorrect OTP! Please try again.' });
        }

        // If OTP is valid and not expired
        return res.status(200).json({ success: true, message: 'OTP verified successfully!' });

    } catch (error) {
        console.error(`Error caught in verifyOTP: ${error.message}`);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
            stack: error.stack,
        });
    }
};


export const renderHome = (req, res) => {
    res.render('user/homepage');
};

