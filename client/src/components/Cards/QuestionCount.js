
import {FaCircle} from "react-icons/fa"

const QuestionCount = (props)=>{
	let space = " ";
	return(
		<div className={"p-3 border gc-border-green w-fit h-fit flex rounded-xl items-center justify-around"+space+props.className}>
			<div className="ps-3 pe-5 text-5xl">
				{props.count}
			</div>
			<div className="flex flex-col justify-around">
				<div className="flex items-center pe-3 pb-1 text-lg border-b gc-border-green"><FaCircle className="me-2 text-base text-red-600" />{props.Hard}</div>
				<div className="flex items-center pe-3 py-1 text-lg border-b gc-border-green"><FaCircle className="me-2 text-base text-orange-500" />{props.Medium}</div>
				<div className="flex items-center pe-3 pt-1 text-lg"><FaCircle className="me-2 text-base gc-text-green" />{props.Easy}</div>
			</div>
		</div>
	);
}

export default QuestionCount;