import Cookies from 'js-cookie';
function addQuestionByUser(data,setMessage, callback,callback2)
{
    fetch(`${process.env.REACT_APP_SERVER_URL}api/v2/user/addQuestion`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'token': Cookies.get("superuserToken")
			},
			body: JSON.stringify(data)
		}).then((res) => (res.json()))
			.then((res) => {
				if (res.status === "OK") {
setMessage("Reqest question successfully");
setTimeout(() => {callback2()}, 1000);


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

export default addQuestionByUser;