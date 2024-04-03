import { Link } from "react-router-dom";
import {RxDashboard} from "react-icons/rx";
import {FaQuestion} from "react-icons/fa";
import {HiOutlineUserCircle} from "react-icons/hi";
import { IoMdPaper } from 'react-icons/io';
import { FaHistory } from 'react-icons/fa';

import {GrApps} from "react-icons/gr";

const buttonStyle = {
	boxShadow : "0px 19px 38px 0px rgba(0, 50, 0, 0.30), 0px 15px 12px 0px rgba(0, 50, 0, 0.22)"
}

const commonClass = "flex justify-center w-full text-xl items-center m-2 my-4 bg-white rounded-md px-4 py-2 hover:bg-[#f2fbe8] border hover:border-[#7cc529] duration-200";



const AdminSidebar = (props)=>{
	

	return (
    <div className="h-full p-2 py-5 flex flex-col justify-between items-center gc-shadow-25 min-w-[300px] w-1/4">
      <div className="w-[70%]">
        <Link to="/admin" style={buttonStyle} className={commonClass}>
          <RxDashboard />&nbsp;&nbsp;Dashboard
        </Link>
        <Link to="/admin/question" style={buttonStyle} className={commonClass}>
          <FaQuestion />&nbsp;&nbsp;Question
        </Link>
        <Link to="/admin/user" style={buttonStyle} className={commonClass}>
          <HiOutlineUserCircle className="text-3xl" />&nbsp;&nbsp;User
        </Link>
        <Link to="/admin/blog" style={buttonStyle} className={commonClass}>
          <IoMdPaper className="text-3xl" />&nbsp;&nbsp;Blog
        </Link>
        <Link to="/admin/history" style={buttonStyle} className={commonClass}>
          <FaHistory className="text-3xl" />&nbsp;&nbsp;History
        </Link>
        <Link to="/admin/other" style={buttonStyle} className={commonClass}>
          <GrApps className="text-2xl" />
        </Link>
      </div>

      <div className="w-[70%]">
        <button
			onClick={props.onLogOut}
          className="flex justify-center w-full text-xl items-center m-2 bg-white rounded-md border px-4 py-2 text-red-500 hover:border-red-600 hover:bg-red-50 duration-200"
          style={{ boxShadow: "0px 5px 15px 0px rgba(50, 0, 0, 0.35)" }}
        >
          Log&nbsp;out
        </button>
      </div>
    </div>
  );
}


export default AdminSidebar;