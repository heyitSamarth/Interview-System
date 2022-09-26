const express = require("express");
const router = express.Router();
const candidateController = require("../controller/candidateController");

router.post("/register", candidateController.registerNewCandidate);
router.get("/get",candidateController.getAllCandidates);
router.delete("/deletecandidate/:id",candidateController.deleteCandidate);
       
module.exports = router;