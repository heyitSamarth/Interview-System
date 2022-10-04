const Application = require("../model/Application");
var id =require("../authentication/auth")

exports.registerNewApplication = async (req, res) => {
    try {
      const createdbyid=id(req,res)
      const application = new Application({
        job_id:req.body.job_id,
        candidate_id:req.body.candidate_id,
        createdby_id:createdbyid,
        expected_salary:req.body.expected_salary,
        actual_salary:req.body.actual_salary,
        is_job_offered:req.body.is_job_offered,

      });
      
      let data = await application.save();
      res.status(201).json({ data });
    } catch (err) {
      if(err.name=='JsonWebTokenError')
      res.status(401).json(" NO token")
      else
      res.status(400).json({ err: err });
    }
  };

  
exports.getAllApplications = async (req, res) => {
    try {
        const application = await Application.find()
        res.json(application)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
};

exports.deleteApplication =async (req, res) => {
  try {

      let application = await Application.findById(req.params.id)
      if(!application){res.status(404).send("NOT FOUND")
    return
    }
      
      application=await Application.findByIdAndDelete(req.params.id)
      res.json({"Sucesss":" application has been deleted"});

  } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
  }


 
}

 //Route 3: update an existing application


 exports.updateApplication =async (req, res) => {
     try {
         let application = await Application.findById(req.params.id)
         if(!application){res.status(404).send("NOT FOUND")}
         const { expected_salary, actual_salary, is_job_offered } = req.body;
         const newApplication={}
         newApplication.job_id=application.job_id
         newApplication.candidate_id=application.candidate_id
        //  if(expected_salary)
         {newApplication.expected_salary=expected_salary}
        //  else
        //  {
        //     newApplication.expected_salary=application.expected_salary
        //  }
        //  if(actual_salary)
         {newApplication.actual_salary=actual_salary}
        //  else
        //  {
        //     newApplication.actual_salary=application.actual_salary
        //  }
        //  if(is_job_offered)
         {newApplication.is_job_offered=is_job_offered}
        //  else
        //  {
        //     newApplication.is_job_offered=application.is_job_offered
        //  }

        //  let application = await Application.findById(req.params.id)
         
         application=await Application.findByIdAndUpdate(req.params.id,{$set:newApplication},{new:true})
         res.json({application});

     } catch (error) {
         console.error(error.message);
         res.status(500).send("Some error occured");
     }
    }

    
