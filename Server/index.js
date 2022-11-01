const express = require("express");
const PORT = process.env.PORT || 4000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/db");
const fileUplod=require('express-fileupload')
const app = express();



//configure database and mongoose
// mongoose.set("useCreateIndex", true);
mongoose
  .connect(config.database, { useNewUrlParser: true})
  .then(() => {
    console.log("Database is connected");
  })
  .catch(err => {
    console.log({ database_error: err });
  });
// db configuaration ends here

app.use(fileUplod({
  useTempFiles:true
}));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//configure body-parser ends here

app.use(morgan("dev"));

// define first route
app.get("/", (req, res) => {
  console.log("Hello MEVN Soldier");
});

const userRoutes = require("./api/route/user"); //bring in our user routes
app.use("/user", userRoutes);
const candidateRoutes = require("./api/route/candidate"); //bring in our candidates routes
app.use("/candidate", candidateRoutes);
const roleRoutes = require("./api/route/job"); //bring in our job routes
app.use("/job", roleRoutes);
const applicationRoutes = require("./api/route/application"); //bring in our application routes
app.use("/application", applicationRoutes);
const interviewRoutes = require("./api/route/interview"); //bring in our interview routes
app.use("/interview", interviewRoutes);

app.listen(PORT, () => {
  console.log(`project1 is running on ${PORT}`);
});