const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	user_id:{
		type: mongoose.Schema.Types.ObjectId,
		ref:"user"
	},
	data:String,
	likes:{
		type:Number,
		default:0	
	},
	title:String,
	date:{
		type : Date,
		require : true,
		default : Date.now
	},
	isDeleted:{
		type:Boolean,
		default:false
	},
	deletedBy:{
		type: mongoose.Schema.Types.ObjectId,
		ref:"user"
	}
},{ timestamps: true })

module.exports = mongoose.model("blog",schema);