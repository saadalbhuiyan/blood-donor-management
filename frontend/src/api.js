import axios from 'axios'

const API_URL = 'http://localhost:5000'

/* ---------- Auth helpers ---------- */
const getAdminHeaders = () => {
  const token = localStorage.getItem('admin-token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

const getDonorHeaders = () => {
  const token = localStorage.getItem('donor-token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

/* ---------- Admin Auth ---------- */
export const loginAdmin = (email) =>
  axios.post(`${API_URL}/api/admin/login`, { email })

export const verifyAdminOtp = (otp, email) =>
  axios.post(`${API_URL}/api/admin/verify-otp`, 
  { otp, email })

export const logoutAdmin = () =>
  axios.post(`${API_URL}/api/admin/logout`, {}, 
  { headers: getAdminHeaders() })

/* ---------- Admin University CRUD ---------- */
export const adminGetUniversities = () =>
  axios.get(`${API_URL}/api/admin/universities`, 
  { headers: getAdminHeaders() })

export const createUniversity = (name) =>
  axios.post(`${API_URL}/api/admin/universities`,
   { name }, { headers: getAdminHeaders() })

export const updateUniversity = (id, name) =>
  axios.put(`${API_URL}/api/admin/universities/${id}`,
   { name }, { headers: getAdminHeaders() })

export const deleteUniversity = (id) =>
  axios.delete(`${API_URL}/api/admin/universities/${id}`, { headers: getAdminHeaders() })

/* ---------- Admin Department CRUD ---------- */
export const adminGetDepartments = (universityId) =>
  axios.get(`${API_URL}/api/admin/universities/
  ${universityId}/departments`,
   { headers: getAdminHeaders() })

export const createDepartment = (universityId, name) =>
  axios.post(`${API_URL}/api/admin/universities/$
  {universityId}/departments`, 
  { name }, { headers: getAdminHeaders() })

export const updateDepartment = (id, name) =>
  axios.put(`${API_URL}/api/admin/departments/${id}`, 
  { name }, 
  { headers: getAdminHeaders() })

export const deleteDepartment = (id) =>
  axios.delete(`${API_URL}/api/admin/departments/${id}`,
   { headers: getAdminHeaders() })

/* ---------- Admin Donor CRUD ---------- */
export const adminGetDonors = () =>
  axios.get(`${API_URL}/api/admin/donors`,
   { headers: getAdminHeaders() })

export const adminGetDonor = (id) =>
  axios.get(`${API_URL}/api/admin/donors/${id}`, 
  { headers: getAdminHeaders() })

export const adminDeleteDonor = (id) =>
  axios.delete(`${API_URL}/api/admin/donors/${id}`, { headers: getAdminHeaders() })

/* ---------- Public endpoints (no auth) ---------- */
export const getBloodGroups = () => axios.get(`${API_URL}/api/blood-groups`)
export const getUniversities = () => axios.get(`${API_URL}/api/universities`)
export const getDepartments = (universityId) =>
  axios.get(`${API_URL}/api/universities/${universityId}/departments`)

/* ---------- Donor Auth & Registration ---------- */
export const registerDonor = (payload) =>
  axios.post(`${API_URL}/api/donors`, payload)

export const loginDonor = (payload) =>
  axios.post(`${API_URL}/api/donors/login`, payload)

export const logoutDonor = () =>
  axios.post(`${API_URL}/api/donors/logout`, {}, { headers: getDonorHeaders() })

/* ---------- Donor Profile ---------- */
export const getDonorMe = () =>
  axios.get(`${API_URL}/api/donors/me`, { headers: getDonorHeaders() })

export const updateDonorMe = (payload) =>
  axios.put(`${API_URL}/api/donors/me`, payload, { headers: getDonorHeaders() })

export const updateDonorAvailability = (availability) =>
  axios.put(
    `${API_URL}/api/donors/me/availability`,
    { availability },
    { headers: getDonorHeaders() }
  )