const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	listName:{
		type:String,
		unique:true	
	},
	list:[String],
}, { timestamps: true })

module.exports = mongoose.model("list",schema);