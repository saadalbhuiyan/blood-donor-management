import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminGetDonors, adminGetDonor, adminDeleteDonor } from '../api'

const DonorManagement = () => {
  const navigate = useNavigate()
  const [donors, setDonors] = useState([])
  const [detail, setDetail] = useState(null)

  const load = async () => {
    const { data } = await adminGetDonors()
    setDonors(data)
    setDetail(null)
  }

  useEffect(() => { load() }, [])

  const showDetail = async (id) => {
    const { data } = await adminGetDonor(id)
    setDetail(data)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this donor?'))
     return
    await adminDeleteDonor(id)
    load()
  }

  return (
    <div>
      <h2>Donor Management (Admin)</h2>
      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>

      {detail ? (
        <div>
          <h3>Donor Details</h3>
          <p><strong>Name:</strong> {detail.name}</p>
          <p><strong>Mobile:</strong> {detail.mobile}</p>
          <p><strong>Roll #:</strong> {detail.rollNumber}</p>
          <p><strong>Batch:</strong> {detail.batchNumber}</p>
          <p><strong>Blood Group:</strong> {detail.bloodGroup}</p>
          <p><strong>University:</strong> {detail.university}</p>
          <p><strong>Department:</strong> {detail.department}</p>
          <p><strong>Availability:</strong> {detail.availability ? 'Yes' : 'No'}</p>
          <p><strong>Notes:</strong> {detail.notes || '-'}</p>
          <button onClick={() => setDetail(null)}>Close Details</button>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donors.map(d => (
              <tr key={d._id}>
                <td>{d.name}</td>
                <td>{d.mobile}</td>
                <td>
                  <button onClick={() => showDetail(d._id)}>View</button>
                  <button onClick={() => handleDelete(d._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default DonorManagement