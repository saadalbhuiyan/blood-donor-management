import React from 'react'
import { useNavigate } from 'react-router-dom'
import { logoutAdmin } from '../api'

const AdminDashboard = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logoutAdmin()
      localStorage.removeItem('admin-token')
      navigate('/login')
    } catch (err) {
      console.error(err)
      alert('Something went wrong while logging out.')
    }
  }

  return (
    <div>
      <h1>Welcome to Admin Dashboard</h1>

      <button onClick={() => navigate('/universities')}>Manage Universities</button>
      <button onClick={() => navigate('/universities')}>Manage Departments</button>
      <button onClick={() => navigate('/donors')}>Manage Donors</button>

      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default AdminDashboard