const Candidate = require("../model/Candidate");




exports.registerNewCandidate = async (req, res) => {
    try {
        
      const candidate = new Candidate({
        name: req.body.name,
        email: req.body.email,
        candidate_id: req.body.candidate_id,
        createdby_id: req.body.createdby_id,
        experience: req.body.experience,
        resume_link: req.body.resume_link,

      });
      console.log("sam")
      let data = await candidate.save();
      res.status(201).json({ data });
    } catch (err) {
      res.status(400).json({ err: err });
    }
  };

  
exports.getAllCandidates = async (req, res) => {
    try {
        const candidate = await Candidate.find()
        res.json(candidate)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
};

exports.deleteCandidate =async (req, res) => {
  try {

      let candidate = await Note.findById(req.params.id)
      if(!candidate){res.status(404).send("NOT FOUND")}
      candidate=await Note.findByIdAndDelete(req.params.id)
      res.json({"Sucesss":" Note has been deleted"});

  } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
  }


 
}
