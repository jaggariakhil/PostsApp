const jwt=require("jsonwebtoken");

module.exports=(req,res,next)=>{
  try{
    const token=req.headers.authorization.split(" ")[1]
    //"Bearer fadddddddddsssssssssrfcxc"
    jwt.verify(token,"secret_this_should_be_long");
    next();
  }catch(err){
    res.status(401).json({msg:"auth failed1!"});
  }
 
};