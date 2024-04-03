import Cookies from 'js-cookie';
function addQuestion(data,setMessage, callback,callback2)
{
    fetch(`${process.env.REACT_APP_SERVER_URL}api/v1/admin/question/add`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'token': Cookies.get("adminToken")
			},
			body: JSON.stringify(data)
		}).then((res) => (res.json()))
			.then((res) => {
				if (res.status === "OK") {
setMessage("add successfully");
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

export default addQuestion;