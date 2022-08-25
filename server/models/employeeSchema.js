const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    password: { type: String },
    email: { type: String },
    role: { type: String },
    line_manager: { type: String },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
  },

  {
    timestamps: [{ createdAt: "created_at", updatedAt: "updated_at" }],
  }
);

module.exports = mongoose.model("Employee", EmployeeSchema);
