const express=require('express')
const router=express.Router();
const User=require('../models/user')
const bcrypt=require("bcrypt");
const user = require('../models/user');
const jwt=require("jsonwebtoken")


router.post("/signup",(req,res,next)=>{
  bcrypt.hash(req.body.password,10).then(hash=>{
    const user=new User({
      email:req.body.email,
      password:hash
    });
    user.save().then(result=>{
res.status(201).json({
  message:'user crea',
  result:result
});
    }).catch(err=>{
      res.status(500).json({
        error:err
      })
    })

  })
  
});

router.post("/login",(req,res,next)=>{
  let fetchedUser;
 
  User.findOne({email:req.body.email})
  .then(user=>{
if(!user){
  return res.status(401).json({message:"Auth Failed"});
};
fetchedUser=user;
return bcrypt.compare(req.body.password,user.password);

  }).then(result=>{
    console.log(result);
    if(!result){
      return res.status(401).json({message:"Auth Failed"});
    }
   // console.log(result);
    //json web tokens npm install --save jsonwebtoken
    const token=jwt.sign({email:fetchedUser.email,userId:fetchedUser._id},"secret_this_should_be_long",{expiresIn:'1h'});
    //console.log(token);
    
    res.status(200).json({token:token})



  }).catch(err=>{
    //console.log(err);
    return res.status(401).json({message:"Auth Failed"});
  })
})

module.exports=router;