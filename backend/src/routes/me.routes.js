const router=require('express').Router();
const {requireAuth}=require('../middleware/auth.middleware');
const User=require('../models/User');

router.get('/',requireAuth,async(req,res)=>{
  try{
    const user=await User.findById(req.user.id).select('-passwordHash').lean();
    if(!user) return res.status(404).json({message:'User not found'});
    res.json({user});
  }catch(error){res.status(500).json({message:error.message});}
});

module.exports=router;
