const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
phone_number : {
    type:String,
    required:false,
},
toll_free_number:{
    type:String,
    required:false,
},
email:{
    type:String,
    required:false,
},
address:{
    type:String,
    required:false,
}

},{timestamps:true}
);

module.exports = mongoose.model("contact",contactSchema);