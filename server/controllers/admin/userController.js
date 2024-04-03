const blog = require("../../models/blog");
const question = require("../../models/question");
const comment = require("../../models/comment");

const User = require("./../../models/user");
const blogcomment = require("../../models/blogcomment");
const bloglike = require("../../models/bloglike");
const like=require("../../models/like");
const { use } = require("../../routes/history");


// ===================================================

exports.getOneUser = async (req,res)=>{

	try{
		var data = await User.findOne({ _id:req.params.id , isDeleted:false});
		console.log(data);

		res.json({status:"OK",data});
	}catch(error){
		res.json({status:"X",message:"somethin went wrong while fetching one user",error});
	}
}

// ==================================================

exports.changeRole = async (req,res)=>{
	try{
		var data = await User.findOne({_id:req.params.id});
		var {newrole}=req.body;

		var data = await User.findByIdAndUpdate(req.params.id , {updateDBy:req.user_id , role:newrole});

		// data.updateDBy=req.user._id;
		res.json({status:"OK",data});

	}catch(error){

		res.json({status:"X",message:"somethin went wrong while changing User's role",error});
	}
}

// ====================================

exports.deleteUser = async (req,res)=>{
	try{

		var userdata= await User.findOne({_id:req.params.id});
		if(userdata.role==="user")
		{

		// var data = await User.findOneAndRemove({_id:req.params.id});
		var data = await User.findByIdAndUpdate(req.params.id , {updateDBy:req.user_id , isDeleted:true});
		//  await question.Many({user_id:req.params.id});
		//  await blog.deleteMany({user_id:req.params.id});
		//  await comment.deleteMany({user_id:req.params.id});
		//  await blogcomment.deleteMany({user_id:req.params.id});
		//  await bloglike.deleteMany({user_id:req.params.id});
		//  await like.deleteMany({user_id:req.params.id});
		}
		else
		{
			
			return res.json({status:"OK",message:"you can't delete this superuser or admin"});
		}

		if(!data){
			return res.json({status:"NOT_EXIST",message:"User does not exist."})
		}
		res.json({status:"OK",data});
	}catch(error){
		res.json({status:"X",message:"somethin went wrong while deleting User",error});
	}
}

exports.getAllDetailsofUser = async (req,res)=>{

	try{
	var userdata= await User.findOne({_id:req.params.id , isDeleted:false});

		if(userdata)
		{
			var questiondata= await question.find({user_id:req.params.id });
			var blogdata= await blog.find({user_id:req.params.id});
			var commentdata= await comment.find({user_id:req.params.id});
			var blogcommentdata= await blogcomment.find({user_id:req.params.id});
				return res.json({status:"OK",data:{questiondata,blogdata,commentdata,blogcommentdata , userdata}});
		}
		else{
			return res.json({status:"NOT_EXIST",message:"User does not exist."});
		
		}


	
}
	catch(error)
	{
		return res.json({status:"X",message:"something went wrong while fetching data",error});
	}
	

}
