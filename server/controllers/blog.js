//------------------------ version 2 -----------------

const blog = require("../models/blog");
const bloglike = require("../models/bloglike");
const blogcomment =require("../models/blogcomment");
const User = require("../models/user");

exports.postBlog=async (req,res)=>{
    var {title,data}=req.body;
    var BlogData;
    try
    {
        BlogData= await blog.create({user_id:req.user_id,data, title});
        
    }
    catch(error)
    {
        return res.json({ status: "X", message: "something went wrong while adding Blog.", error })

    }
	res.json({ status: "OK", data:BlogData });

}

exports.getAllBlog=async (req,res)=>{
    var data=await blog.find({ isDeleted: false }).populate("user_id");
 
    try{
        if(!data)
        return res.json({ status: "NOT_EXIST", message: "blog does not exist." })
  
    }
    catch(error)
    {
        return res.json({ status: "X", message: "something went wrong while getting Blog.", error })

    }
	res.json({ status: "OK", data });
}

exports.getBlogById=async (req,res)=>{
    var data , comment;
    var isLiked=false;

    try{
     data=await blog.findOne({ _id: req.params.id }, {}).populate("user_id");
     comment= await blogcomment.find({blog_id:req.params.id},{}).populate("user_id");

        if(!data)
        return res.json({ status: "NOT_EXIST", message: "blog does not exist." })

        if( await bloglike.findOne({user_id:req.user_id ,blog_id:req.params.id }))isLiked=true;
    }
    catch(error)
    {
        return res.json({ status: "X", message: "something went wrong while getting Blog.", error })

    }
	res.json({ status: "OK", data:{data , isLiked  , comment}});
}

exports.deleteBlog=async (req,res)=>{
    var {blog_id}=req.body;
    var data;
    try{
        data = await blog.findByIdAndUpdate(blog_id, {isDeleted:true , deletedBy:req.user_id} );
        // console.log(data);
        // data=await blog.deleteOne({_id:blog_id});
        // await bloglike.deleteMany({blog_id:blog_id});
        // await blogcomment.deleteMany({blog_id:blog_id});
        
    }
    catch(error){
        return res.json({ status: "X", message: "something went wrong while deleting Blog.", error })
        
    }
}

exports.updateBlog=async (req,res)=>{
    var {data ,blog_id}=req.body;
    var blogdata;
    try{
        blogdata= await blog.findOne({ _id: blog_id }, {});
        if(!blogdata)
        return  res.json({ status: "NOT_EXIST", message: "Blog does not exist." });
        else
        {
        blogdata.data=data;
        blogdata.save();
        }
        
    }
    catch(error)
    {
        return res.json({ status: "X", message: "something went wrong while updating Blog.", error })
    }
}

exports.likeBlog = async (req, res) => {
	var blog_id = req.params.id;
	var user_id = req.user_id;
	if (!(blog_id && user_id)) {
		return res.json({ status: "MISSING_FIELD", message: "either blog Id or user Id is missing." });
	}
	var like = false;
	try {
		if (!(await bloglike.findOneAndRemove({ user_id, blog_id }))) {

			if (!(await blog.updateOne({ _id: blog_id }, { $inc: { likes: 1 } }))) {
				return res.json({ status: "NOT_EXIST", message: "No such blog Exist." });
			}
			await bloglike.create({ user_id, blog_id });

			like = true;
		} else {
			if (!(await blog.updateOne({ _id: blog_id }, { $inc: { likes: -1 } }))) {
				return res.json({ status: "NOT_EXIST", message: "No such question Exist." });
			}
		}
	} catch (error) {
		return res.json({ status: "X", message: "something went wrong while adding like to blog.", error })
	}
	res.json({ status: "OK", like });

}

exports.commentOnBlog = async (req, res) => {
	var data = req.body.data;
	var blog_id = req.params.id;
	var user_id = req.user_id;
	if (!(blog_id && user_id && data)) {
		return res.json({ status: "MISSING_FIELD", message: "either question Id or user Id is missing." });
	}
	try {
		var username = await User.findOne({ _id: user_id }, { username: 1, _id: 0 });
		if (!username)
			return res.json({ status: "NOT_EXIST", message: "User does not exist." });
		var result = await blogcomment.create({ user_id, blog_id, data });

		res.json({ status: "OK", data: { ...result._doc, username: username.username } });
	} catch (error) {
		return res.json({ status: "X", message: "something went wrong while commenting on question.", error })
	}
}

exports.deleteBlogComment = async (req,res) => {
var comment_id = req.body.comment_id;

	if (!comment_id) return res.json({ status: "MISSING_FIELD", message: "all fileds are required." });

	try {
		var data = await blogcomment.findOneAndRemove({ _id: comment_id  });
	} catch (error) {
		return res.json({ status: "X", message: "something went wront while deleting comment.", error });
	}

	if (!data) return res.json({ status: "NOT_EXIST", message: "Comment does not exist." });
	res.json({ status: "OK", data });
}