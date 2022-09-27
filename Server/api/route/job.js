const express = require("express");
const router = express.Router();
const jobController = require("../controller/jobController");
// const auth=require("../../config/auth")

router.post("/register", jobController.registerNewJob);
router.get("/get", jobController.getJobDetails);
router.delete("/deletejob", jobController.deleteJob);

module.exports = router;