import React, { useState } from 'react';

export default function EmployeeForm({ onAdd }) {
  const [form, setForm] = useState({ name: '', email: '', position: '', department: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      alert('Vui lòng điền đầy đủ tên và email!');
      return;
    }
    onAdd(form);
    setForm({ name: '', email: '', position: '', department: '' });
  };

  return (
    <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '30px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h3>Thêm Nhân Viên Mới</h3>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <input 
          type="text" 
          placeholder="Họ và tên" 
          value={form.name} 
          onChange={(e) => setForm({ ...form, name: e.target.value })} 
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={form.email} 
          onChange={(e) => setForm({ ...form, email: e.target.value })} 
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input 
          type="text" 
          placeholder="Chức vụ (Position)" 
          value={form.position} 
          onChange={(e) => setForm({ ...form, position: e.target.value })} 
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input 
          type="text" 
          placeholder="Phòng ban (Department)" 
          value={form.department} 
          onChange={(e) => setForm({ ...form, department: e.target.value })} 
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ gridColumn: 'span 2', padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Thêm Nhân Viên
        </button>
      </form>
    </div>
  );
}