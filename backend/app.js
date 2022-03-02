const express=require('express');
const mongoose=require('mongoose');
const bd=require('body-parser');
const postRoutes=require("./routes/posts");
const path=require("path")
const userRoutes=require("./routes/user")


const app=express(); 

mongoose.connect("mongodb+srv://akhil:Sunny953@cluster0.bawlk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority").then(()=>{
  console.log("Connection k")
})
.catch(()=>{
  console.log('connection failed');
})

app.use(bd.json());
app.use(bd.urlencoded({extended:false}));
app.use("/images",express.static(path.join("backend/images")));



app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin', '*'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept,Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});



app.use(postRoutes);
//app.use("api/posts",postRoutes);
app.use("/api/user",userRoutes);





module.exports=app;