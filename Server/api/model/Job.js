const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
  title:
  {
    type: String,
    required: [true, "Please Include title"]
  },
  openings: {
    type: Number,
    required: [true, "Please Include number of openings"] 
  },
  discription: {
    type: String,
    required: [true, "Please Include discription"]
  },
  createdby_id:
  {
    type: String,
    required: [true, "Please Include created by id"]
  },

});
  const Job = mongoose.model("Job", jobSchema);
  module.exports = Job;