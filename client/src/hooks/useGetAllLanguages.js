import Cookies from "js-cookie";
import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
function useGetAllLanguages() {
    const navigate=useNavigate()
  const [arrayValues, setArrayValues] = useState([]);
     useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}api/v1/home/list/get/language`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "token": Cookies.get("userToken")
        }
    }).then(res => res.json())
        .then(res => {
            if (res.status === "OK") {
                setArrayValues(res.data.list);
            }
            else if (res.status === "EXPIRED_TOKEN") {
                navigate("/login");
            }
           
        })
        .catch(e => console.log("error : " + e));

}, [navigate])
    return [arrayValues, setArrayValues];
}
export default useGetAllLanguages;