const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	
	question_id:mongoose.Types.ObjectId,
	language:{
		type:String,
		required:[true,"Language is required."]
	},
	title:{
		type:String,
		required:[true,"Title of solution is required."]
	},
	isDeleted:{
		type:Boolean,
		default:false
	},
	updateDBy:{
		type: mongoose.Schema.Types.ObjectId,
		ref:"user"
	},
	code:{
		type:String,
		required:[true,"code is required."]
	}
} , { timestamps: true })

module.exports = mongoose.model("solution",schema);