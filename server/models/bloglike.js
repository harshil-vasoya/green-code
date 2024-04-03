const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	user_id:mongoose.Schema.Types.ObjectId,
	blog_id : mongoose.Schema.Types.ObjectId
})

module.exports = mongoose.model("bloglike",schema);