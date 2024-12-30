// creat user model schema
const mongoose=require('mongoose');
const userSchema = new mongoose.Schema({
	
mobile_no:{ 
	type:String,
	required:false, 
},
otp:{
	type:String, 
	required:false,
},
first_name:{
	type:String, 
	required:false,
},
last_name:{
	type:String, 
	required:false,
},
company_name:{
	type:String, 
	required:false,
},
address:{
	type:String,
	required:false,
},
city_name:{
	type:String,
	required:false,
},
state:{
	type:String,
	required:false,
},
country:{
	type:String,
	required:false,
},
post_code:{
	type:String,
	required:false,
},
website:{
	type:String,
	required:false,
},
phone_no:{
	type:String,
	required:false,
},
date_of_birth:{
	type:String,
	required:false,
},
profile_image: {
    type: String,
    required:false,
},
email:{
	type:String,
	required:false,
},
role_type:{
	type:String,
	required:false,
},
user_type:{
	type:String,
	required:false,
},
fcm_id:{
	type:String,
	required:false,
},
token:{  
	type: String,
	required:false, 
},
signup_status:{
	type:String,
	required:false,
},
user_status:{
	type:String,
	required:false,
	default:0
},
user_active_status:{
    type:String,
    required:true,
    default:0
},

rating:{
    type:Number,
    required:true,
    default:0
},

},{timestamps:true});
module.exports = UserModel= mongoose.model("user",userSchema);