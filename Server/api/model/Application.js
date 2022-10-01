const mongoose = require("mongoose");

const applicationSchema = mongoose.Schema({
  job_id: {
    type: String,
    required: [true, "Please Include your job"]
  },
  candidate_id: {
    type: String,
    required: [true, "Please Include your application"]
  },
  expected_salary: {
    type: String,
  },
  actual_salary:{
    type: String,
  },
  is_job_offered:{
    type: String,
  },

});
  const Application = mongoose.model("Application", applicationSchema);
  module.exports = Application;