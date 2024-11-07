import jwt from 'jsonwebtoken'

export const tokenGeneration = ({ email, userId }) => {
  return jwt.sign({ email, userId }, process.env.SECRET_KEY) 
}
