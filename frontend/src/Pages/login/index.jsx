import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai' // Import icons

const LoginPage = () => {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [showPassword, setShowPassword] = useState(false) // State to toggle password visibility
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        '/api/v4/user/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      console.log('Login successful:', response.data)
      setSuccess('✅ Login successful!')
      setTimeout(() => navigate('/home'), 2000) // Redirect to home after 2 seconds
    } catch (error) {
      setError(`❌ ${error.response?.data?.message || error.message}`)
    }
  }

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      {/* Left Container with Background Image */}
      <div
        className="flex-1 bg-cover bg-center md:w-1/2"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1692158961403-4d2a98e9878e?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      >
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
          <div className="text-white text-center">
            <h1 className="text-4xl font-bold">Task Hub</h1>
            <p className="mt-2 text-lg">Your productivity starts here</p>
          </div>
        </div>
      </div>
      {/* Right Container for Login Form */}
      <div className="flex-1 flex items-center justify-center bg-white p-4 md:w-1/2">
        <div className="w-full max-w-md p-8 space-y-6 border-2 hover:border-blue-500 rounded-lg shadow-sm hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
          {error && (
            <p className="text-red-500 text-center transition-transform transform scale-100 hover:scale-105">{error}</p>
          )}
          {/* Display error message with scale effect */}
          {success && (
            <p className="text-green-500 text-center transition-transform transform scale-100 hover:scale-105">
              {success}
            </p>
          )}
          {/* Display success message with scale effect */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                required
                autoComplete="off" // Turn off autocomplete for email field
                className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-blue-300"
                placeholder="Enter your email"
                aria-label="Email"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className='relative flex items-center'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  required
                  className="w-full flex px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-blue-300"
                  placeholder="Enter your password"
                  aria-label="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                >
                  {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 mt-4 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>
          <p className="text-sm text-center text-gray-600">
            Don’t have an account?{' '}
            <a href="/" className="text-blue-500 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
