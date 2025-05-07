
const Employee = require("../models/Employee");


exports.createEmployee = async (req, res) => { 
  try {
    const { name, address, role } = req.body;

    // Validate input
    if (!name || !address ||role===undefined  || role === null) {
      return res.status(400).json({ error: "All fields (name, address, role) are required" });
    }


    

    // Create employee
    const newEmployee = new Employee({ name, address, role });
    await newEmployee.save();

    res.status(201).json({
      message: "Employee added successfully!",
      data: {
        _id: newEmployee._id,
        name: newEmployee.name,
        address: newEmployee.address,
        role: newEmployee.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();

    // Map role numbers to role names
    const formattedEmployees = employees.map(emp => ({
      _id: emp._id,
      name: emp.name,
      address: emp.address,
      role: roleMapping[emp.role] || "Unknown"
    }));

    res.status(200).json({ employees: formattedEmployees });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

