const User=require('../models/User')

const adminController = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find({});
      if(!users)return res.status(404).json({message:'empty'})
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
    }
  },

  createUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({message:"User already exists."})
        
      }

      const user = await User.create({ name, email, password });
      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
      } else {
        return res.status(400).json({message:"Invalid user data."})
      
      }
    } catch (error) {
      console.log(error);
    }
  },

  editUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email } = req.body;

      const existingEmail=await User.findOne({ email })
      if (existingEmail) {
        return res.status(400).json({message:"email already exists."})
        
      }

      const user = await User.findById(id);

      if (user) {
        user.name = name || user.name;
        user.email = email || user.email;

        const updatedUser = await user.save();
        res.status(200).json({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
        });
      } else {
        return res.status(404).json({message:"User not found."})
     
      }
    } catch (error) {
      console.log(error);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
  

      const user = await User.findByIdAndDelete(id);
      console.log(user);
      if (user) {
       return res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
        })
      } else {
        return res.status(404).json({message:"User not found."})
      }
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports= adminController