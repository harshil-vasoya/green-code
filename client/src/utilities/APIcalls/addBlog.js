import Cookies from "js-cookie";

function addBlog(title, data , setMessage , callback)
{
    var token=""

   
    if(Cookies.get("userToken"))
    {
        token="userToken";
    }
    else if(Cookies.get("adminToken"))
    {
        token="adminToken";
    }
    else if(Cookies.get("superuserToken"))
    {
        token="superuserToken";
    }
    

    fetch(`${process.env.REACT_APP_SERVER_URL}api/v2/blog/add` , {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "token": Cookies.get(token)
        },
        body:JSON.stringify({data:data , title:title})
    }).then(res => res.json())
        .then(res => {
            if (res.status === "OK") {
                setMessage(`add successfully`);
            setTimeout(() => {setMessage("")}, 1000);
            console.log(res.data)

            }
            else if (res.status === "EXPIRED_TOKEN") {
                callback();
            }
            else {
                setMessage(res.message);
            }
        })
        .catch(e => console.log("error : " + e));
}

export default addBlog;