const jwt = require("jsonwebtoken");
var id = (req, res) => {

    
        // Get the user from jwt token and add id to req

        var token = req.header('auth-token');
        var decoded = jwt.verify(token, "secret");
        // console.log(decoded)
        return decoded._id
   
    }




module.exports=id;


// module.exports = (req, res) => {
//     try {
//         // Get the user from jwt token and add id to req

//         const token = req.header('auth-token');
//         const decoded = jwt.verify(token, "secret");
//         const id = decoded._id
//         // req.userData = decoded;
//         console.log(id);
//     } catch (err) {
//         return res.status(401).json({
//             message: "Authentification Failed"
//         });
//     }
// };