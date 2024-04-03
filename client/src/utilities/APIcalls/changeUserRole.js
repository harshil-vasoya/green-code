import Cookies from "js-cookie";
async function changeUserRole(id,newrole,callback)
{
    await fetch(`${process.env.REACT_APP_SERVER_URL}api/v1/admin/user/` + id + "/changeRole", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            "token": Cookies.get("adminToken")
        },
        body:JSON.stringify({newrole:newrole})
    }).then(res => res.json())
        .then(res => {
            if (res.status === "OK") {

            }
            else if (res.status === "EXPIRED_TOKEN") {
                callback();
            }
            else
            {
                callback();
            }
           
            
        })
        .catch(e => console.log("error : " + e));
}
export default changeUserRole;