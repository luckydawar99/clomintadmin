// creat user model schema
const mongoose=require('mongoose');
const adminSchema = new mongoose.Schema({
	
email:{
	type:String,
	required:false, 
},
password:{
	type:String, 
	required:false,
},
role_type:{
	type:String,
	required:false,
},
token:{  
	type: String,
	required:false, 
},
admin_status:{
	type:String,
	required:false,
	default:0
},

},{timestamps:true});
module.exports = AdminModel= mongoose.model("admin",adminSchema);