import { Link } from "react-router-dom"
import {HiMenu} from "react-icons/hi";


const AdminHeader = (props)=>{
	return(
		<nav className="border p-2 md:flex justify-between items-center gc-border-black">
			<button onClick={props.sidebarToggle} className="ms-2"><HiMenu className="text-3xl font-bold hover:scale-110 duration-200" /></button>
			<Link to="/"><img src="/assets/images/GreenCode_Logo_main.png" alt="main logo" className="h-6" /></Link>
			<div></div>
		</nav>
	)
}

export default AdminHeader;