import jwt from 'jsonwebtoken'

const authenticate = async (req, res, next) => {
  const token = req.cookies.authToken

  if (!token) {
    return res.status(401).json({ message: 'Authentication token is missing. Please log in and try again.' })
  }

  try {
    const data = jwt.verify(token, process.env.SECRET_KEY)
    req.user = data
    next()
  } catch (error) {
    console.error('Token verification error:', error)
    return res.status(403).json({ message: 'Invalid token. Authentication failed.' })
  }
}

export default authenticate
