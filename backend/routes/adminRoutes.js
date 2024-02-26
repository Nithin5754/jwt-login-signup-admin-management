
const express=require('express')

const adminController=require('../controllers/adminController')
const { protect, isAdmin }  =require('../middleware/authMiddleware')

const router=express.Router()


router
  .route("/users")
  .post(protect, isAdmin, adminController.createUser)
  .get(protect, isAdmin, adminController.getUsers);
router
  .route("/users/:id")
  .put(protect, isAdmin, adminController.editUser)
  .delete( protect, isAdmin, adminController.deleteUser);


  module.exports=router