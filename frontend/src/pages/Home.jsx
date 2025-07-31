import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div>
      <h1>Blood Donor System</h1>

      <button onClick={() => navigate('/donor/register')}>Donor Registration</button>
      <button onClick={() => navigate('/donor/login')}>Donor Login</button>
      <button onClick={() => navigate('/admin/login')}>Admin Login</button>
    </div>
  )
}

export default Home