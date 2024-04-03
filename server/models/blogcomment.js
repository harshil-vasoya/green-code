const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	user_id:{
		type: mongoose.Schema.Types.ObjectId,
		ref:"user"
	},
	blog_id:mongoose.Schema.Types.ObjectId,
	data:String,
	date:{
		type : Date,
		require : true,
		default : Date.now
	}
});

module.exports = mongoose.model("blogcomment",schema);