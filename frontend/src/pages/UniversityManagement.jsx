import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  adminGetUniversities,
  createUniversity,
  updateUniversity,
  deleteUniversity
} from '../api'

const UniversityManagement = () => {
  const navigate = useNavigate()
  const [universities, setUniversities] = useState([])
  const [newName, setNewName] = useState('')
  const [edit, setEdit] = useState({ id: '', name: '' })

  const load = async () => {
    const { data } = await adminGetUniversities()
    setUniversities(data)
  }

  useEffect(() => { load() }, [])

  const handleAdd = async () => {
    if (!newName.trim()) return
    await createUniversity(newName.trim())
    setNewName('')
    load()
  }

  const handleUpdate = async () => {
    if (!edit.name.trim()) return
    await updateUniversity(edit.id, edit.name.trim())
    setEdit({ id: '', name: '' })
    load()
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this university?')) return
    await deleteUniversity(id)
    load()
  }

  return (
    <div>
      <h2>University Management</h2>

      <div>
        <input
          placeholder="New university name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      {edit.id && (
        <div>
          <input
            value={edit.name}
            onChange={(e) => setEdit({ ...edit, name: e.target.value })}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEdit({ id: '', name: '' })}>Cancel</button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {universities.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>
                <button onClick={() => setEdit({ id: u._id, name: u.name })}>Edit</button>
                <button onClick={() => handleDelete(u._id)}>Delete</button>
                <button onClick={() => navigate(`/universities/${u._id}/departments`)}>
                  Manage Departments
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
    </div>
  )
}

export default UniversityManagement