
import { useState } from "react";


export var PopUp = (Component,state,props) => {
	const [flag,setFlag] = useState(state);
	
	function toggleFlag(){
		setFlag(!flag);
	}
	

	return [()=>(flag?<Component close={toggleFlag} {...props} />:<></>),toggleFlag,setFlag];
}

export default PopUp;