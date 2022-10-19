const Candidate = require("../model/Candidate");
var id = require("../authentication/auth")
const cloudinary=require('cloudinary').v2

cloudinary.config({ 
  cloud_name: 'dnllxtzos', 
  api_key: '465496971788836', 
  api_secret: 'j3H7HBtl_U1V_O-cOmPnMyhnonw',
  secure: true
});


exports.registerNewCandidate = async (req, res) => {
  

  const file =req.files.doc;
  cloudinary.uploader.upload(file.tempFilePath,async (err,result)=>{
    try {
      console.log(result.url);
    const createdbyid = id(req, res)
    // console.log(createdbyid)
    const candidate = new Candidate({
      name: req.body.name,
      email: req.body.email,

      createdby_id: createdbyid,
      experience: req.body.experience,
      resume_link: result.url,

    });

    let data = await candidate.save();
    res.status(201).json({ data });
  } catch (err) {
    if (err.name == 'JsonWebTokenError')
      res.status(401).json(" NO token")
    else
      res.status(400).json({ err: err });
  }

    console.log(err);
   })
    
};


exports.getAllCandidates = async (req, res) => {
  try {
    // const candidate = await Candidate.find()
    // res.json(candidate)
    // mongoose.connect("mongodb://localhost:27017/project1", {});
    Candidate.aggregate([
      {
        $lookup:
        {
          from: "users",
          localField: "createdby_id",
          foreignField: "_id",
          as: "createdby"
        }
      }
      
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

exports.deleteCandidate = async (req, res) => {
  try {

    let candidate = await Candidate.findById(req.params.id)
    if (!candidate) {
      res.status(404).send("NOT FOUND")
      return
    }

    candidate = await Candidate.findByIdAndDelete(req.params.id)
    res.json({ "Sucesss": " candidate has been deleted" });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }



}
