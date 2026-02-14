
const Question = require("../models/questionModel")


exports.createvote  = async (req , res)=>{
    try {
        const{question} = req.body;
        const newVote = await Question.create({question});
        res.status(201).json({
            message:"question create successfully",
            data : newVote
        });

    } catch (error) {
        res.status(500).json({message:"error creating  vote"})
    }
}


exports.getVote = async(req , res)=>{
    try {
        const votes = await Question.find();
        res.status(200).json(votes)
    } catch (error) {
        res.status(500).json({message:"error creating  vote"})
    }
}



exports.voteanswer = async(req , res)=>{
    try {
        
        const {id} = req.params;
        const {answer} = req.body;
        const update = answer === 0 ? { no: 1 } : { yes: 1 };
        await Question.updateOne({_id:id} , {$inc:update});

        const updataData = await  Question.findById(id);
        res.status(200).json({
            message: "vote updata successfully",
            data : updataData
        })
    } catch (error) {
        res.status(500).json({message:"error creating  vote"})
    }
}



exports.getsinglequestion = async(req , res)=>{
    try {
        const question= await Question.findById(req.params.id).populate("votes.user" , "name")
        if (!question){
            return res.status(400).json({message:"question not found "})
        }
    } catch (error) {
        res.status(500).json({message:"error creating  vote"})
    }
}



exports.deletequestion = async(req , res)=>{
    try {
        const{id}= req.params;
        const deletedquestion = await Question.findByIdAndDelete(id);
        if (!deletedquestion){
            return res.status(404).json({
                message:"question not found "
            })
        }
        res.status(200).json({
            message:"question deletd successfully ",
            data : deletedquestion
        })
        
    } catch (error) {
        res.status(500).json({message:"error deleting  question "})
    }
}