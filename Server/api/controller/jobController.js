const Job = require("../model/Job");

exports.registerNewJob = async (req, res) => {
    try {
        
      const job = new Job({
        job_id:req.body.job_id,
        title:req.body.title,
        openings: req.body.openings,
        discription: req.body.discription,
        createdby_id:req.body.createdby_id,
   
      }
      );
    //   console.log("Sam");
      let data = await job.save();
      res.status(201).json({ data });
    } catch (err) {
      res.status(400).json({ err: err });
    }
  };

  
exports.getJobDetails = async (req, res) => {

    try {
        const job = await Job.find()
        res.json(job)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
};


exports.deleteJob =async (req, res) => {
    try {
  
        let job = await Note.findById(req.params.id)
        if(!job){res.status(404).send("NOT FOUND")}
        job=await Note.findByIdAndDelete(req.params.id)
        res.json({"Sucesss":" Note has been deleted"});
  
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
  
  
   
  }