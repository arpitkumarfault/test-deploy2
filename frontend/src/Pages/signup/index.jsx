import axios from 'axios'
import { useState } from 'react'
import { useNavigate, NavLink, useLocation } from 'react-router-dom'

const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState({ text: '', type: '' })
  const [animationClass, setAnimationClass] = useState('')
  const location = useLocation()
  const { email, isVerified } = location.state || {}
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axios.post(
        '/api/v4/user/register',
        { username, email, password, isVerified },
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true },
      )

      if (data.success) {
        setMessage({ text: data.message, type: 'success' })
        setTimeout(() => navigate('/login'), 2000)
      } else {
        setMessage({ text: data.message || 'Registration failed. Please try again.', type: 'error' })
      }
    } catch (error) {
      console.error('Error during registration:', error)
      setMessage({ text: 'An error occurred during registration. Please try again later.', type: 'error' })
      setAnimationClass('animate-fail')
    }
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Side Container for Image and Overlay */}
      <div className="flex-1 bg-gradient-to-r from-blue-700 to-indigo-700 flex items-center justify-center relative">
        <img
          src="https://images.unsplash.com/photo-1553034545-32d4cd2168f1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Task Hub Background"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold text-white">
            Task <span className="text-blue-400">Hub</span>
          </h1>
          <h2 className="mt-2 font-bold text-xl text-white">
            Your <span className="text-blue-400">ultimate</span> task management solution
          </h2>
        </div>
      </div>

      {/* Right Side Container for Registration Form */}
      <div className="flex-1 flex items-center justify-center bg-white p-4 lg:p-0">
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-xl border-[2px] rounded-lg hover:shadow-2xl hover:border-blue-500">
          <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>

          {message.text && (
            <p
              className={`text-center ${
                message.type === 'success' ? 'text-green-500' : 'text-red-500'
              } transition-all duration-500 ${animationClass}`}
            >
              {message.type === 'success' ? '🎉 ' : '❌ '}
              {message.text}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={username}
                disabled={isVerified ? false : true}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-indigo-300"
                placeholder="Enter your username"
                aria-label="Username"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                disabled={email ? false : true}
                required
                className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-indigo-300"
                placeholder="Enter your email"
                aria-label="Email"
              />
              {isVerified ? (
                <p className="text-green-500 text-xs mt-1">Email is verified</p>
              ) : (
                <NavLink to="email-verify" className="text-xs mt-1 text-blue-500 hover:underline cursor-pointer">
                  Verify Your Email
                </NavLink>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                disabled={isVerified?false :true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-indigo-300"
                placeholder="Enter your password"
                aria-label="Password"
              />
            </div>
            <button
              type="submit"
              disabled={!isVerified}
              className={`w-full py-2 mt-4 font-semibold text-white rounded-md transition-colors ${
                isVerified ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Register
            </button>
          </form>
          <p className="text-sm text-center text-gray-600">
            Already have an account?{' '}
            <NavLink to="/login" className="text-indigo-500 hover:underline">
              Login here
            </NavLink>
          </p>
        </div>
      </div>
      <div className="hidden">
        {/* <EmailVerification setVerifiedEmail={setEmail} setEmailVerified={setIsVerified} /> */}
      </div>
    </div>
  )
}

export default RegisterPage
