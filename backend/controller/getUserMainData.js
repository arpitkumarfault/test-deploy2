import userModel from '../models/userModel.js'

const getUserMainData = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email })
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }
    const userData = user || []

    res.send(userData).status(200)
  } catch (error) {
    console.error('Error retrieving user data:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

export default getUserMainData
