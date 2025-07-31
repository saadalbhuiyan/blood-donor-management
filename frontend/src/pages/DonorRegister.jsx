import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBloodGroups, getUniversities, getDepartments, registerDonor } from '../api';

const DonorRegister = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    mobile: '',
    rollNumber: '',
    batchNumber: '',
    bloodGroup: '',
    university: '',
    department: ''
  });

  const [bloodGroups, setBloodGroups] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [departments, setDepartments] = useState([]);

  // রক্তের গ্রুপ ও বিশ্ববিদ্যালয় লোড
  useEffect(() => {
    getBloodGroups().then(res => setBloodGroups(res.data));
    getUniversities().then(res => setUniversities(res.data));
  }, []);

  // বিশ্ববিদ্যালয় পরিবর্তনে ডিপার্টমেন্ট লোড
  useEffect(() => {
    if (!form.university) return;
    getDepartments(form.university).then(res => setDepartments(res.data));
  }, [form.university]);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await registerDonor(form);
    alert('Registration successful!');
    navigate('/donor/login');
  };

  return (
    <div>
      <h2>Donor Registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="mobile"
          placeholder="Mobile"
          value={form.mobile}
          onChange={handleChange}
          required
        />
        <input
          name="rollNumber"
          placeholder="Roll Number"
          value={form.rollNumber}
          onChange={handleChange}
          required
        />
        <input
          name="batchNumber"
          placeholder="Batch"
          value={form.batchNumber}
          onChange={handleChange}
          required
        />

        <select
          name="bloodGroup"
          value={form.bloodGroup}
          onChange={handleChange}
          required
        >
          <option value="">-- Blood Group --</option>
          {bloodGroups.map(b => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        <select
          name="university"
          value={form.university}
          onChange={handleChange}
          required
        >
          <option value="">-- University --</option>
          {universities.map(u => (
            <option key={u._id} value={u._id}>
              {u.name}
            </option>
          ))}
        </select>

        <select
          name="department"
          value={form.department}
          onChange={handleChange}
          required
        >
          <option value="">-- Department --</option>
          {departments.map(d => (
            <option key={d._id} value={d._id}>
              {d.name}
            </option>
          ))}
        </select>

        <button type="submit">Register</button>
      </form>
      <button onClick={() => navigate('/')}>Back</button>
    </div>
  );
};

export default DonorRegister;