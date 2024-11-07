import userModel from '../models/userModel.js'

const getUserProfile = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email })
    if (!user) {
      return res.status(404).json({ message: 'User profile not found 😣' })
    }

    // Return the user's profile information including the profile image
    res.status(200).json({
      message: 'User profile fetched successfully 😊',
      profileImage: user.profile,
    })
  } catch (error) {
    console.error('Error fetching user profile:', error)
    res.status(500).json({ message: 'Server error occurred while fetching profile 😞' })
  }
}

export default getUserProfile
