const mongoose = require("mongoose");
const membershipSchema = new mongoose.Schema({
amount:{
    type:String,
    required:false,
},
plan_validity:{
    type:String,
    required:false
},
membership_plan_status:{
    type:String,
    required:false,
    default:"0",
},
});
module.exports = mongoose.model("membership",membershipSchema);