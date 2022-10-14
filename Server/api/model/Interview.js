const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const interviewSchema = mongoose.Schema({
  application_id: {
    type: Schema.Types.ObjectId,
    required: [true, "Please Include your job"]
  },
  level: {
    type: String,
    required: [true, "Please Include your interview"]
  },
  arrangedby_id:{
    type: Schema.Types.ObjectId,
    required: [true, "Please Include your interview"]
  },
  interviewer_id:
  {
    type: Schema.Types.ObjectId,
    required: [true, "Please Include your interview"]
  },
  interview_time: {
    type: String,
  },
  interview_date: {
    type: String,
  },
  feedback:{
    type: String,
  },
    status:{
    type: String,
  },

});
  const Interview = mongoose.model("Interview", interviewSchema);
  module.exports = Interview;