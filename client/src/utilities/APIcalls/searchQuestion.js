import Cookies from "js-cookie";

async function searchQuestion(data ,setData,callback)
{
    await fetch(`${process.env.REACT_APP_SERVER_URL}api/v1/home/question?search=${encodeURIComponent(data)}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "token": Cookies.get("userToken")
        },
    }).then(res => res.json())
        .then(res => {
            if (res.status === "OK") {
                setData([...res.data]);
            }
            else if(res.status==="EXPIRED_TOKEN"){
                callback()
            }
        })
        .catch(e => console.log("error : " + e));
}
export default searchQuestion;