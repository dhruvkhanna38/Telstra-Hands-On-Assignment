const mongoose = require("mongoose");

const commentSchema  = new mongoose.Schema({
    commenter:{
        type: String, 
        required:true 
    }, 
    title:{
        type:String
    },
    comment:{
        type:String,
        required:true
    }
},{timestamps:true});

mongoose.model("Comments" , commentSchema);

module.exports = commentSchema;