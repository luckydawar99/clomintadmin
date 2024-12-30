const mongoose = require('mongoose');
const contactuserSchema = mongoose.Schema({
name:{
    type:String,
    required:false,
},
email:{
    type:String,
    required:false,
},
subject:{
    type:String,
    required:false,
},
message:{
    type:String,
    required:false,
} 
},{timestamp:true});

module.exports = mongoose.model('contactuser',contactuserSchema);