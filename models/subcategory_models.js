// creat user model schema
const mongoose=require('mongoose');
const subcategorySchema = new mongoose.Schema({
categoryId:{
	type:mongoose.Schema.Types.ObjectId,
	required:true,
	ref: 'category', 
},	
subcategory_name:{
	type:String,
	required:false, 
},
description:{
	type:String,  
	required:false,
},
subcategory_image: {
    type: String,
    required:false,
},
subcategory_status:{
	type:String,
	required:true,
	default:0
},

},{timestamps:true});
module.exports = SubCategoryModel= mongoose.model("subcategory",subcategorySchema);