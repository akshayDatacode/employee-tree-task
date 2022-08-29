const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    password: { type: String },
    email: { type: String },
  },

  {
    timestamps: [{ createdAt: "created_at", updatedAt: "updated_at" }],
  }
);

module.exports = mongoose.model("User", UserSchema);
