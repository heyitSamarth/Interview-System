const mongoose = require("mongoose");
const roleSchema = mongoose.Schema({
  role_name: {
    type: String,
    required: [true, "Please Include your name"]
  },
  role_id:
  {
    type: String,
    required: [true, "Please Include your role id"]
  }
});

  const Role = mongoose.model("Role", roleSchema);
  module.exports = Role;