
const jwt=require('jsonwebtoken')
const tokenE = process.env.ACCESS_TOKEN_SECRET;
const generateToken = (res, userId) => {
  
  const token = jwt.sign({ userId }, `${tokenE}`, {
    expiresIn: "30d",
  }); 

res.cookie("jwt", token, {
 httpOnly: true,
 secure: true, 
 sameSite: 'None',
 maxAge: 30 * 24 * 60 * 60 * 1000, 
});


}; 

module.exports=generateToken;