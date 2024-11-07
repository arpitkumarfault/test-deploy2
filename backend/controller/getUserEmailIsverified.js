import OtpModel from '../models/userOTPModel.js';

const getVerifiedEmail = async (req, res) => {
  const { email } = req.query; // Fetch email from the query parameter

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  try {
    // Find the OTP entry by email
    const userOtpEntry = await OtpModel.findOne({ email });

    if (!userOtpEntry) {
      return res.status(400).json({ success: false, message: 'User not found or OTP not requested' });
    }

    // Check if the email is verified
    if (!userOtpEntry.isVerified) {
      return res.status(400).json({ success: false, message: 'Email is not verified yet' });
    }

    // Return the email if it is verified
    return res.status(200).json({ success: true, email: userOtpEntry.email });

  } catch (error) {
    console.error('Error in getVerifiedEmail:', error);
    return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};

export default getVerifiedEmail;
