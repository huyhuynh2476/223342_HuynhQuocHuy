import React, { useState, useEffect } from 'react';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from './services/employeeService';
import './index.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [form, setForm] = useState({
    employeeId: '',
    fullName: '',
    gender: 'Nam',
    dateOfBirth: '',
    department: '',
    position: '',
    email: '',
    phone: '',
    hireDate: '',
    status: 'Đang làm việc'
  });
  
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    const results = employees.filter(emp => 
      (emp.fullName && emp.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (emp.employeeId && emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (emp.email && emp.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (emp.department && emp.department.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredEmployees(results);
  }, [searchTerm, employees]);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
      setFilteredEmployees(data);
    } catch (error) {
      console.error("Không thể tải dữ liệu nhân viên");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.employeeId || !form.fullName || !form.email) {
      alert('Vui lòng điền đầy đủ Mã nhân viên, Họ và tên, và Email!');
      return;
    }

    try {
      if (editingId) {
        await updateEmployee(editingId, form);
        alert('Cập nhật nhân viên thành công!');
      } else {
        await createEmployee(form);
        alert('Thêm nhân viên thành công!');
      }
      
      setForm({
        employeeId: '',
        fullName: '',
        gender: 'Nam',
        dateOfBirth: '',
        department: '',
        position: '',
        email: '',
        phone: '',
        hireDate: '',
        status: 'Đang làm việc'
      });
      setEditingId(null);
      fetchEmployees();
    } catch (error) {
      alert('Thực hiện thất bại, vui lòng kiểm tra lại!');
    }
  };

  const handleEdit = (emp) => {
    setForm({
      employeeId: emp.employeeId || '',
      fullName: emp.fullName || '',
      gender: emp.gender || 'Nam',
      dateOfBirth: emp.dateOfBirth || '',
      department: emp.department || '',
      position: emp.position || '',
      email: emp.email || '',
      phone: emp.phone || '',
      hireDate: emp.hireDate || '',
      status: emp.status || 'Đang làm việc'
    });
    setEditingId(emp._id || emp.id);
  };

  const handleCancelEdit = () => {
    setForm({
      employeeId: '',
      fullName: '',
      gender: 'Nam',
      dateOfBirth: '',
      department: '',
      position: '',
      email: '',
      phone: '',
      hireDate: '',
      status: 'Đang làm việc'
    });
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa nhân viên này không?')) {
      try {
        await deleteEmployee(id);
        fetchEmployees();
      } catch (error) {
        alert('Xóa nhân viên thất bại!');
      }
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '30px auto', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>HỆ THỐNG QUẢN LÝ NHÂN SỰ</h2>
      
      {/* Form Thêm / Sửa Nhân Viên */}
      <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '30px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3>{editingId ? 'Cập Nhật Thông Tin Nhân Viên' : 'Thêm Nhân Viên Mới'}</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Mã nhân viên" 
            value={form.employeeId} 
            onChange={(e) => setForm({ ...form, employeeId: e.target.value })} 
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input 
            type="text" 
            placeholder="Họ và tên" 
            value={form.fullName} 
            onChange={(e) => setForm({ ...form, fullName: e.target.value })} 
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <select 
            value={form.gender} 
            onChange={(e) => setForm({ ...form, gender: e.target.value })} 
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </select>
          <input 
            type="text" 
            placeholder="Ngày sinh" 
            value={form.dateOfBirth} 
            onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })} 
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input 
            type="text" 
            placeholder="Phòng ban" 
            value={form.department} 
            onChange={(e) => setForm({ ...form, department: e.target.value })} 
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input 
            type="text" 
            placeholder="Chức vụ" 
            value={form.position} 
            onChange={(e) => setForm({ ...form, position: e.target.value })} 
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
            placeholder="Số điện thoại" 
            value={form.phone} 
            onChange={(e) => setForm({ ...form, phone: e.target.value })} 
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input 
            type="text" 
            placeholder="Ngày vào làm" 
            value={form.hireDate} 
            onChange={(e) => setForm({ ...form, hireDate: e.target.value })} 
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <select 
            value={form.status} 
            onChange={(e) => setForm({ ...form, status: e.target.value })} 
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', gridColumn: 'span 3' }}
          >
            <option value="Đang làm việc">Đang làm việc</option>
            <option value="Không làm việc">Không làm việc</option>
          </select>

          <div style={{ gridColumn: 'span 3', display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="submit" style={{ flex: 1, padding: '10px', background: editingId ? '#28a745' : '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              {editingId ? 'Lưu Thay Đổi' : 'Thêm Nhân Viên'}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancelEdit} style={{ padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Hủy
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Thanh Tìm Kiếm & Danh Sách */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Danh Sách Nhân Sự</h3>
        <input 
          type="text" 
          placeholder="🔍 Tìm kiếm nhân viên..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '8px 12px', width: '300px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', background: 'white', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#007bff', color: 'white', textAlign: 'left' }}>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Mã NV</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Họ Tên</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Giới Tính</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Phòng Ban</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Chức Vụ</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Email / SĐT</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Trạng Thái</th>
                <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp) => (
                  <tr key={emp._id || emp.id}>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{emp.employeeId}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{emp.fullName}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{emp.gender}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{emp.department}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{emp.position}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{emp.email}<br/><small>{emp.phone}</small></td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{emp.status}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>
                      <button 
                        onClick={() => handleEdit(emp)} 
                        style={{ background: '#ffc107', color: '#333', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', marginRight: '5px', fontWeight: 'bold' }}
                      >
                        Sửa
                      </button>
                      <button 
                        onClick={() => handleDelete(emp._id || emp.id)} 
                        style={{ background: '#dc3545', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '20px', color: '#777' }}>Không có nhân viên nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;