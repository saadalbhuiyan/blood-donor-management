import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginDonor } from '../api'

const DonorLogin = () => {
  const navigate = useNavigate()
  const [mobile, setMobile] = useState('')
  const [rollNumber, setRollNumber] = useState('')

  const handleLogin = async e => {
    e.preventDefault()
    const { data } = await loginDonor({ mobile, rollNumber })
    localStorage.setItem('donor-token', data.token)
    alert('Logged in')
    navigate('/donor/dashboard')
  }

  return (
    <div>
      <h2>Donor Login</h2>
      <form onSubmit={handleLogin}>
        <input placeholder="Mobile" value={mobile} onChange={e => setMobile(e.target.value)} required />
        <input placeholder="Roll Number" value={rollNumber} onChange={e => setRollNumber(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <button onClick={() => navigate('/')}>Back</button>
    </div>
  )
}

export default DonorLogin