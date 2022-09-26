const mongoose = require("mongoose");

const candidateSchema = mongoose.Schema({
  candidate_id:
  {
    type: String,
    required: [true, "Please Include your candidate id"]
  },
  name: {
    type: String,
    required: [true, "Please Include your name"]
  },
  email: {
    type: String,
    required: [true, "Please Include your email"]
  },
  experience: {
    type: String,
    required: [true, "Please Include your experience"]
  },
  resume_link:{
    type: String,
    required: [true, "Please Include your resume link"]
  },
  createdby_id:
  {
    type: String,
    required: [true, "Please Include your role id"]
  },

});
  const Candidate = mongoose.model("Candidate", candidateSchema);
  module.exports = Candidate;