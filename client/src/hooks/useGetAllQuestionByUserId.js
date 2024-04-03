import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
 function useGetAllQuestionByUserID () {
	const [getAllData, setAllData] = useState([]);
	const navigate=useNavigate();

	 useEffect(() => {
		 fetch(`${process.env.REACT_APP_SERVER_URL}api/v2/user/getQuestionByUserId`, {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				"token": Cookies.get("superuserToken")
			}
		}).then(res => res.json())
			.then(res => {
				if (res.status === "OK") {
					setAllData(res.data);
				}
				else if (res.status === "EXPIRED_TOKEN") {
					navigate("/login");
				}
				else{
					console.log(res);
				}
			})
			.catch(e => console.log("error : " + e));
	}, [navigate]);
	return [getAllData , setAllData];
}

export default useGetAllQuestionByUserID;