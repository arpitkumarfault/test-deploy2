import express from 'express'
import { userLogin } from '../controller/userLogin.js'
import userRegistration from '../controller/userRegister.js'
import userLogout from '../controller/userLogout.js'
import userProtectedRoute from './userProtectedRoute.js'
import userTaskCreate from '../controller/userTaskCreate.js'
import getUserData from '../controller/getUserData.js'
import userDelete from '../controller/userTaskDelete.js'
import userTaskUpdate from '../controller/userTaskUpdate.js'
import { userTaskStatusUpdate } from '../controller/userTaskStatusUpdate.js'
import upload from '../controller/userUploadPorfile.js'
import userModel from '../models/userModel.js'
import getUserMainData from '../controller/getUserMainData.js'
import getUserProfile from '../controller/getUserProfile.js'
import userVerificationOTP from '../controller/userOTPVerification.js'
import getUserEmailIsVerified from '../controller/getUserEmailIsverified.js'
import { sendOtp } from '../controller/sendUserOTP.js'
import getVerifiedEmail from '../controller/getUserEmailIsverified.js'
const router = express.Router()

router.post('/register', userRegistration)
router.post('/verify-otp', userVerificationOTP)
router.post('/send-otp',sendOtp)
router.post('/login', userLogin)
router.post('/logout', userLogout)
router.post('/create-task', userProtectedRoute, userTaskCreate)
router.post('/delete-task/:id', userDelete)
router.put('/update-task/:id', userProtectedRoute, userTaskUpdate)
router.get('/get-data', userProtectedRoute, getUserData)
router.get('/get-user-data', userProtectedRoute, getUserMainData)
router.put('/update-task-status/:id', userProtectedRoute, userTaskStatusUpdate)
router.get('/user-isverified', getUserEmailIsVerified)
router.get('/get-verified-email', getVerifiedEmail);
router.post('/upload-profile', userProtectedRoute, upload.single('image'), async (req, res) => {
  console.log('the files details', req.file)
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }
    const user = await userModel.findOne({ email: req.user.email })
    user.profile = req.file.filename
    await user.save()
    res.status(200).json({ success: true, message: 'Profile picture updated successfully!' })
  } catch (error) {
    console.error('Error during upload:', error)
    res.status(500).json({ error: 'Failed to upload profile picture.' })
  }
})

router.get('/get-profile', userProtectedRoute, getUserProfile)

export default router
