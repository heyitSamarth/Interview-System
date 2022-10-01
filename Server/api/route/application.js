const express = require("express");
const router = express.Router();
const applicationController = require("../controller/applicationController");

router.post("/register", applicationController.registerNewApplication);
router.get("/get",applicationController.getAllApplications);
router.delete("/deleteapplication/:id",applicationController.deleteApplication);
router.put('/updateapplication/:id',applicationController.updateApplication);


       
module.exports = router;