const mongoose=require('mongoose');
const pSchema=mongoose.Schema({
  title:{type:String,required:true},
  content:{type:String,required:true},
  imagePath:{type:String,required:true},


});
module.exports=mongoose.model('Post',pSchema);