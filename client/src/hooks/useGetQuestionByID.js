import { useEffect,useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const useGetQuestionDataById = (id,disable)=>{


    const [getData, setData] = useState({ comments: [], solutions:[]});
    const [getError,setError]=useState({});
    const [solution, setSolution] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
       
        if(!disable){
            fetch(`${process.env.REACT_APP_SERVER_URL}api/v1/home/question/` + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    token: Cookies.get("userToken") || Cookies.get("adminToken"),
                },
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.status === "OK") {
                        setData(res.data);
                        setSolution(res.data.solutions);
                    } else if (res.status === "EXPIRED_TOKEN") {
                        navigate("/login");
                    } else {
                        setError(res.message);
                        console.log(res);
                    }
                })
                .catch((e) => console.log("error : " + e));
        }
  
    },[id,navigate,disable]);

    return [getData,setData,solution,setSolution,getError,setError];
}
export default useGetQuestionDataById;