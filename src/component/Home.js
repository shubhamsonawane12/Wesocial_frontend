import React from 'react';
import Topbar from './topbar';
import Sidebar from './sidebar';
import '../css/home.css'
const Home = (props)=>{
const { children } = props;
 const userData = props.userData;
    return (
  <div className="home_mainContainer">
      <div className="home_Topbar"><Topbar userData={userData} /></div>
      <div className="home_Sidebar"><Sidebar userData={userData}  /></div>
      <div className="home_Content">{children}</div>
</div>
    );
};
export default Home;