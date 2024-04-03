import { useNavigate, useParams } from "react-router-dom";
import useGetAlldataByUser from "../../../hooks/useGetAlldataByUser";
import { useState } from "react";

import QuestionCard from "../../../components/Cards/QuestionCard";
import CommentCard from "../../../components/Cards/CommentCard";
import deleteComment from "../../../utilities/APIcalls/deteleComment";
import Blog from "../../../components/Cards/BlogCard";
import deleteBlogByid from "../../../utilities/APIcalls/deleteBlog";
import deleteCommentOnBlog from "../../../utilities/APIcalls/deleteCommentOnBlog";
import deleteQuestionById from "../../../utilities/APIcalls/deleteQuestion";
import updateQuesionisAccepted from "../../../utilities/APIcalls/updateQuestionisaccepted";


const styleForCommentCard={
	boxShadow: "0px 2px 1px 0px rgba(0, 30, 0, 0.09), 0px 4px 2px 0px rgba(0, 30, 0, 0.09), 0px 8px 4px 0px rgba(0, 30, 0, 0.09), 0px 16px 8px 0px rgba(0, 30, 0, 0.09), 0px 32px 16px 0px rgba(0, 30, 0, 0.09)"
}


function UserProfile() {
    const { id } = useParams();

    const [data, setData] = useGetAlldataByUser(id);
    const [question , setQuestion]=useState(true);
    const [comment , setComment]=useState(false);
    const [blog , setBlog]=useState(false);
    const [blogcomment , setBlogcomment]=useState(false);
    const [message,setMessage]=useState("");

    const navigate=useNavigate();


     function questionState(){
        setQuestion(true);
        setComment(false);
        setBlog(false);
        setBlogcomment(false);
     }
     function commentState(){
        setQuestion(false);
        setComment(true);
        setBlog(false);
        setBlogcomment(false);
     }
        function blogState(){
        setQuestion(false);
        setComment(false);
        setBlog(true);
        setBlogcomment(false);
        }
        function blogcommentState(){
        setQuestion(false);
        setComment(false);
        setBlog(false);
        setBlogcomment(true);
        }

    function Question()
    {
        async function deleteQuestion(id, callback) {
            const confirm = window.confirm("Are you sure you want to delete this question?");
            if (confirm) {
                await deleteQuestionById(id, callback);
                setData({...data , questiondata:data.questiondata.filter((e) => e._id !== id)});
            }
        }
        async function changestate(id){
            setData({
                ...data,
                questiondata: data.questiondata.map((e) => {
                  if (e.id === id) {
                    return {
                      ...e,
                      isAccpeted: !e.isAccpeted,
                    };
                  }
                  return e;
                }),
              });
              
            await updateQuesionisAccepted(id,setMessage,()=>{navigate("/login")})
    }
        
        return(
            <>
            {data.questiondata ? data.questiondata.map((item)=>{
                return(
                    <>
                    <QuestionCard 
                    onEdit={() =>navigate(`/admin/question/${item._id}/edit`)} 
							onClick={()=>navigate(`/admin/Question/${item._id}`)} 
							onDelete={() =>{deleteQuestion(item._id, () => navigate("/login"))}} 
                            changestate={()=>{changestate(item._id)}} 
                    key={item._id} admin={true} status={item.isAccpeted} number={item.number} title={item.title} likes={item.likes} level={item.level} />
                    </>
                )
            }):<><div>Data is Empty</div></>}
            </>
        )
    }

    function Comment(){
        async function deleteCommentData(id) {
			const confirmDelete = window.confirm('Are you sure you want to delete this comment?');
		if (confirmDelete) {
		  await deleteComment(id, ()=>{navigate("/login")});
          setData({...data , commentdata:data.commentdata.filter((e)=>e._id!==id)})
		  
		}
		}
        return(
            <>
            {data.commentdata ? data.commentdata.map((e , index)=>{
                console.log(e)
						const date = new Date(e.date);

                return(
                <CommentCard id={e.user_id} admin={true} username={data.userdata.username} className="m-2 mb-3 border-0 border-t border-s gc-border-green rounded-lg" comment={e.data} date={date.toDateString()} key={index}  style={styleForCommentCard} onDelete={()=>{deleteCommentData(e._id)}}/>
                )

            }):<><div>Data is Empty</div></>}
            </>
        )
    }

    function BlogComment(){
        async function deleteBlog(id)
    {
        const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
        if (confirmDelete) {
        setData({...data , blogdata:data.blogdata.filter((e)=>e._id!==id)})
    await deleteBlogByid(id,()=>{navigate("/login")})
        }
    }
   
        return(
            <>
            {data.blogdata ? data.blogdata.map((e)=>{
                return(
                    <Blog admin={true} title={e.title} date={e.date} likes={e.likes} username={data.userdata.username} Blogid={e._id} user_id={e.user_id._id} key={e._id} ondelete={()=>{deleteBlog(e._id)}} onClick={()=>{navigate("/admin/blog/"+e._id)}}/>
                )
            }):null
            }
            </>
        )
   
    }

    function BlogCommentCommet(){
        async function deleteCommentData(id) {
            const confirmDelete = window.confirm('Are you sure you want to delete this comment?');
            if (confirmDelete) {
                  await deleteCommentOnBlog(id, ()=>{navigate("/login")});
               setData({...data , blogcommentdata:data.blogcommentdata.filter((e)=>e._id!==id)})
            }
        }
        return(
            <>
            {data.blogcommentdata ? data.blogcommentdata.map((e , index)=>{
               
                    const date = new Date(e.date);
                return <CommentCard id={e.user_id} username={data.userdata.username} admin={true} className="m-2 mb-3 border-0 border-t border-s gc-border-green rounded-lg" comment={e.data} date={date.toDateString()} key={index} style={styleForCommentCard} onDelete={() => { deleteCommentData(e._id) }} />
            }):null}
            </>
        )   
    }
    return (
        <>
        <div>{message}</div>
            {data.userdata ?
                <div>
                    <div className="flex border gc-border-green w-fit m-2 p-2 rounded-lg">
                    <div className="text-2xl flex items-center justify-center m-2 me-2 h-10 w-10 rounded-full border-4 gc-border-green font-bold">{data.userdata.username[0].toUpperCase()}</div>
                    <div>
                    <div>Email : <span className="font-bold">{data.userdata.email}</span></div>
                    <div>UserName :<span className="font-bold"> {data.userdata.username}</span></div>
                    <div> Role : <span className="font-bold">{data.userdata.role}</span></div>
                    </div>
                    </div>


                    <div className=" border gc-border-green rounded-lg min-w-[30vh] max-w-[40vh] m-2 p-2 text-lg font-bold">
                    <div>
                        Questions Add By User : {data ? data.questiondata.length : 0}</div><div>
                        Blogs Add By User : {data ? data.blogdata.length : 0}</div><div>
                        Comments Add By User : {data ? data.commentdata.length : 0}</div><div>
                        Blog Comments Add By User : {data ?data.blogcommentdata.length : 0}</div><div>
                    </div>
                    </div>

                </div> :
                null}
                <div className="flex justify-between m-10 mb-2">
                    <div className="gc-bg-green px-2 py-2 text-white border rounded-lg min-w-[6vw] text-center"><button onClick={questionState}>Questions</button></div>
                    <div className="gc-bg-green px-2 py-2 text-white border rounded-lg min-w-[6vw] text-center"><button onClick={commentState}>Question's Comments</button></div>
                    <div className="gc-bg-green px-2 py-2 text-white border rounded-lg min-w-[6vw] text-center"><button onClick={blogState}>Blogs</button></div>
                    <div className="gc-bg-green px-2 py-2 text-white border rounded-lg min-w-[6vw] text-center"><button onClick={blogcommentState}>BlogCommets</button></div>

                </div>

                <div className="border gc-border-green rounded-lg h-[45vh] m-2 overflow-auto p-2">
                    {question ? <Question/> : null}
                    {comment ? <div><Comment/></div> : null}
                    {blog ? <div><BlogComment/></div> : null}
                    {blogcomment ? <div><BlogCommentCommet/></div> : null}
                </div>
        </>


    )
}
export default UserProfile;