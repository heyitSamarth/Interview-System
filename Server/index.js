const express = require("express");
const PORT = process.env.PORT || 4000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/db");
const app = express();


//configure database and mongoose
// mongoose.set("useCreateIndex", true);
mongoose
  .connect(config.database, { useNewUrlParser: true })
  .then(() => {
    console.log("Database is connected");
  })
  .catch(err => {
    console.log({ database_error: err });
  });
// db configuaration ends here


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
const candidateRoutes = require("./api/route/candidate"); //bring in our user routes
app.use("/candidate", candidateRoutes);
app.listen(PORT, () => {
  console.log(`project1 is running on ${PORT}`);
});