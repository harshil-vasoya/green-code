
// -----------------------version 2 ------------------

const jwt = require("jsonwebtoken");
const user=require("../models/user")

const isAdminUserSuperUserLoggedIn = async (req,res,next)=>{
	
	var token = req.headers.token || req.body.token;
	if(!token){
		return res.json({status:"MISSING_TOKEN",message:"Token is missing."});

	}

	try{
		var payLoad = jwt.verify(token,process.env.TOKEN_KEY);
		req.user_id=payLoad.user_id;
		var data=await user.findById(req.user_id);
		if(data.role === "admin" || data.role==="user" || data.role ==="superuser" ){
			next();
		}else{
			return res.json({status:"ACCESS_DENIED",message:"Not an Admin."})
		}
		
	}catch (error){
		return res.json({status:"EXPIRED_TOKEN",message:"Token has been expired",error});
	}
	
}
module.exports = isAdminUserSuperUserLoggedIn;