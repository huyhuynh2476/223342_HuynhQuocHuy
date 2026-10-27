const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// 1. GET /api/employees (Hỗ trợ tìm kiếm: /api/employees?search=...)
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = {
        $or: [
          { employeeId: { $regex: search, $options: 'i' } },
          { fullName: { $regex: search, $options: 'i' } }
        ]
      };
    }
    const employees = await Employee.find(query);
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// 2. GET /api/employees/:id (Lấy thông tin nhân viên theo ID)
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Không tìm thấy nhân viên' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ message: 'ID không hợp lệ', error: error.message });
  }
});

// 3. POST /api/employees (Thêm nhân viên mới, kiểm tra trùng mã & trường bắt buộc)
router.post('/', async (req, res) => {
  try {
    const { employeeId, fullName, email } = req.body;
    
    // Kiểm tra dữ liệu đầu vào tối thiểu
    if (!employeeId || !fullName || !email) {
      return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ các trường bắt buộc: employeeId, fullName, email' });
    }

    // Kiểm tra mã nhân viên không bị trùng lặp
    const existingEmployee = await Employee.findOne({ employeeId });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Mã nhân viên đã tồn tại trong hệ thống' });
    }

    const newEmployee = new Employee(req.body);
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi thêm nhân viên', error: error.message });
  }
});

// 4. PUT /api/employees/:id (Cập nhật thông tin nhân viên)
router.put('/:id', async (req, res) => {
  try {
    const { employeeId } = req.body;
    if (employeeId) {
      const existingEmployee = await Employee.findOne({ employeeId, _id: { $ne: req.params.id } });
      if (existingEmployee) {
        return res.status(400).json({ message: 'Mã nhân viên đã tồn tại ở bản ghi khác' });
      }
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Không tìm thấy nhân viên để cập nhật' });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi cập nhật nhân viên', error: error.message });
  }
});

// 5. DELETE /api/employees/:id (Xóa nhân viên)
router.delete('/:id', async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Không tìm thấy nhân viên để xóa' });
    }
    res.status(200).json({ message: 'Xóa nhân viên thành công', deletedEmployee });
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi xóa nhân viên', error: error.message });
  }
});

module.exports = router;