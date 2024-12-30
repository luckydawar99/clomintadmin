// creat user model schema
const mongoose=require('mongoose');
const categorySchema = new mongoose.Schema({
	
category_name:{
	type:String,
	required:false, 
},
description:{
	type:String, 
	required:false,
},
category_image: {
    type: String,
    required:false,
},
category_status:{
	type:String,
	required:true,
	default:0
},

},{timestamps:true});
module.exports = CategoryModel= mongoose.model("category",categorySchema);