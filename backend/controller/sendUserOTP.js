// controllers/authController.js
import userModel from '../models/userModel.js';
import OtpModel from '../models/userOTPModel.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ path: './config/config.env' });

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate a 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP email function
const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP code for registering on TASK HUB',
    text: `Your OTP for email verification is: ${otp}. It is valid for 5 minutes.`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error in sendOTPEmail:', error);
    throw new Error('Failed to send OTP email');
  }
};

// Route handler to send OTP
export const sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const generatedOTP = generateOTP();
    console.log(`Sending OTP ${generatedOTP} to email ${email}`);

    // Set expiration time for OTP (5 minutes from now)
    const mainExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Remove any existing OTP entries for this email
    await OtpModel.deleteMany({ email });

    // Create a new OTP entry in the OTP model
    await OtpModel.create({ email, otp:generatedOTP, expiresAt:mainExpiresAt });

    // Send the OTP to the user's email
    await sendOTPEmail(email, generatedOTP);

    res.status(200).json({ success: true, message: 'OTP sent successfully.' });
  } catch (error) {
    console.error('Error in sendOtp route:', error);
    res.status(500).json({ success: false, message: 'An error occurred while sending the OTP. Please try again.' });
  }
};
