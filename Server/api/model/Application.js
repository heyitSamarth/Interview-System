const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const applicationSchema = mongoose.Schema({
  job_id: {
    type: Schema.Types.ObjectId,
    required: [true, "Please Include your job"]
  },
  candidate_id: {
    type: Schema.Types.ObjectId,
    required: [true, "Please Include your application"]
  },
  createdby_id:
  {
    type: Schema.Types.ObjectId,
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