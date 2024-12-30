// creat user model schema
const mongoose=require('mongoose');
const businessSchema = new mongoose.Schema({ 
userId:{
	type:mongoose.Schema.Types.ObjectId,
	required:true, 
	ref: 'user', 
},	
business_name:{ 
	type:String,
	required:false, 
},
pincode:{
	type:String, 
	required:false,
},
building_name: {
    type: String,
    required:false,
},
colony_name:{
	type:String,
	required:false,
},
area:{
	type:String,
	required:false,
},
landmark:{
	type:String,
	required:false,
},
city:{
	type:String,
	required:false,
},
state:{
	type:String,
	required:false,
},
person_name:{
	type:String,
	required:false,
},
mobile_no:{  
	type: String,
	required:false, 
},
whatsapp_no:{
	type:String,
	required:false,
},
landline_no:{
	type:String,
	required:false,
},
business_timing:{
    type:Array,
    required:false,
},
open_time:{
    type:String,
    required:false,
},
close_time:{
    type:String,
    required:false,
},
business_category:{
    type:String,
    required:false,
},
business_image:{
    type:Array,
    required:false,
},
business_status:{
    type:Number,
    required:true,
    default:0
},
rating:{
    type:Number,
    required:true,
    default:0
},

},{timestamps:true});
module.exports = BusinessModel= mongoose.model("business",businessSchema);