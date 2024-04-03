import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function useGetAllUser()
{
    const [userData, setUserData] = useState([]); 
    const navigate=useNavigate();
    useEffect(() => {
		fetch(`${process.env.REACT_APP_SERVER_URL}api/v1/home/user`, {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				"token": Cookies.get("adminToken")
			}
		}).then(res => res.json())
			.then(res => {
				if (res.status === "OK") {
					setUserData(res.data);
				}
				else if (res.status === "EXPIRED_TOKEN") {
					navigate("/login");
				}
			})
			.catch(e => console.log("error : " + e));

	}, [navigate])
    return [userData, setUserData];
}

export default useGetAllUser;