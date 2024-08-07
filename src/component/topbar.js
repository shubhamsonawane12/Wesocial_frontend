import React, { useRef } from 'react';
import "../css/topbar.css";
import { MdOutlineTextsms } from "react-icons/md";
import { VscBellDot } from "react-icons/vsc";
import { FaCircleUser } from "react-icons/fa6";
import SearchBar from "./Searchbar.js";
import { Link } from 'react-router-dom';

function Topbar(props) {

    const sidebarRef = useRef(null);
  const {userData} = props;

  if (!userData) {
    return ;
  }

    function showSidebar() {
        if (sidebarRef.current) {
            sidebarRef.current.style.display = 'flex';
        }
    }

    function hideSidebar() {
        if (sidebarRef.current) {
            sidebarRef.current.style.display = 'none';
        }
    }

    return (
           <div className="home_mainContainer">
        <div className="home_Topbar">
        <div className="Topbar_mainbox">
            <header>
                <nav>
                    <ul className="sidebar" ref={sidebarRef}>
                        <li onClick={hideSidebar}><a href="#"><svg xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 96 960 960" width="26"><path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg></a></li>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Search</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Login</a></li>
                    </ul>
                    <ul>
                        {/* <li><img src="image_url_here" alt="LogoImg" id="logo" width="100" height="40" /></li> */}
                        <li className="hideOnMobile"><a href="#"><b id="logoName">WeSocial</b></a></li>
<div className='Searchbar_maincontainer'> <SearchBar/></div>
                        <li className="hideOnMobile"><a href="#"><MdOutlineTextsms/></a></li>
                        <li className="hideOnMobile"><a href="#"><VscBellDot/></a></li>
                        <li className="hideOnMobile"><Link to="/profile">      {userData.profileImage ? (
            <div className="topbar_usercircleimg">
              <img src={userData.profileImage} alt="Avatar" />
            </div>
          ) : (
            <FaCircleUser className="topbar_usericon" />
          )}
</Link></li>
                        <li className="menu-button" onClick={showSidebar}><a href="#"><svg xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 96 960 960" width="26"><path d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"/></svg></a></li>
                    </ul>
                </nav>
            </header>
        </div>
        </div>
        </div>
    );
}

export default Topbar;
