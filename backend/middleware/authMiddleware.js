const jwt=require('jsonwebtoken')
const User=require('../models/User')
const token = process.env.ACCESS_TOKEN_SECRET;

const protect = async (req, res, next) => {
  try {
    let token;
    token = req.cookies.jwt;
    console.log(token,"hello");
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(decoded);
        req.user = await User.findById(decoded.userId).select("-password");

        next();
      } catch (error) {
        console.error(error);
       return res.status(401).json({error:"Not authorized, token failed"})
     
      }
    } else {
      return res.status(401).json({error:"Not authorized, no token"})
    
    }{}
  } catch (error) {
    console.log(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(401).json({error:"not authorized, no privillege"})
  
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports ={ protect, isAdmin };
