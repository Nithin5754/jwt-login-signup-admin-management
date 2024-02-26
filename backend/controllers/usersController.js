const User = require('../models/User')
const generateToken=require('../utils/generateToken')



const usersController = {
    authUser: async (req, res) => {
      try {
        const { email, password } = req.body;


  
        const user = await User.findOne({ email });
  
        if (user && (await user.matchPassword(password))) {
          generateToken(res, user._id);
  
          res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            image: user.imageURL,
            isAdmin: user.isAdmin,
          });
        } else {
            return  res.status(404).json({ message: "Invalid email or password" });
        }
      } catch (err) {
        res.status(401).json({ message: "Invalid credentials" });
        console.log(err);
      }
    },
  
    registerUser: async (req, res) => {
      try {
        const { name, email, password ,isAdmin} = req.body;
        console.log(req.body)
        if(!name||!email||!password)return res.status(400).json({ message: "all fields required" })
  
        console.log(`register new user: ${req.body}`);
  
        const userExists = await User.findOne({ email });
  
        if (userExists) {
      
        return  res.status(400).json({ message: "User already exists" });
          
        }
  
        const user = await User.create({
          name,
          email,
          password,
          image: "",
          isAdmin
        });
        if (user) {
          generateToken(res, user._id);
          res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            image: user.image,
          });
        } else {
            
        return  res.status(400).json({ message: "Invalid user data" });
         
        }
      } catch (error) {
        console.log(error);
      }
    },
  
    logoutUser: (req, res) => {
      try {
        res.cookie("jwt", "", {
          httpOnly: true,
          expires: new Date(0),
        });
        res.status(200).json({ message: "Logged out successfully" });
      } catch (error) {
        console.log(error);
      }
    },
  
    getUserProfile: async (req, res) => {
      try {
        if (req.user) {
          res.json({
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            image: req.user.image,
          });
        } else {
      
          return  res.status(404).json({ message: "User not found" });
        }
      } catch (error) {
        console.log(error);
      }
    },
  
    updateUserProfile: async (req, res) => {
      try {
  
        const user = await User.findById(req.user._id);
        if (user) {
          user.name = req.body.name || user.name;
          user.email = req.body.email || user.email;
          user.imageURL = req.body.imageUrl || user.imageURL;
       
          if (req.body.password) {
            user.password = req.body.password;
          }
          const updatedUser = await user.save();
  
          res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            image: updatedUser.imageURL,
            email: updatedUser.email,
          });
        } else {
     return  res.status(404).json({ message: "User not found" });
        }
      } catch (error) {
        console.log(error);
      }
    },
  };
  
  module.exports=  usersController ;