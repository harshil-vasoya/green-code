import { Link } from "react-router-dom";
import { RxHamburgerMenu } from 'react-icons/rx';
import { useEffect, useState } from "react";
import Cookies from "js-cookie";





const Header = (props) => {

	var [menuState, setManuState] = useState(false);
	var [pmState, setPmState] = useState(false);

	useEffect(() => {
		if (window.innerWidth > 767) setManuState(true);
	}, [])


	const ProfileMenu = () => (
		<div className="absolute -translate-x-1/2 mt-1 p-1 rounded-md border gc-border-green bg-white ">
			<button className="gc-hover-text-green p-1" onClick={props.onLogOut}>Log&nbsp;out</button>
		</div>
	)

	const Menu = () => (
		<div className="text-sm flex justify-around items-center header-portion">
			<Link to="/blog"><div className="p-1 mx-3 gc-hover-text-green hover:scale-110 duration-300">Blog</div></Link>
			<Link to="/users"><div className="p-1 mx-3 gc-hover-text-green hover:scale-110 duration-300">UserList</div></Link>
			{
				Cookies.get("superuserToken")!==undefined?
				<Link to="/user/question"><div className="p-1 mx-3 gc-hover-text-green hover:scale-110 duration-300">Your Question</div></Link>:
				null
			}
			
			<Link to="/about"><div className="p-1 mx-3 gc-hover-text-green hover:scale-110 duration-300">About</div></Link>
			<Link to="/contact"><div className="p-1 mx-3 gc-hover-text-green hover:scale-110 duration-300">Contact</div></Link>
			{
				!props.loginStatus ?
					<Link to="/LogIn">
						<div className="py-1 px-2 mx-3 hover:scale-105 border rounded-md gc-text-green gc-border-green duration-300">
							LogIn/SignIn
						</div>
					</Link> :
					<div>
						<div onClick={() => setPmState(pri => !pri)} className="flex mx-2 items-center justify-center text-center h-8 w-8 rounded-full border-[3px] gc-border-green gc-text-black text-lg">{props.username.toUpperCase()[0]}</div>
						{pmState === true && <ProfileMenu />}
					</div>
			}
		</div>
	)


	return (
		<nav className="border p-2 md:flex justify-between items-center gc-border-black" >
			<div className="flex justify-between">
				<Link to="/"><img src="/assets/images/GreenCode_Logo_main.png" alt="main logo" className="h-6" /></Link>
				<button className="md:hidden text-3xl p-1" onClick={() => setManuState(pri => !pri)}>
					<RxHamburgerMenu />
				</button>
			</div>
			{menuState === true && <Menu />}

		</nav>
	)
}

export default Header;