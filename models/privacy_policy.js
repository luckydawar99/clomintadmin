const mongoose = require('mongoose');
const privacypolicySchema = mongoose.Schema({
title:{
    type:String,
    required:false,
},
description:{
    type:String,
    required:false,
},
privacy_status:{
    type:String,
    required:true,
    default:0
},
},{timestamp:true});

module.exports = PrivacyPolicyModel = mongoose.model("privacypolicy",privacypolicySchema);