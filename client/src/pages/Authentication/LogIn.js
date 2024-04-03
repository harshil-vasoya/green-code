import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cookie from "js-cookie";


const LogIn = () => {
  const [message, setMessage] = useState("");
  var navigate = useNavigate();
	function login(e){
		e.preventDefault();
		fetch(`${process.env.REACT_APP_SERVER_URL}api/v1/authentication/LogIn`, {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify(data),
		})
		  .then((res) => res.json())
		  .then((res) => {
			if (res.status === "OK") {
			  if (res.role === "user") {
				cookie.set("userToken", res.token, {
				  expires: new Date().getTime() + 2 * 1000 * 3600,
				});
				cookie.set("username", res.username, {
				  expires: new Date().getTime() + 2 * 1000 * 3600,
				});
				navigate("/");
			  }
			  else if (res.role === "admin") {
				cookie.set("username", res.username +" admin", {
				  expires: new Date().getTime() + 2 * 1000 * 3600,
				});
				cookie.set("adminToken", res.token, {
				  expires: new Date().getTime() + 2 * 1000 * 3600,
				});
				cookie.set("userToken", res.token, {
				  expires: new Date().getTime() + 2 * 1000 * 3600,
				});
				navigate("/admin");
			  }
			  else if(res.role==="superuser")
			  {
				cookie.set("username", res.username , {
					expires: new Date().getTime() + 2 * 1000 * 3600,
				  });
				  cookie.set("superuserToken", res.token, {
					expires: new Date().getTime() + 2 * 1000 * 3600,
				  });
				  navigate("/");
			  }
			}
			setMessage(res.message);
		  })
		  .catch((e) => {
			console.log(e);
		  });
	  }
	function handleData(e) {
		var name = e.target.name;
		var value = e.target.value;
		setData({ ...data, [name]: value });
	  }
  const [data, setData] = useState({ email: "", password: "" });

	
	return(

		<>
			<div className="static">
				<div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[340px] gc-shadow-14 rounded-lg">
					<div className="flex justify-center pb-2 pt-6">
						<img src="/assets/images/GreenCode_Logo_main.png" width={200} alt="logo of gree-bank"></img>
					</div>
					<h3 className="text-center font-bold gc-text-black text-xl pb-2">Log In</h3>
					<form>
						<div className="text-red-700 text-center ">{message}</div>
						<div className="px-4 mb-4">
							<label className="block gc-text-black text-sm font-bold mb-0" for="email">
								Email :
							</label>
							<input className="appearance-none gc-border-black border rounded w-full py-2 px-4 gc-color-black leading-tight focus:outline-none " id="email" type="text" placeholder="Username" name="email"  onChange={handleData}
								pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
								title="Please enter a valid Email address"
								required />
						</div>
						<div className="px-4 mb-4">
							<label className="block gc-text-black text-sm font-bold mb-0" for="password">
								Password :
							</label>
							<input className="appearance-none gc-border-black border rounded w-full py-2 px-4 gc-color-black leading-tight focus:outline-none " id="password" type="password" placeholder="Password"  name="password" onChange={handleData}
								pattern="^(?!\s)[^\s]{8,}$"
								title="Password must be atleast 8 characters long"
								required />
						</div>
						<div className="px-4 pb-2">
							<input type="submit"  onClick={login}  className="border gc-border-green rounded w-full pt-1 pb-1 font-bold gc-bg-green" style={{ color: "white" }} />
						</div>
						<div className="pb-3">
							<span className="pl-4" style={{ opacity: "0.4" }} >Don't have account ?</span>
							<Link to="/SignIn" className="ml-2 gc-text-green gc-hover-text-black">
								SignIn
							</Link>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default LogIn;