import Cookies from "js-cookie";

function deleteInList(list, value ,setMessage, callback ) {
    fetch(`${process.env.REACT_APP_SERVER_URL}api/v1/admin/list/alter/${list}/remove/${value}` , {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "token": Cookies.get("adminToken")
            }
        }).then(res => res.json())
            .then(res => {
                if (res.status === "OK") {
                    setMessage(`delete ${value} successfully`);
                setTimeout(() => {setMessage("")}, 1000);

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

function addInList(list, value ,setMessage, callback ) {

    fetch(`${process.env.REACT_APP_SERVER_URL}api/v1/admin/list/alter/${list}/add/${value}` , {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            "token": Cookies.get("adminToken")
        }
    }).then(res => res.json())
        .then(res => {
            if (res.status === "OK") {
                setMessage(`add ${value} successfully`);
                setTimeout(() => {setMessage("")}, 1000);
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

export {deleteInList,addInList};