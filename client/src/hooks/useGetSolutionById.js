import { useEffect,useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const useGetSolutionById = (id,disable)=>{


    const [getData, setData] = useState();
    const [getError,setError]=useState({});
    const navigate = useNavigate();

    useEffect(()=>{
    console.log("hiit")

        if(disable){
            fetch(`${process.env.REACT_APP_SERVER_URL}api/v1/home/solution/` + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    token: Cookies.get("userToken") || Cookies.get("adminToken"),
                },
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    if (res.status === "OK") {
                        setData(res.data);
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

    return [getData,setData,getError,setError];
}
export default useGetSolutionById;