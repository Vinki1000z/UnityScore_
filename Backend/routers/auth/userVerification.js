const express = require("express");
const router = express.Router();

//  importing the users_schema
const auth = require("../../models/users_schema");

const userVerification=require("../../middleware/userVerification.js")

//  api/auth/userVerification
router.get("/userVerification",userVerification,async(req,res)=>{
    try {
      let userId = req.user.id;
      const client = await auth.findById(userId).select("-password");
      res.json({msg:"Id of the user",client,success:true});
    }  catch (error) {
      res.json({msg:"Error comes in the Getting Id From The Token",error});
  }
  })

module.exports=router