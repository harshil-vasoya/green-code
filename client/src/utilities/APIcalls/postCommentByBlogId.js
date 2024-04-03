import Cookies from "js-cookie";

async function postBlogComment(id, comment, callback)
{
    var responce;
    await fetch(`${process.env.REACT_APP_SERVER_URL}api/v2/blog/addcomment/` + id , {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'token': Cookies.get("userToken")? Cookies.get("userToken"):Cookies.get("superuserToken")
        },
        body: JSON.stringify({ data: comment })
    }).then((res) => res.json())
        .then((res) => {
            if (res.status === "OK") {
                responce=res.data;
            } else{
                callback(res)
            }
        })
        .catch((e) => {
            console.log(e);
        })
        return responce;
}
export default postBlogComment;