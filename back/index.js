
const express = require("express");
const cors = require("cors");
require("dotenv").config()



const mongodb = require("./connection")
const QuestionRoutes = require("./routes/QuestionRoutes");

const app = express();


app.use(cors());
app.use(express.json());


app.use('/api' ,QuestionRoutes );
const PORT = process.env.PORT||2000

app.listen(PORT , ()=>{
  console.log(`server running on port ${PORT} `)
})