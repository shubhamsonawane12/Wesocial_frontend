import "./css/main.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./component/Login";
import Register from "./component/Register";
import Home from "./component/Home";
import Profile  from "./component/profile.js";
import { useEffect, useState } from "react";
import SearchedProfile from "./component/SearchedProifle.js"
// import Home from "./component/Home";
import Cookies from 'universal-cookie';
import Feed from "./component/feed.js"

const cookies = new Cookies();
const token = cookies.get('token');
function Main() { 
  const [userData,setUserData]=useState(null);
  const removeData = ()=>{ 
    setUserData(null);
  };
  useEffect(()=>{
    fetchUserData();
  },[]);  const fetchUserData = async () => {
    try {
      // Make an HTTP request to your backend API to get user details
      const response = await fetch('https://wesocial-backend.onrender.com/api/auth/profile ', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the user token
          'Content-Type': 'application/json',
        },
      }); 

      if (response.ok) {
        const data = await response.json();
        setUserData(data); // Update state with user data
      } else {
        console.error('Failed to fetch user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };  console.log("userdata from main:",userData)

  return (
    <Router>
      <Routes>
        {/* Separate Routes for Login and Register */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Routes that include Topbar and Sidebar */}
        <Route path="*" element={<Home userData={userData}> {/* Add routes inside Layout */}
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            {/* Add other main app routes here */}
            <Route path="/searchProfile/:id" element ={<SearchedProfile Account_userData={userData}/> }/>
            <Route path="/Profile" element={<Profile  userData={userData}/>}/>
            <Route path="*" element={<Feed userData={userData}/>}/>
          </Routes>
        </Home>} />
      </Routes>
    </Router>
  );
} 
 
export default Main;
