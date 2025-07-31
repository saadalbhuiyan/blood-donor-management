import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  adminGetDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment
} from '../api'

const DepartmentManagement = () => {
  const navigate = useNavigate()
  const { universityId } = useParams()

  const [departments, setDepartments] = useState([])
  const [newName, setNewName] = useState('')
  const [edit, setEdit] = useState({ id: '', name: '' })

  const load = async () => {
    const { data } = await adminGetDepartments(universityId)
    setDepartments(data)
  }

  useEffect(() => { load() }, [universityId])

  const handleAdd = async () => {
    if (!newName.trim()) return
    await createDepartment(universityId, newName.trim())
    setNewName('')
    load()
  }

  const handleUpdate = async () => {
    if (!edit.name.trim()) return
    await updateDepartment(edit.id, edit.name.trim())
    setEdit({ id: '', name: '' })
    load()
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this department?')) return
    await deleteDepartment(id)
    load()
  }

  return (
    <div>
      <h2>Departments under university {universityId}</h2>

      <div>
        <input
          placeholder="New department name"
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
          {departments.map((d) => (
            <tr key={d._id}>
              <td>{d.name}</td>
              <td>
                <button onClick={() => setEdit({ id: d._id, name: d.name })}>Edit</button>
                <button onClick={() => handleDelete(d._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => navigate('/universities')}>Back to Universities</button>
    </div>
  )
}

export default DepartmentManagement