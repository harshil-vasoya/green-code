import Cookies from "js-cookie";

async function deleteUser(id,setMessage,callback) {

    await fetch(`${process.env.REACT_APP_SERVER_URL}api/v1/admin/user/` + id + "/delete", {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            "token": Cookies.get("adminToken")
        }
    }).then(res => res.json())
        .then(res => {
            if (res.status === "OK") {
               
                setMessage(res.message)
                setTimeout(()=>{
                    setMessage("")
                },2000)
            }
            else if (res.status === "EXPIRED_TOKEN") {
                callback();
            }
            else {
                setMessage(res.message)
                callback();
            }
        })
        .catch(e => console.log("error : " + e));
}
export default deleteUser;