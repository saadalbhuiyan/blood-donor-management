import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginAdmin, verifyAdminOtp } from '../api'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      await loginAdmin(email)
      setIsOtpSent(true)
      setErrorMessage('')
    } catch (err) {
      console.error(err)
      setErrorMessage('Failed to send OTP. Try again later.')
    }
  }

  const handleOtpVerification = async () => {
    try {
      const { data } = await verifyAdminOtp(otp, email)
      if (data.token) {
        localStorage.setItem('admin-token', data.token)
        navigate('/dashboard')
      } else {
        setErrorMessage('Invalid OTP.')
      }
    } catch (err) {
      console.error(err)
      setErrorMessage('OTP verification failed.')
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Admin Login</h2>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {!isOtpSent ? (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleLogin}>Send OTP</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleOtpVerification}>Verify OTP</button>
        </>
      )}
    </div>
  )
}

export default AdminLogin