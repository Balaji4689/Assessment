const express= require("express");
const router = express.Router();

const {createvote , getVote , voteanswer , getsinglequestion , deletequestion} = require("../Controllers/QuestionController");

router.post('/new-voter' ,createvote );
router.get('/getvote' , getVote);
router.put('/vote/:id' , voteanswer);
router.get('/question/:id', getsinglequestion)
router.delete('/delete/:id' , deletequestion)



module.exports= router; 