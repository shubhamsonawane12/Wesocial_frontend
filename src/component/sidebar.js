import "../css/sidebar.css"
import { MdRssFeed } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { BiSolidVideos } from "react-icons/bi";
import { IoMdPhotos } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { MdGroups } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";


let usercount= 112;
function Sidebar(props){
     const {userData} = props;

  if (!userData) {
    return <div>Loading...</div>;
  }

return(

    <>


    <div className="Main_sidebar">
     <div className="Sidebar_userprofile">
    <div className="userprofile_avatar">
    
            <Link to='/profile'>{userData.profileImage ? (
         <div className="sidebar_usercircleimg">
              <img src={userData.profileImage} alt="Avatar" />
            </div>
          ) : (
            <FaCircleUser className="sidebar_usericon" />
            
          )}
          </Link> 
           

       
   </div> 
    <div  className="username_container">
    {userData ? (
    <Link to='/profile' style={{ textDecoration: 'none', color: 'inherit' }} > <p>{userData.FirstName} {userData.LastName}</p> </Link>
         ) : (   <p>Login</p>  )}
    <div className="followdetail"> 
     <p>connections .. </p><p>{usercount}</p> 
    </div>
     </div>  
    </div>
   
    <div className="sidebar_containt">
    
 <ul>
   <div className="container_box">      <Link to='*'><li> <icons><MdRssFeed/></icons><a href="#" >Feed</a></li></Link></div>
      <div className="container_box"> <li> <icons><FaUserFriends/></icons><a href="#">Friends</a></li></div>
       <div className="container_box"><li><icons><BiSolidVideos/></icons><a href="#" >Watch Videos</a></li></div>
       <div className="container_box"> <li><icons><IoMdPhotos/></icons><a href="#" >Photos</a></li></div>
      <div className="container_box"> <li><icons><AiFillLike/></icons><a href="#" >Liked Posts</a></li></div>
   <div className="mid_title"> <p>Explore</p> </div>

   <div className="explore_container">

 <ul>
          <div className="explore_container_box">    <li><icons><MdGroups/></icons><a href="#" >Groups</a></li></div>
                <div className="explore_container_box">   <li><icons><FaUserPlus/></icons><a href="#" >Recently Joined</a></li></div>
    </ul>


   </div>
 </ul>
    </div>

    </div>

    </>
)
}

 export default  Sidebar;


