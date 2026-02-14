const mongoose =require("mongoose");
require("dotenv").config()
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("connected mongodb")
}).catch((error)=>{
    console.log("erorr" , error)
});


module.exports = mongoose;
