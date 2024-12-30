const mongoose = require('mongoose');
const termsSchema = mongoose.Schema({
title:{
    type:String,
    required:false,
},
description:{
    type:String,
    required:false,
}
},{Timestamp:true});

module.exports = mongoose.model("term",termsSchema);