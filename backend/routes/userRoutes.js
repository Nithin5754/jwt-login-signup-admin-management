const express = require('express')
const router = express.Router()
const userController = require('../controllers/usersController')
const multer =require( "multer")
const {protect}=require('../middleware/authMiddleware')
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
      callback(null, "uploads/");
  },
  filename: function (req, file, callback) {
      callback(null, Date.now() + "-" + file.originalname); 
  },
});
  
  const upload = multer({ storage: storage });
  

  
  router.post("/", userController.registerUser);
  router.post("/auth", userController.authUser); 
  router.post("/logout", userController.logoutUser);
  router.post("/uploads", upload.single("avatar"), (req, res) => {
    if (req.file) {
        res.send(req.file.path);
    } else {
        res.status(400).send("No file uploaded");
    }
});
  router 
    .route("/profile")
    .get(protect, userController.getUserProfile)
    .put(protect, userController.updateUserProfile);
  

module.exports = router
