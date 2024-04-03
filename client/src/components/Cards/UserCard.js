
import { MdDeleteForever } from "react-icons/md"
import { BiSolidUser } from "react-icons/bi"
import changeUserRole from "../../utilities/APIcalls/changeUserRole";
import { useNavigate } from "react-router-dom";


export function UserCard(props) {
	const navigate = useNavigate();
	async function changerole(id, event) {
		var temp = [...props.user];
		props.setUser(temp.map((e) => {
			if (e._id === props.id) {
				e.role = event.target.value;
				return e;
			}
			return e;
		}))
		await changeUserRole(id, event.target.value, () => { navigate("/login") });

	}
	const space = " ";



	return (
		<div className={"border max-w-[550px] rounded-md p-2 flex justify-between items-center" + space + props.className} style={props.style} >
			<div onClick={props.onNavigate}>
				<div className="flex items-center">
					<div className="text-2xl flex items-center justify-center me-2 h-10 w-10 rounded-full border-4 gc-border-green font-bold">{props.username[0].toUpperCase()}</div>
					<div>
						<div className="text-xl flex items-center font-bold">{props.username}{props.role === "admin" ? <span className="text-sm font-normal text-red-500 mx-3">{props.role}</span> : <>{props.role === "superuser" ? <span className="text-sm mx-3 font-normal text-green-500">{props.role}</span> : <span className="text-sm mx-3 font-normal text-blue-500">{props.role}</span>} </>}</div>
						<div className="text-sm font-light">{props.email}</div>
					</div>
				</div>
			</div>
			<div>
			{props.admin ? <>
				<div onClick={props.onDelete} className="flex items-center my-1 hover:scale-105 duration-200"><MdDeleteForever className="text-2xl mx-1 text-red-600" />Delete</div>
				<div className="flex items-center my-1 hover:scale-105 duration-200">
					{props.role === "admin" ? <BiSolidUser className="text-xl mx-1 text-red-500" /> : <>
						{props.role === "superuser" ? <BiSolidUser className="text-xl mx-1 text-green-600" /> : <BiSolidUser className="text-xl mx-1 text-blue-600" />}
					</>}
					<select value={props.role} className="font-bold" onChange={(e) => { changerole(props.id, e) }}>
						<option value="admin" name="Admin">Admin</option>
						<option value="superuser" name="SuperUser">SuperUser</option>
						<option value="user" name="User">User</option>

					</select>
				</div>
				</>:null}
			</div>

		</div>
	)
}

export default UserCard;