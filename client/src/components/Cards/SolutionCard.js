import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { BiCopy } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";


github.hljs.background = undefined;
var space = " ";

export function SolutionCard(props) {


	return (
		
		<div className={"bg-white px-3 pb-3 m-3 rounded-xl min-w-[300px] max-w-[1000px] " + space + props.className} style={props.style} onClick={props.onClick}>

			<div className="flex justify-between items-center">
				<div className={"relative bg-white w-fit -translate-y-1/3 py-1 px-2 rounded-md" + space + props.titleClassName} style={props.titleStyle}>{props.title}</div>
				<div className='flex justify-between items-center'>
					<BiCopy className='relative translate-y-2 text-3xl hover:scale-110 duration-200 gc-text-green' onClick={(event)=>{event.stopPropagation();props.onCopy();}} />
					{props.admin && <MdDeleteForever className='relative translate-y-2 text-3xl hover:scale-110 duration-200 mx-3 text-red-500' onClick={(event)=>{event.stopPropagation();props.onDelete();}} />}
					{props.admin && <FiEdit className='relative translate-y-2 text-2xl hover:scale-110 duration-200' onClick={(event)=>{event.stopPropagation();props.onEdit();}} />}
				</div>
			</div>

			<SyntaxHighlighter className="" language={props.language} style={github}>
				{props.solution}
			</SyntaxHighlighter>

		</div>
	);
}