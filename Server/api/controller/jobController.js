const Job = require("../model/Job");

exports.registerNewJob = async (req, res) => {
    try {
        
      const job = new Job({
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
      console.log("delete");
        let job = await Job.findById(req.params.id)
        
        if(!job){res.status(403).send("NOT FOUND")
      return
      }
        job=await Job.findByIdAndDelete(req.params.id)
        res.json({"Sucesss":" Job has been deleted"});
  
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
  
  
   
  }