const Interview = require("../model/Interview");
var id = require("../authentication/auth")

exports.registerNewInterview = async (req, res) => {
  try {
    const arrangedbyid = id(req, res)
    const interview = new Interview({
      application_id: req.body.application_id,
      level: req.body.level,
      arrangedby_id: arrangedbyid,
      interviewer_id: req.body.interviewer_id,
      interview_time: req.body.interview_time,
      interview_date: req.body.interview_date,
      feedback: req.body.feedback,
      status: req.body.status,

    });

    let data = await interview.save();
    res.status(201).json({ data });
  } catch (err) {
    if (err.name == 'JsonWebTokenError')
      res.status(401).json(" NO token")
    else
      res.status(400).json({ err: err });
  }
};


exports.getAllInterview = async (req, res) => {
  try {
    // const interview = await Interview.find()
    // res.json(interview)
    Interview.aggregate([
      {
        $lookup:
        {
          from: "users",
          localField: "interviewer_id",
          foreignField: "_id",
          as: "interviewby"
        }
      },
      {
        $lookup:
        {
          from: "users",
          localField: "arrangedby_id",
          foreignField: "_id",
          as: "arrangedby"
        }
      },
      // {
      //   $lookup:
      //   {
      //     from: "jobs",
      //     localField: "job_id",
      //     foreignField: "_id",
      //     as: "job"
      //   }
      // }

    ]).then((result) => {
      res.json(result)
    })
      .catch((error) => {
        console.log(error);
      });


  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
};

exports.deleteInterview = async (req, res) => {
  try {

    let interview = await Interview.findById(req.params.id)
    if (!interview) {
      res.status(404).send("NOT FOUND")
      return
    }

    interview = await Interview.findByIdAndDelete(req.params.id)
    res.json({ "Sucesss": " interview has been deleted" });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }



}

//Route 3: update an existing interview


exports.updateInterview = async (req, res) => {
  try {
    let interview = await Interview.findById(req.params.id)
    if (!interview) { res.status(404).send("NOT FOUND") }
    const { interview_date, interview_time,
      feedback,
      status } = req.body;
    const newInterview = interview
    newInterview.interview_time = interview_time
    newInterview.interview_date = interview_date
    newInterview.feedback = feedback
    newInterview.status = status

    interview = await Interview.findByIdAndUpdate(req.params.id, { $set: newInterview }, { new: true })
    res.json({ interview });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
}


