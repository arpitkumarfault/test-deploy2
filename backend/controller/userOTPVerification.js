import OtpModel from '../models/userOTPModel.js';

const userVerificationOTP = async (req, res) => {
  const { email, otp } = req.body;

  // Check if OTP is provided in the request body
  if (!otp) {
    return res.status(400).json({ success: false, message: 'OTP is required' });
  }

  try {
    // Find OTP record by email from the OtpModel
    const userOtpEntry = await OtpModel.findOne({ email });
    if (!userOtpEntry) {
      return res.status(400).json({ success: false, message: 'User not found or OTP not requested' });
    }

    // Check if the entered OTP matches the stored OTP and if it hasn't expired
    const otpExpiryTime = 5 * 60 * 1000; // 5 minutes expiry for OTP
    if (userOtpEntry.otp !== otp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
    
    // Check for OTP expiration
    if (Date.now() > userOtpEntry.otpTimestamp + otpExpiryTime) {
      return res.status(400).json({ success: false, message: 'OTP has expired' });
    }

    // If OTP is correct and not expired, update the OTP entry's verification status
    userOtpEntry.isVerified = true;
    userOtpEntry.otp = undefined; // Clear OTP after successful verification
    userOtpEntry.otpTimestamp = undefined; // Clear OTP timestamp
    await userOtpEntry.save(); // Save the updated OTP entry

    // Send success response with email and isVerified status from OtpModel
    res.status(200).json({ 
      success: true, 
      message: 'Email verified successfully!', 
      data: {
        email: userOtpEntry.email,
        isVerified: userOtpEntry.isVerified
      }
    });
  } catch (error) {
    console.error('Error in userVerificationOTP:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};

export default userVerificationOTP;
