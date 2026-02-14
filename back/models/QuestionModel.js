const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    question:{
        type :String,
        required:true,
    },
    yes:{
        type:Number,
        default:0
    },
    no:{
        type:Number ,
        default:0
    }
});


module.exports = mongoose.model("Question" , questionSchema);