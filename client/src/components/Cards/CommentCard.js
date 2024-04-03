
import {MdDeleteForever} from "react-icons/md"
import { useNavigate } from "react-router-dom";


const CommentCard = (props) => {
	const navigate=useNavigate();
	function navigateFun()
	{
		if(props.admin){
			return navigate("/admin/user/"+props.id)
		}
		return navigate("/user/"+props.id)
	}
	var space = " ";
	return (
		<div className={"p-3 border max-w-[700px] rounded-md"+space+props.className} onClick={props.onClick} style={props.style}>
			<div className="flex justify-between">
				<div className="text-xl flex items-center" onClick={navigateFun}><span className="flex items-center me-2 justify-center h-10 w-10 rounded-full border-4 gc-border-green text-center text-2xl font-bold align-middle ">{props.username[0].toUpperCase()}</span>{props.username}</div>
				<div className="text-sm">{props.date}</div>
				{
					props.admin===true && <MdDeleteForever onClick={props.onDelete} className="text-3xl hover:scale-110 duration-300 text-red-600" />
				}
			</div>
			<div className="pt-3 pb-2">
				{props.comment}
			</div>
		</div>
	)
}

export default CommentCard;