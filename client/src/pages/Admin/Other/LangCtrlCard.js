import { useState } from "react"



export default function LangCtrlCard(){

	const [inputString,setInputString] = useState("");
	
	
	function addLanguage(){

	}

	function deleteLanguage(){
		
	}

	return(
		<div>
			<div>
				<input type="text" value={inputString} onChange={(e)=>setInputString(e.target.value)}/>
				<button>Add</button>
			</div>
		</div>
	)
}