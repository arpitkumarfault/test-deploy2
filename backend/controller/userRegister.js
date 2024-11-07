import userRegistrationModel from '../models/userModel.js'
import bcrypt from 'bcrypt'
import { tokenGeneration } from './tokenGenerate.js'






const userRegistration = async (req, res) => {
  const { username, email, password,isVerified } = req.body

  // Check if all fields are provided
  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: 'Please enter all the fields' })
  }

  try {
    // Check if user already exists
    const user = await userRegistrationModel.findOne({ email })
    if (user) {
      return res.status(400).json({ success: false, message: 'User already exists' })
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create the user
    const newUser = await userRegistrationModel.create({
      username,
      email,
      password: hashedPassword,
      isVerified,
    })

    // Generate a token
    const token = tokenGeneration({ email, userId: newUser._id }) 

    // Set the token in a cookie and send the response
    res.cookie('authToken', token, { httpOnly: true })
    return res.status(201).json({ success: true, message: 'User registered successfully', user: newUser, token })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
}

export default userRegistration
