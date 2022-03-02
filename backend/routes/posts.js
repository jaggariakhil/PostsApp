const express=require('express')
const router=express.Router();
const Post=require('../models/post')
const multer=require("multer");
const checkAuth=require("../middleware/check-auth")



const MIME_TYPE_MAP={
  'image/png':'png',
'imagejpg':'jpg',
  'image/jpeg':'jpg',

}

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    const isValid=MIME_TYPE_MAP[file.mimetype];
    let error=new Error("Invalid Mime Type");
    if(isValid)
    error=null;
    cb(null,"backend/images")
  },
  filename:(req,file,cb)=>{
    const name=file.originalname.toLowerCase().split(' ').join('-');
    const ext=MIME_TYPE_MAP[file.mimetype];
    cb(null,name,+'-'+Date.now()+'-'+ext);



  }
})


router.post(
  
  "/api/posts",checkAuth,multer({storage:storage}).single("image"),(req,res,next)=>{
  const url=req.protocol+"://"+req.get("host");
  const post=new Post({
    title:req.body.title,
    content:req.body.content,
    imagePath:url+'/images/'+req.file.filename
  });
  post.save().then(result=>{
   
    res.status(201).json({message:"post added!",post:{
      id:result._id,
      title:result.title,
      content:result.content,
      imagePath:result.imagePath
    }});
  }
    );
 
  

})

router.put("/api/posts/:id",checkAuth,multer({storage:storage}).single("image"),(req,res,next)=>{
  let imageP=req.body.imagePath;
  if(req.file){
    const url=req.protocol+"://"+req.get("host");
    imageP=url+'/images/'+req.file.filename
  }
  console.log(imageP);
    const post=new Post({
      _id:req.body._id,
      title:req.body.title,
      content:req.body.content,
      imagePath:imageP,
    
  
    })
    Post.updateOne({_id:req.params.id},post).then((result)=>{
      console.log(result);
      res.status(200).json({message:'updated Succesfully'})
    })
  })
  
router.get("/api/posts",(req,res,next)=>
{ 
  const pageSize=+req.query.pagesize;
  const currentPage=+req.query.page;
  console.log(pageSize,currentPage);
  const postQuery=Post.find();
  let fetchedPosts;
   if(pageSize && currentPage){
     postQuery.skip(pageSize * (currentPage-1))
     .limit(pageSize);
   }
  postQuery.then(documents=>{
    fetchedPosts=documents;

    
return Post.count();

  }).then(count=>{
    
    res.status(200).json({message:"msg",posts:fetchedPosts,maxPosts:count});
    //console.log(documents);
  });
})

router.delete("/api/posts/:id",checkAuth,(req,res,next)=>
{
  Post.deleteOne({_id:req.params.id}).
  then(result=>{
    console.log(result);
    res.status(200).json({message:'Post deleted'})
  }).catch(()=>{
    console.log("error");
  })
    
  


});


module.exports=router;