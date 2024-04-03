import {  useNavigate } from "react-router-dom";
import QuestionCard from "../../../components/Cards/QuestionCard";
import useGetAllPendingQuestion from "../../../hooks/useGetAllPedningQuestion";
import updateQuesionisAccepted from "../../../utilities/APIcalls/updateQuestionisaccepted";
import { useState } from "react";
import deleteQuestionById from "../../../utilities/APIcalls/deleteQuestion";

function QuestionAddByUser()
{
    
    const [data ,setData ] = useGetAllPendingQuestion();
    const [message , setMessage]=useState();
    const navigate=useNavigate();

    async function changestate(id){
            setData([...data.filter((i)=>{
                return i._id!==id
            })])
            await updateQuesionisAccepted(id,setMessage,()=>{navigate("/login")})
    }
    function PrintData(data){
        return(<>
            {
                data.map((e, index) =>
                <span onClick={()=>{(navigate("/admin/question/"+e._id))}}>
                    <QuestionCard
							onDelete={() =>{deleteQuestion(e._id, () => navigate("/login"))}} 
                            className="my-3 gc-shadow-23" number={e.number} title={e.title} likes={e.likes} level={e.level} status={e.isAccpeted} key={index} aprovebutton="true" changestate={(i)=>{changestate(e._id)}} />
                     </span>
        )}
        </>
        )
    }
    async function deleteQuestion(id, callback) {
		const confirm = window.confirm("Are you sure you want to delete this question?");
		if (confirm) {
			await deleteQuestionById(id, callback);
			setData(data.filter((e) => e._id !== id));
		}
	}
    
    return(
        <>
        <div className="w-[78%] text-center "><span className="bg-red-600 px-2 py-1 m-2 text-white rounded-lg">Pending Questions </span></div>
        <div>{message}</div>
        <div className=" p-3 gc-shadow-25 w-[70%] ml-[5vw] rounded mt-4 overflow-auto h-[78vh]">
				{PrintData(data)}	
					
				</div>
        </>
    )
}
export default QuestionAddByUser;