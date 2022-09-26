
//middlewear for authentication


const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    // Get the user from jwt token and add id to req
  
    const token = req.header('auth-token');
    const decoded = jwt.verify(token, "secret");
    req.userData = decoded;
    // console.log("sam");
    // console.log(req.userData);
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Authentification Failed"
    });
  }
};