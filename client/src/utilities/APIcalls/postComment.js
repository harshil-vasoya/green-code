import Cookies from "js-cookie";

async function postComment(id, comment, callback)
{

    var response ;
    await fetch(`${process.env.REACT_APP_SERVER_URL}api/v1/home/question/` + id + "/comment", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'token': Cookies.get("userToken") || Cookies.get("adminToken")
        },
        body: JSON.stringify({ data: comment })
    }).then((res) => res.json())
        .then((res) => {
            if (res.status === "OK") {
                response = res.data;
            } else{
                callback(res)
            }
        })
        .catch((e) => {
            console.log(e);
        })

        return response;
}
export default postComment;