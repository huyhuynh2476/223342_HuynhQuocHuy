import React from 'react';

export default function EmployeeList({ employees, onDelete }) {
  return (
    <div>
      <h3>Danh Sách Nhân Sự</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <thead>
          <tr style={{ background: '#007bff', color: 'white', textAlign: 'left' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Họ Tên</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Chức Vụ</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Phòng Ban</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {employees && employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp._id || emp.id}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{emp.name}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{emp.email}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{emp.position}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{emp.department}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                  <button 
                    onClick={() => onDelete(emp._id || emp.id)} 
                    style={{ background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>Không có nhân viên nào trong hệ thống.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}