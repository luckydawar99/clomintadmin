const mongoose = require('mongoose');
const faqSchema = mongoose.Schema({
title:{
    type:String,
    required:false,
},
question:{
    type:String,
    required:false,
},
description:{
    type:String,
    required:false,
},
faq_status:{
    type:String,
    required:true,
    default:0
},
},{timestamp:true});

module.exports = FaqModel =  mongoose.model("faq",faqSchema);