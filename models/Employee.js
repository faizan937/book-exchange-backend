const mongoose = require("mongoose");

const roleMapping = {
    1: "manager",
    2: "senior developer",
    3: "junior developer",
    4: "HR",
    5: "CTO"
};

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: Object.values(roleMapping), // Ensure only allowed roles are stored
        set: (role) => roleMapping[role] || role // Automatically convert numbers to role names
    }
});

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;
