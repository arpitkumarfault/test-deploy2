// models/Otp.js
import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String},
  expiresAt: { type: Date, required: true },
  isVerified: { type: Boolean, default: false },
});

// Automatically delete expired OTPs
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const OtpModel = mongoose.model('otp', otpSchema);
export default OtpModel;
