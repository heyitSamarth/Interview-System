const express = require("express");
const router = express.Router();
const interviewController = require("../controller/interviewController");

router.post("/register", interviewController.registerNewInterview);
router.get("/get",interviewController.getAllInterview);
router.delete("/deleteinterview/:id",interviewController.deleteInterview);
router.put('/updateinterview/:id',interviewController.updateInterview);


       
module.exports = router;