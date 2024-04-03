import { marked } from 'marked';
import { BiCopy } from "react-icons/bi";
import useGetBlogById from "../../hooks/useGetBlogById";
import LikeCard from "../../components/Cards/LikeCard";
import { useNavigate, useParams } from "react-router-dom";
import CommentCard from '../../components/Cards/CommentCard';
import { useState } from 'react';
import postBlogComment from '../../utilities/APIcalls/postCommentByBlogId';
import deleteCommentOnBlog from '../../utilities/APIcalls/deleteCommentOnBlog';


const styleForCommentCard = {
    boxShadow: "0px 2px 1px 0px rgba(0, 30, 0, 0.09), 0px 4px 2px 0px rgba(0, 30, 0, 0.09), 0px 8px 4px 0px rgba(0, 30, 0, 0.09), 0px 16px 8px 0px rgba(0, 30, 0, 0.09), 0px 32px 16px 0px rgba(0, 30, 0, 0.09)"
}

function BlogById(props) {
    const { id } = useParams();
    const [databyid] = useGetBlogById(id);
    const navigate = useNavigate();

    function CommentDisplay() {

        const [commentvalue, setCommentvalue] = useState("")
        const [comment, setCommet] = useState(databyid.comment);
        async function commetpost() {
            // setCommet([...comment , data]);
            if (commentvalue !== "") {
                var newComment = await postBlogComment(id, commentvalue, (res) => { if (res !== undefined) { navigate("/login") } })
                newComment.user_id= { _id: newComment.user_id, "username": newComment.username }
                delete newComment.username
                setCommet([...comment, newComment]);
                setCommentvalue("");
            }


        }
        async function deleteCommentData(id) {
            const confirmDelete = window.confirm('Are you sure you want to delete this comment?');
            if (confirmDelete) {
                  await deleteCommentOnBlog(id, ()=>{navigate("/login")});
                let temp = [...comment];
                temp = temp.filter((e) => e._id !== id)
                setCommet(temp);
            }
        }
        return (
            <>
                <div className='border gc-border-green mt-2 mr-2'>
                    <textarea placeholder='Type Comment Here' type='text ' className='w-full outline-none text-xl h-fit p-2' value={commentvalue} onChange={(e) => { setCommentvalue(e.target.value) }} />
                    <div className='border-t gc-border-green h-[4vh] text-right text-white'><button className='gc-bg-green h-full px-2 hover:text-lg hover:bg-green-800' onClick={() => { commetpost() }}>post</button></div>
                </div>
                <div className='m-2 overflow-auto h-[70vh]'>
                {comment? comment.map((e, index) => {
                    const date = new Date(e.date);
                    return <CommentCard id={e.user_id? e.user_id._id:null} username={e.user_id ? e.user_id.username:null} admin={props.admin} className="m-2 mb-3 border-0 border-t border-s gc-border-green rounded-lg" comment={e.data} date={date.toDateString()} key={index} style={styleForCommentCard} onDelete={() => { deleteCommentData(e._id) }} />

                }):null
                }
                </div>
            </>
        )
    }

    return (
        <>
        <div className=' h-[89vh] overflow-auto'>
            <div className="flex justify-between">
                <div className="flex justify-between  bg-white w-full">

                    <div className="w-full h-fit border gc-border-green m-2">
                        <div className="m-2">
                            <div className="flex" onClick={() => { }}>
                                <div><span className="flex items-center me-2 justify-center h-10 w-10 rounded-full border-4 gc-border-green text-center text-2xl font-bold align-middle ">{databyid.data !== undefined ? databyid.data.user_id.username[0].toUpperCase() : null}</span></div>
                                <div className="mt-2">{databyid.data ? databyid.data.user_id.username : null}</div>
                            </div>

                            <div className="text-2xl text-center ">
                                {databyid.data !== undefined ? databyid.data.title : null}</div>
                            {databyid.data !== undefined ?
                                <div className="m-2 mx-auto p-3 shadow-lg bg-gray-100 min-h-[20vh] max-h-[67vh] overflow-auto w-[65vw]">
                                    <div className="flex justify-end mr-2" > < BiCopy  className='relative translate-y-2 text-3xl hover:scale-110 duration-200 gc-text-green' onClick={()=>{navigator.clipboard.writeText(databyid.data.data)}}/> </div>
                                    <div dangerouslySetInnerHTML={{ __html: marked(databyid.data.data) }}></div>
                                </div > : null}


                        </div>
                        <div className='m-2 ms-4'>
                            <LikeCard blog={true} likes={databyid.data ? databyid.data.likes : 0} status={databyid.isLiked} />
                        </div>

                    </div>
                </div>
                {props.admin !==true ?
                <div className="w-[32vw]  max-h-[89vh] h-auto desktop-only ">
                    <CommentDisplay />
                </div>
                :null}   
            </div>
            {props.admin !==true ? <div className=' mobile-only m-2'>
                <CommentDisplay />

            </div>:
            <div className="w-[32vw] m-10  max-h-[89vh] h-auto ">
            <CommentDisplay />
        </div>
                }
            </div>
        </>
    )
}

export default BlogById