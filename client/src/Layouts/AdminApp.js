import Footer from "../components/Footer";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import "./../scss/form.scss";

const AdminApp = ()=>{
	const navigate=useNavigate();
	useEffect(()=>{
		if(!Cookies.get("adminToken"))
		{
navigate("/login");
		}
	})

	const [sidebarState,setSidebarState] = useState(true);

	return(
		<div className="flex flex-col justify-between w-screen h-screen gc-text-black">
			<AdminHeader sidebarToggle={()=>setSidebarState(pri=>!pri)} />
			<div className="flex justify-between w-full h-full">
				{sidebarState===true && <AdminSidebar  onLogOut={()=>{Cookies.remove("adminToken") ;Cookies.remove("userToken") ; navigate("/")} }/>}
				<div className="w-full h-full">
					<Outlet />
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default AdminApp