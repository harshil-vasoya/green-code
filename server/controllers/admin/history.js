const Question = require("./../../models/question");
const Solution = require("./../../models/solution");
const Blog = require("./../../models/blog");
const User = require("./../../models/user");



exports.getAllDeleteHistory=async(req,res)=>{
    try{
        //delete history
    const deleteQuestion = await Question.find({isDeleted:true}).populate("updateDBy");
    const deleteSolution = await Solution.find({isDeleted:true}).populate("updateDBy")
    const deleteBlog = await Blog.find({isDeleted:true}).populate("deletedBy");
    const deleteUser = await User.find({isDeleted:true}).populate("updateDBy");
        //Aprove history of Question
    const aproveQuestion = await Question.find({isAproved:true}).populate("updateDBy");
       
    
    res.json({status:"OK", data:{deleteSolution, deleteBlog, deleteQuestion, deleteUser}});
    }
    catch(error){
        res.json({status:"X", message:error.message, error});
        console.log(error);
    }

}