import Cookies from 'js-cookie';
function updateQuesionisAccepted(id,setMessage, callback)
{
    fetch(`${process.env.REACT_APP_SERVER_URL}api/v2/admin/changeisAccepted`, {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json',
				'token': Cookies.get("adminToken")
			},
			body: JSON.stringify({id:id})
		}).then((res) => (res.json()))
			.then((res) => {
				if (res.status === "OK") {
setMessage("Change question state successfully");


				}
        else if (res.status === "EXPIRED_TOKEN") {
            setMessage(res.message);
            setTimeout(() => {callback()}, 1000);
      }
       else {
        setMessage(res.message);
				}
			})
			.catch((e) => {
				console.log(e);
			})

}

export default updateQuesionisAccepted;