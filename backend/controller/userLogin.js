import userModel from '../models/userModel.js'
import bcrypt from 'bcrypt'
import { tokenGeneration } from './tokenGenerate.js'

export const userLogin = async (req, res) => {
  const { email, password } = req.body
  const user = await userModel.findOne({ email })

  try {
    if (!user) {
      return res.status(401).send('Something went wrong')
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (isPasswordMatch) {
      const token = tokenGeneration({ email, userId: user._id })

      // Set the token in a cookie
      res.cookie('authToken', token, { httpOnly: true })
      return res.send({ message: 'Login successful', token })
    } else {
      return res.status(401).send('Incorrect password')
    }
  } catch (error) {
    console.error(error)
    return res.status(500).send('An error occurred during login')
  }
}
