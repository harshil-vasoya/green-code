import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";





const SignIn = () => {
    var navigate = useNavigate();

	const [data, setData] = useState({
		username: "",
		email: "",
		password: "",
		cpassword: "",
	  });
	  function handleData(e) {
		document.getElementById("exampleInputPassword2").style.borderColor ="#503524";
		document.getElementById("exampleInputPassword1").style.borderColor ="#503524";
		  var name = e.target.name;
		  var value = e.target.value;
		  setData({ ...data, [name]: value });
	  }
	  function sendData(event) {
		event.preventDefault();
		if (data.password !== data.cpassword) {
		  document.getElementById("exampleInputPassword2").style.borderColor =
			"red";
			document.getElementById("exampleInputPassword1").style.borderColor =
			  "red";
		  setMessage("passwords does not match");
		}
		else
		 {
		  fetch(`${process.env.REACT_APP_SERVER_URL}api/v1/authentication/SignIn`, {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		  })
			.then((res) => res.json())
			.then((res) => {
			  if (res.status === "OK") {
				navigate("/login");
				return;
			  } else {
				setMessage(res.message);
				return;
			  }
			})
			.catch((e) => {
			  return console.log(e);
			});
		}
	  }
	
	  const [message, setMessage] = useState("");

	return (
		<>
			<div className="static">
				<div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 max-w-[380px] w-[90vw] gc-shadow-14 rounded-lg">
					<div className="flex justify-center pb-2 pt-6">
						<img src="/assets/images/GreenCode_Logo_main.png" width={200} alt="logo of gree-bank"></img>
					</div>
					<h3 className="text-center font-bold gc-text-black text-xl pb-2">Sign In</h3>
					<form onSubmit={sendData}>
						<div className="text-red-700 text-center ">{message}</div>
						<div className="px-4 mb-4">
							<label className="block gc-text-black text-sm font-bold mb-0" for="usexampleInputNameername">
								Username :
							</label>
							<input className="appearance-none gc-border-black border rounded w-full py-2 px-4 gc-color-black leading-tight focus:outline-none focus:shadow-outline" id="exampleInputName" type="text"placeholder="Name" name="username" onChange={handleData} required  pattern="^[a-zA-Z\s0-9!@#$%^&*()]{3,}$"/>
						</div>
						<div className="px-4 mb-4">
							<label className="block gc-text-black text-sm font-bold mb-0" for="exampleInputEmail1">
								Email :
							</label>
							<input className="appearance-none gc-border-black border rounded w-full py-2 px-4 gc-color-black leading-tight focus:outline-none " id="exampleInputEmail1" type="text" placeholder="Email" onChange={handleData} name="email"
								pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
								title="Please enter a valid Email address"
								required />
						</div>
						<div className="px-4 mb-4">
							<label className="block gc-text-black text-sm font-bold mb-0" for="exampleInputPassword1">
								Password :
							</label>
							<input className="appearance-none gc-border-black border rounded w-full py-2 px-4 gc-color-black leading-tight focus:outline-none " id="exampleInputPassword1" type="password" placeholder="Password" 
								pattern="^(?!\s)[^\s]{8,}$"
								title="Password must be atleast 8 characters long"
								name="password"
								onChange={handleData}
								required />
						</div>
						<div className="px-4 mb-4">
							<label className="block gc-text-black text-sm font-bold mb-0" for="exampleInputPassword2">
								CPassword :
							</label>
							<input className="appearance-none gc-border-black border rounded w-full py-2 px-4 gc-color-black leading-tight focus:outline-none " id="exampleInputPassword2" type="password" placeholder="Cpassword" name="cpassword"
								pattern="^(?!\s)[^\s]{8,}$"
								title="Password must be atleast 8 characters long"
								onChange={handleData}
								required />
						</div>
						<div>
							<div
								className="flex justify-start px-4 text-sm pb-4 gc-color-black"
								style={{ opacity: "0.4" }}
							>
								*Name containes minimum 3 characters
								<br />
								*Password must be atleast 8 characters long
							</div>
						</div>
						<div className="px-4 pb-2">
							<input type="submit" className="border gc-border-green rounded w-full pt-1 pb-1 font-bold gc-bg-green" style={{color:"white"}}/>
						</div>
						<div className="pb-3">
							<span className="pl-4" style={{ opacity: "0.4" }} >Allready have account ?</span>
							<Link to="/LogIn" className="ml-2 gc-text-green gc-hover-text-black">
								LogIn
							</Link>
						</div>
					</form>
				</div>
			</div>

		</>
	);
}

export default SignIn;