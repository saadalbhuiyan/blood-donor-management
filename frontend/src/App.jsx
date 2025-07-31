import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import DonorRegister from './pages/DonorRegister'
import DonorLogin from './pages/DonorLogin'
import DonorDashboard from './pages/DonorDashboard'

import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import UniversityManagement from './pages/UniversityManagement'
import DepartmentManagement from './pages/DepartmentManagement'
import DonorManagement from './pages/DonorManagement'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/donor/register" element={<DonorRegister />} />
        <Route path="/donor/login" element={<DonorLogin />} />
        <Route path="/donor/dashboard" element={<DonorDashboard />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/universities" element={<UniversityManagement />} />
        <Route path="/universities/:universityId/departments" element={<DepartmentManagement />} />
        <Route path="/donors" element={<DonorManagement />} />
      </Routes>
    </Router>
  )
}

export default App