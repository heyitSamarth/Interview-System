const Candidate = require("../model/Candidate");
const User = require("../model/User");
var id =require("../authentication/auth")



exports.registerNewCandidate = async (req, res) => {
    try {
      const createdbyid=id(req,res)
      console.log(createdbyid)
      const candidate = new Candidate({
        name: req.body.name,
        email: req.body.email,
        
        createdby_id: createdbyid,
        experience: req.body.experience,
        resume_link: req.body.resume_link,

      });
      
      let data = await candidate.save();
      res.status(201).json({ data });
    } catch (err) {
      if(err.name=='JsonWebTokenError')
      res.status(401).json(" NO token")
      else
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

      let candidate = await Candidate.findById(req.params.id)
      if(!candidate){res.status(404).send("NOT FOUND")
    return
    }
      
      candidate=await Candidate.findByIdAndDelete(req.params.id)
      res.json({"Sucesss":" candidate has been deleted"});

  } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
  }


 
}
