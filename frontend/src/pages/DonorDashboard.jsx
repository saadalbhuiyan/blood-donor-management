// src/pages/DonorDashboard.jsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logoutDonor, getDonorMe, updateDonorMe, updateDonorAvailability } from '../api'

const DonorDashboard = () => {
  const navigate = useNavigate()

  /* ---------- state ---------- */
  const [profile, setProfile] = useState(null)
  const [form, setForm] = useState({})
  const [loading, setLoading] = useState(true)

  /* ---------- fetch profile ---------- */
  const fetchProfile = async () => {
    try {
      const { data } = await getDonorMe()
      setProfile(data)
      setForm({
        name: data.name,
        mobile: data.mobile,
        rollNumber: data.rollNumber,
        batchNumber: data.batchNumber,
        notes: data.notes || ''
      })
    } catch (err) {
      console.error(err)
      alert('Could not load profile')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  /* ---------- handlers ---------- */
  const handleLogout = async () => {
    try {
      await logoutDonor()
      localStorage.removeItem('donor-token')
      navigate('/')
    } catch (err) {
      console.error(err)
      alert('Logout failed')
    }
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    try {
      await updateDonorMe(form)
      await fetchProfile()
      alert('Profile updated!')
    } catch (err) {
      console.error(err)
      alert('Update failed')
    }
  }

  const handleAvailabilityToggle = async () => {
    try {
      await updateDonorAvailability(!profile.availability)
      await fetchProfile()
    } catch (err) {
      console.error(err)
    }
  }

  /* ---------- render ---------- */
  if (loading) return <p>Loading…</p>
  if (!profile) return <p>No profile data</p>

  return (
    <div style={{ maxWidth: 500 }}>
      <h1>Donor Dashboard</h1>

      {/* Profile info */}
      <h2>Profile</h2>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Mobile:</strong> {profile.mobile}</p>
      <p><strong>Roll:</strong> {profile.rollNumber}</p>
      <p><strong>Batch:</strong> {profile.batchNumber}</p>
      <p><strong>Blood Group:</strong> {profile.bloodGroup}</p>
      <p><strong>Availability:</strong> {profile.availability ? 'Available' : 'Unavailable'}</p>

      {/* Availability toggle */}
      <button onClick={handleAvailabilityToggle}>
        Toggle Availability ({profile.availability ? 'Available' : 'Unavailable'})
      </button>

      {/* Edit form */}
      <form onSubmit={handleProfileUpdate}>
        <h2>Edit Profile</h2>
        <label>Name:
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        </label><br />
        <label>Mobile:
          <input value={form.mobile} onChange={e => setForm({ ...form, mobile: e.target.value })} />
        </label><br />
        <label>Roll Number:
          <input value={form.rollNumber} onChange={e => setForm({ ...form, rollNumber: e.target.value })} />
        </label><br />
        <label>Batch Number:
          <input value={form.batchNumber} onChange={e => setForm({ ...form, batchNumber: e.target.value })} />
        </label><br />
        <label>Notes:
          <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
        </label><br />
        <button type="submit">Save Changes</button>
      </form>

      <hr />
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default DonorDashboard