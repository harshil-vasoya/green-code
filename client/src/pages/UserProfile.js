
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import QuestionCard from "../components/Cards/QuestionCard";
import CommentCard from "../components/Cards/CommentCard";
import Blog from "../components/Cards/BlogCard";
import useGetAlldataByUser from "../hooks/useGetAlldataByUser";




const styleForCommentCard={
	boxShadow: "0px 2px 1px 0px rgba(0, 30, 0, 0.09), 0px 4px 2px 0px rgba(0, 30, 0, 0.09), 0px 8px 4px 0px rgba(0, 30, 0, 0.09), 0px 16px 8px 0px rgba(0, 30, 0, 0.09), 0px 32px 16px 0px rgba(0, 30, 0, 0.09)"
}


function UserProfile() {
    const { id } = useParams();
    const navigate=useNavigate();


    const [data] = useGetAlldataByUser(id);
    const [question , setQuestion]=useState(true);
    const [comment , setComment]=useState(false);
    const [blog , setBlog]=useState(false);
    const [blogcomment , setBlogcomment]=useState(false);



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
        
        return(
            <>
            {data.questiondata ? data.questiondata.map((item)=>{
                return(
                    <>
                    <QuestionCard
                    
							onClick={()=>navigate(`/Question/${item._id}`)} 
                    key={item._id}  status={item.isAccpeted} number={item.number} title={item.title} likes={item.likes} level={item.level} />
                    </>
                )
            }):<><div>Data is Empty</div></>}
            </>
        )
    }

    function Comment(){
    
        return(
            <>
            {data.commentdata ? data.commentdata.map((e , index)=>{
						const date = new Date(e.date);

                return(
                <CommentCard id={e.user_id} username={data.userdata.username} className="m-2 mb-3 border-0 border-t border-s gc-border-green rounded-lg" comment={e.data} date={date.toDateString()} key={index}  style={styleForCommentCard} />
                )

            }):<><div>Data is Empty</div></>}
            </>
        )
    }

    function BlogComment(){
        return(
            <>
            {data.blogdata ? data.blogdata.map((e)=>{
                return(
                    <Blog  title={e.title} date={e.date} likes={e.likes} username={data.userdata.username} Blogid={e._id} user_id={e.user_id._id} key={e._id}  onClick={()=>{navigate("/blog/"+e._id)}}/>
                )
            }):null
            }
            </>
        )
    }

    function BlogCommentCommet(){
        return(
            <>
            {data.blogcommentdata ? data.blogcommentdata.map((e , index)=>{
               
                    const date = new Date(e.date);
                return <CommentCard username={data.userdata.username}  className="m-2 mb-3 border-0 border-t border-s gc-border-green rounded-lg" comment={e.data} date={date.toDateString()} key={index} style={styleForCommentCard} />
            }):null}
            </>
        )   
    }
    return (
        <>
            {data.userdata ?
                <div>
                    <div className=" flex border gc-border-green w-fit m-2 p-2 rounded-lg">
                    <div className="text-2xl flex items-center justify-center m-2 me-2 h-10 w-10 rounded-full border-4 gc-border-green font-bold">{data.userdata.username[0].toUpperCase()}</div>
                    <div>
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
                <div className="userProfileButton flex justify-between m-10 mb-2">
                    <div className="buttonwith gc-bg-green px-2 py-2 text-white border rounded-lg w-[10vw] text-center"><button onClick={questionState}>Questions</button></div>
                    <div className="buttonwith gc-bg-green px-2 py-2 text-white border rounded-lg w-[10vw] text-center"><button onClick={commentState}>Question's Comments</button></div>
                    <div className="buttonwith gc-bg-green px-2 py-2 text-white border rounded-lg w-[10vw] text-center"><button onClick={blogState}>Blogs</button></div>
                    <div className="buttonwith gc-bg-green px-2 py-2 text-white border rounded-lg w-[10vw] text-center"><button onClick={blogcommentState}>BlogCommets</button></div>

                </div>

                <div className="border gc-border-green rounded-lg  max-h-[45vh] m-2 overflow-auto p-2">
                    {question ? <Question/> : null}
                    {comment ? <div><Comment/></div> : null}
                    {blog ? <div><BlogComment/></div> : null}
                    {blogcomment ? <div><BlogCommentCommet/></div> : null}
                </div>
        </>


    )
}
export default UserProfile;