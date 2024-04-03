import { Link } from "react-router-dom";
import QuestionCard from "../../components/Cards/QuestionCard";
import useGetAllHistory from "../../hooks/useGetAllHistory"
import { SolutionCard } from "../../components/Cards/SolutionCard";
import Blog from "../../components/Cards/BlogCard";
import UserCard from "../../components/Cards/UserCard";
import { useState } from "react";
const styleForSolution = {
	boxShadow: "0px 5px 15px 0px rgba(50, 130, 50, 0.35)"
}
const styleForSolutionTitle = {
	boxShadow: "0px 5px 15px 0px rgba(50, 130, 50, 0.35)"
}
function History()
{

    const [data , setData] = useGetAllHistory();
    console.log(data);

    const [question , setQuestion]=useState(true);
    const [solution , setSolution]=useState(false);
    const [blog , setBlog]=useState(false);
    const [user , setUser]=useState(false);



     function questionState(){
        setQuestion(true);
        setSolution(false);
        setBlog(false);
        setUser(false);
     }
     function solutionState(){
        setQuestion(false);
        setSolution(true);
        setBlog(false);
        setUser(false);
     }
        function blogState(){
        setQuestion(false);
        setSolution(false);
        setBlog(true);
        setUser(false);
        }
        function userState(){
        setQuestion(false);
        setSolution(false);
        setBlog(false);
        setUser(true);
        }

    function DeleteQuestion()
    {
        return(
            <div>
                <div>
                </div >
                <div className="border gc-border-green mt-1 mx-2 rounded-lg">

                {data.deleteQuestion ? data.deleteQuestion.map((item,index)=>{
                    return(
                        <div key={index} >
                            <div className="text-red-500 font-bold m-1"> {item.isDeleted ? "Deleted By" :"Updated By"} </div>
                            <div className="flex justify-between mx-2">
                            <div>
                               userName -{item.updateDBy.username} </div>
                            <div>Email -{item.updateDBy.email} </div>
                            <div>Time -{item.updateDBy.updatedAt} </div>
                            </div>

                           <QuestionCard className="my-3 gc-shadow-23 m-1" number={item.number} title={item.title} likes={item.likes} level={item.level} />
                        </div>
                    )
                }):null}
                </div>
            </div>
        )
    }
    function DeleteSolution()
    {
        return(
            <div>
                {
                    data.deleteSolution ? data.deleteSolution.map((item,index)=>{
                        return(
                            <div key={index} className="border gc-border-green mt-1 mx-2 rounded-lg" >
                                <div className="text-red-500 font-bold m-1"> {item.isDeleted ? "Deleted By" :"Updated By"} </div>
                                <div className="flex justify-between mx-2">
                                <div>
                                   userName -{item.updateDBy.username} </div>
                                <div>Email -{item.updateDBy.email} </div>
                                <div>Time -{item.updateDBy.updatedAt} </div>
                                </div>
                                <SolutionCard style={styleForSolution} titleStyle={styleForSolutionTitle} title={item.title} solution={item.code} language={item.language} className="my-6" key={index}/>
                            </div>
                        )
                    }):null
                }

            </div>
        )
    }
    function DeleteBlog()
    {
        return(
            <div>
                {
                    data.deleteBlog ? data.deleteBlog.map((item,index)=>{
                        return(
                            <div key={index} className="border gc-border-green mt-1 mx-2 rounded-lg" >
                                <div className="text-red-500 font-bold m-1"> {item.isDeleted ? "Deleted By" :"Updated By"} </div>
                                <div className="flex justify-between mx-2">
                                <div>
                                   userName -{item.deletedBy.username} </div>
                                <div>Email -{item.deletedBy.email} </div>
                                <div>Time -{item.deletedBy.updatedAt} </div>
                                </div>
                           <QuestionCard className="my-3 gc-shadow-23 m-1"  title={`Blog Title - ${item.title}`} likes={item.likes}  level=""/>

                            </div>
                        )
                    }):null
                }

            </div>
        )
    }

    function UserDeleted()
    {
        return(
            <div>
                {
                    data.deleteUser ? data.deleteUser.map((item,index)=>{
                        return(
                            <div key={index} className="border gc-border-green mt-1 mx-2 rounded-lg" >
                                <div className="text-red-500 font-bold m-1"> {item.isDeleted ? "Deleted By" :"Updated By"} </div>
                                <div className="flex justify-between mx-2">
                                <div>
                                   userName -{item.updateDBy.username} </div>
                                <div>Email -{item.updateDBy.email} </div>
                                <div>Time -{item.updateDBy.updatedAt} </div>
                                </div>
                           <UserCard className="my-3 gc-shadow-23 m-1" username={item.username} email={item.email} role={item.role}/>

                            </div>
                        )
                    }):null
                }

            </div>
        )
    }
    return(
        <>
        <div className="m-4 border gc-border-green h-[97%] overflow-y-auto p-2">
            <div className="flex justify-between">
            <div className="userProfileButton flex justify-between m-10 mb-2">
                    <div className="buttonwith gc-bg-green px-2 py-2 text-white border rounded-lg w-[10vw] text-center"><button onClick={questionState}>Questions</button></div>
                    <div className="buttonwith gc-bg-green px-2 py-2 text-white border rounded-lg w-[10vw] text-center"><button onClick={solutionState}>Solution</button></div>
                    <div className="buttonwith gc-bg-green px-2 py-2 text-white border rounded-lg w-[10vw] text-center"><button onClick={blogState}>Blogs</button></div>
                    <div className="buttonwith gc-bg-green px-2 py-2 text-white border rounded-lg w-[10vw] text-center"><button onClick={userState}>User</button></div>

                </div>
            </div>
            <div className="border gc-border-green rounded-lg  max-h-[67vh] m-2 overflow-auto p-2">
                    {question ? <DeleteQuestion/> : null}
                    {solution ? <div><DeleteSolution/></div> : null}
                    {blog ? <div><DeleteBlog/></div> : null}
                    {user ? <div><UserDeleted/></div> : null}
                </div>
            
            

        </div>
        </>
    )
}
export default History