import { useParams, useNavigate } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { SiAddthis } from "react-icons/si";
import useGetQuestionDataById from "../../hooks/useGetQuestionByID";
import deleteSolution from "../../utilities/APIcalls/deleteSolution";
import postComment from "../../utilities/APIcalls/postComment";
import deleteComment from "../../utilities/APIcalls/deteleComment";
import CommentCard from "../../components/Cards/CommentCard";
import LikeCard from "../../components/Cards/LikeCard";
import { SolutionCard } from "../../components/Cards/SolutionCard";

const styleForSolution = {
	boxShadow: "0px 5px 15px 0px rgba(50, 130, 50, 0.35)"
}
const styleForSolutionTitle = {
	boxShadow: "0px 5px 15px 0px rgba(50, 130, 50, 0.35)"
}
const styleForCommentCard={
	boxShadow: "0px 2px 1px 0px rgba(0, 30, 0, 0.09), 0px 4px 2px 0px rgba(0, 30, 0, 0.09), 0px 8px 4px 0px rgba(0, 30, 0, 0.09), 0px 16px 8px 0px rgba(0, 30, 0, 0.09), 0px 32px 16px 0px rgba(0, 30, 0, 0.09)"
}
const QuestionByIdUser = (props) => {
	const { id } = useParams();
	const [data , setData,solution] = useGetQuestionDataById(id);
	const [togal, settogal] = useState(true);
	const [language, setlanguage] = useState([]);
	const [filltersol , setFillersol]=useState([]);
	const [seleclanguae , setselectlangugae]=useState("");

	useEffect(()=>{
		
		setFillersol([...solution]);
		if(seleclanguae!=="")
		{
			setFillersol(pri=>[...pri.filter((e1)=>{return e1.language===seleclanguae})]);
		}
		
	},[seleclanguae,solution])

	useEffect(()=>{
		setFillersol([...solution])
		const languageSet = new Set();
		solution.forEach(item => {
		  languageSet.add(item.language);
		});
		setlanguage(Array.from(languageSet))
		setselectlangugae(solution.length ? solution[0].language : "")
	},[data , solution])
	const navigate = useNavigate();

	async function deleteSolu (id) {
		if(solution.length===1)
		{
		 window.alert('you cant delete solution cause there wehre only one solution , which is required');

		}
		else{
		const confirmDelete = window.confirm('Are you sure you want to delete?');
		if (confirmDelete) {
		  
		
		await deleteSolution(id, ()=>{navigate("/login")});
		let temp = {...data}
		temp.solutions= data.solutions.filter((e)=>e._id!==id)
		setData(temp);
		}
	}

	}
	 

	function Level(arg) {
		if (arg.level === undefined) return (<></>);
		var questionLevel = arg.level.toLowerCase();
		if (questionLevel === "hard") return (<FaCircle className="text-red-600 mt-1 me-1" />);
		if (questionLevel === "medium") return (<FaCircle className="text-orange-400 mt-1 me-1" />);
		if (questionLevel === "easy") return (<FaCircle className="gc-text-green mt-1 me-1" />);
	}

	const Discription = () => {
		return (
				<div className="w-full md:h-[70vh] border gc-border-green p-4 rounded-md">{data.question}</div>
		)
	}
	const Comment = () => {

		const [comments, setcommet] = useState(data.comments);
		const [commentMessage, setcommetMessage] = useState("");

		async function sendData() {
			if (commentMessage !== "") {
				var newComment = await postComment(id, commentMessage, (res) => { if (res !== undefined) { navigate("/login") } })
				newComment.user = { _id: newComment.user_id, "username": newComment.username }
				delete newComment.username
				delete newComment.user_id
				setcommet([newComment, ...comments]);
				setcommetMessage("");
			}
		}

		async function deleteCommentData(id) {
			const confirmDelete = window.confirm('Are you sure you want to delete this comment?');
		if (confirmDelete) {
		  await deleteComment(id, ()=>{navigate("/login")});
		  let temp = [...comments];
		  temp = temp.filter((e)=>e._id!==id)
		  setcommet(temp);
		}
		}

		return (
			<>
				<div className="text-xl mt-2 flex items-center"><span className="flex items-center me-2 justify-center h-10 w-10 rounded-full border-4 gc-border-green text-center text-2xl font-bold align-middle ">{Cookies.get("username")[0].toUpperCase()}</span>{Cookies.get("username")}</div>
				<div className="flex items-center mt-2 "><input type="text" value={commentMessage} className="w-full border-b gc-border-black  p-2 " placeholder="Write a comment" onChange={(e) => { setcommetMessage(e.target.value) }} /><button className="gc-bg-green ms-4 text-white w-[110px] p-2 border rounded-lg hover:scale-110 duration-300" onClick={() => { sendData() }}>POST</button></div>
				<div className="overflow-y-auto sm:mt-8 sm:ms-10 sm:me-10 h-[50vh]">
					{comments.map((e, index) => {
						console.log(e)

						const date = new Date(e.date);
						return<CommentCard id={e ? e.user._id:null} username={e.user.username} className="m-2 mb-3 border-0 border-t border-s gc-border-green rounded-lg" comment={e.data} date={date.toDateString()} key={index}  style={styleForCommentCard} onDelete={()=>{deleteCommentData(e._id)}}/>
							
					})
					}
				</div>
			</>
		)

	}
	const Language = () => {

		return (
			<>
				<select className="border gc-border-green ms-12 mt-4 rounded-md text-lg" value={seleclanguae}  onChange={(e)=>{setselectlangugae(e.target.value)}} >

					{language.map((e, index) => {
						return (<option value={e} key={index}>{e}</option>)
					})}
				</select>		</>
		)
	}
		
	var printSolution = filltersol.map((e, index) => {
		return (<SolutionCard onEdit={()=>{navigate(`/admin/solution/${e._id}/edit`)}}  style={styleForSolution} titleStyle={styleForSolutionTitle} title={e.title} solution={e.code} language={e.language} onDelete={()=>{deleteSolu(e._id)}} className="my-6" key={index} onCopy={()=>{navigator.clipboard.writeText(e.code)}}/>)
	})

	const [isLiked , setIsLiked]=useState(data.isLiked)
	return (<>
		<div className="md:flex my-2">
			<div className="md:w-1/2 mx-4 my-2 p-4 rounded">
				<button className={`btn rounded-l-lg  p-2 text-white ${togal === true ? "bg-[#7cc529] border gc-border-green" : " gc-text-black hover:bg-[#7cc529] hover:text-white border gc-border-green   "} `} onClick={() => { settogal(true) }}>Discription</button>
				<button className={`btn rounded-r-lg  p-2 ms-1 text-white ${togal === false ? "bg-[#7cc529] border gc-border-green" : "gc-text-black hover:bg-[#7cc529] hover:text-white border gc-border-green "} `} onClick={() => { settogal(false) }}>Comments</button>
				<div className="mt-4">
					<span className=" text-2xl font-bold">{data.number}</span>
					<span className="text-xl p-2 font-light">{data.title}</span>
					<div className="flex justify-between "><div>
						<Level level={data.level} />
						level</div>
					<div><LikeCard likes={data.likes} setLiked={setIsLiked} status={data.isLiked} status1={isLiked}/></div>
					</div>
				</div>
				{togal === true ? <Discription /> : <><Comment /></>}
			</div>
			<div className="md:w-1/2 ">
				<div className="flex justify-end mr-8"><Language/></div>
			<div className="h-[85vh]  mx-4 my-2 p-4 rounded overflow-auto gc-shadow-25 ">
				{props.User && <SiAddthis className="gc-text-green text-3xl hover:scale-110" onClick={()=>{navigate(`/admin/solution/${id}/add`)}} />}
				{printSolution}</div>
		</div>
		</div>

	</>
	);
}
export default QuestionByIdUser;