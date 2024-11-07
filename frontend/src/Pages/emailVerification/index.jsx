import axios from 'axios'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const EmailVerification = () => {
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })
  const [isVerified, setIsVerified] = useState(false)
  const [otp, setOtp] = useState(Array(6).fill(''))
  const inputRefs = useRef([])
  const navigate = useNavigate()

  const handleOtpChange = (value, index) => {
    if (isNaN(value)) return 

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && !otp[index]) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handleSendEmail = () => {
    setEmailSent(true)
    handleSendOtp()
  }

  const handleSendOtp = async () => {
    try {
      const { data } = await axios.post(
        '/api/v4/user/send-otp',
        { email },
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true },
      )
      setMessage({ text: 'OTP sent to your email.', type: 'info' })
    } catch (error) {
      setMessage({ text: 'Failed to send OTP. Please try again.', type: 'error' })
    }
  }

  const handleVerifyOtp = async () => {
    const otpCode = otp.join('')
    if (otpCode.length !== 6) {
      setMessage({ text: 'Please enter the complete 6-digit OTP.', type: 'error' })
      return
    }

    try {
      const { data } = await axios.post('/api/v4/user/verify-otp', { email, otp: otpCode }, { withCredentials: true })
      if (data.success) {
        setIsVerified(true)
        setEmail(data.data.email)
        setIsVerified(data.data.isVerified)
        setMessage({ text: 'Email verified successfully.', type: 'success' })

        // Sending data to Register page via state
        setTimeout(() => navigate('/', { state: { email: data.data.email, isVerified: data.data.isVerified } }), 3000)
      } else {
        setMessage({ text: 'Invalid OTP. Please try again.', type: 'error' })
      }
    } catch (error) {
      setMessage({ text: 'Failed to verify OTP. Please try again.', type: 'error' })
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full mx-4 transform transition duration-300 hover:scale-105">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Email Verification</h2>
        <p className="text-gray-600 text-center mb-6">Enter your email to receive a 6-digit OTP.</p>

        {!emailSent ? (
          <div className="flex flex-col items-center">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            />
            <button
              onClick={handleSendEmail}
              className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 transform hover:scale-105"
            >
              Send Email
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center animate-fadeIn mt-4">
            <p className="text-gray-600 text-center mb-4">Enter the OTP sent to your email</p>
            <div className="flex space-x-2">
              {otp.map((_, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={otp[index]}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center border rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 transform hover:scale-105"
                />
              ))}
            </div>
            <button
              onClick={handleVerifyOtp}
              className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 transform hover:scale-105"
            >
              Verify OTP
            </button>
          </div>
        )}
        {message.text && (
          <p
            className={`text-center mt-4 ${
              message.type === 'success'
                ? 'text-green-500'
                : message.type === 'error'
                ? 'text-red-500'
                : 'text-blue-500'
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  )
}

export default EmailVerification
