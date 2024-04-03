import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
function useGetAllHistory()
{
    const [history, setHistory] = useState([]);
    const navigate=useNavigate();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}api/v2/history/all`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "token": Cookies.get("adminToken")
            }
        }).then(res => res.json())
            .then(res => {
                if (res.status == "OK") {
                    setHistory(res.data);
                }
                else if (res.status === "EXPIRED_TOKEN") {
                    navigate("/login");
                }
            })
            .catch(e => console.log("error : " + e));
    }, []);

    return [history, setHistory];
}
export default useGetAllHistory;