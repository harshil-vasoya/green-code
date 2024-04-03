const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	number:{
		type:Number,
		required:true,
		unique:true
	},
	title:{
		type:String,
		required:[true,"Question's Title is needed."]
	},
	question:{
		type:String,
	},
	categories:[String],
	likes:{
		type:Number,
		default:0	
	},
	level:{
		type:String,
		enum:["hard","medium","easy"]
	},
	isAccpeted:{
		type:Boolean,
		default:true
	},
	user_id:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"user"
	},
	isDeleted:{
		type:Boolean,
		default:false
	},
	updateDBy:{
		type: mongoose.Schema.Types.ObjectId,
		ref:"user"
	},
	date:{
		type : Date,
		require : true,
		default : Date.now
	}
} ,{ timestamps: true })

module.exports = mongoose.model("question",schema);
