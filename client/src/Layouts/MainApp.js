import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

function App() {

  const [logInStatus,setLogInStatus] = useState(false);
  
  useEffect(()=>{
    if(Cookies.get("userToken") || Cookies.get("superuserToken"))
    setLogInStatus(true);
  },[])


  return (
    <>
      <div className="md:h-screen md:w-screen md:flex md:flex-col md:justify-between gc-text-black">
        <Header loginStatus={logInStatus} username={Cookies.get("username")} onLogOut={()=>{Cookies.remove("userToken");Cookies.remove("superuserToken");Cookies.remove("adminToken");setLogInStatus(false)}} />
        <div className="w-full h-full">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
