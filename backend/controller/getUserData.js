import userModel from '../models/userModel.js'

const getUserTaskData = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email }).populate('tasks')
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }
    const userData = user.tasks || [] // ensures `userData` is an array even if `tasks` is undefined
    // res.status(200).json(userData);
    console.log("the user data>>>>>?",userData)
    res.send(userData).status(200)
  } catch (error) {
    console.error('Error retrieving user data:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

export default getUserTaskData
