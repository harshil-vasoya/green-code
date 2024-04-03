import Cookies from "js-cookie";

async function addSolution(data ,setMessage , callbackforok , callbackforexpire )
	{
	await	fetch(`${process.env.REACT_APP_SERVER_URL}api/v1/admin/solution/add`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				"token": Cookies.get("adminToken")
			},
			body: JSON.stringify(data)
		}).then((res) => (res.json()))
			.then((res) => {
				if (res.status === "OK") {
          callbackforok();
				} 
                else if (res.status==="EXPIRED_TOKEN")
                {
                 setMessage(res.message);
                 callbackforexpire();   
                }
                else {
					setMessage(res.message);
				}
			})
			.catch((e) => {
				console.log(e);
			})
	}

    export default addSolution;