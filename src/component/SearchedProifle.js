import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { FaCircleUser, FaLessThanEqual } from "react-icons/fa6";
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import "../css/Searchprofile.css";
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { css } from '@emotion/react';
import { IoCamera } from "react-icons/io5";
import axios from 'axios';
import Searchpro_Posts from "./Searchpro_post.js";
import About from './About';
import Message_btn from './Message_btn.js';

// Import FilePond plugins
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';

// Register the plugins
registerPlugin(
  FilePondPluginFileEncode,
  FilePondPluginFileValidateType,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageCrop,
  FilePondPluginImageResize,
  FilePondPluginImageTransform
);

function SerachedProfile(props) {
  const { id } = useParams();
  const [coverImg, setCoverImg] = useState(null);
  const [userImg, setUserImg] = useState(null);
  const [error, setError] = useState(null);
  const [active, setActive] = useState('Posts');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);
  const [viewPostVisible, setViewPostVisible] = useState(false);

  const Account_userData = props.Account_userData;

  
 


  const handleClickBtn = async () => {
    try {
     const  userId = Account_userData.userId;

      const url = following ? 'https://wesocial-backend.onrender.com/api/auth/unfollow' : 'https://wesocial-backend.onrender.com/api/auth/follow';
      await axios.post(url, { userId, followId: id });
      setFollowing(!following);
       console.log("user follow successsfull");
    } catch (err) {
      console.error('Error following/unfollowing user:', err);
    }
  };

  const handleClick = (link) => {
    setActive(link);
  };
  const showViewPost = () => {
    setViewPostVisible(true);
  }; 

  const closeViewPost = () => {
    setViewPostVisible(false);
  };

useEffect(() => {
    const fetchUserData = async () => {
     

        try {
            const response = await fetch('https://wesocial-backend.onrender.com/api/auth/Searchedprofile', {
                headers: {
                    'Content-Type': 'application/json',
                    'User-ID': id // Send user ID in headers
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setUserData(data);

                
        } catch (err) {
            console.error('Error fetching user data:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    fetchUserData();


    const fetchFollowStatus = async () => {
  try {
    const followResponse = await fetch(`https://wesocial-backend.onrender.com/api/auth/isFollowing?userId=${Account_userData.userId}&followId=${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!followResponse.ok) {
      throw new Error(`HTTP error! Status: ${followResponse.status}`);
    }

    const followData = await followResponse.json();
    setFollowing(followData.isFollowing); // Update state based on backend response
  } catch (err) {
    console.error('Error fetching follow status:', err);
    // Handle error if necessary
  }
};

 fetchFollowStatus(); 
}, [id, Account_userData]);
 

 if (!Account_userData) {
    return <div>Loading...</div>;
  } 
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!userData) {
    return <button>Login please</button>; // Or any loading indicator
  }

  return (
    <div className="Searchprofile_Main_profile_container">
      <div className="Searchprofile_profile_container">
        <div className="Searchprofile_coverimg_container">
          {coverImg ? (
            <img src={coverImg} alt="Cover Avatar" />
          ) : userData.coverImage ? (
            <img src={userData.coverImage} alt="Cover Avatar" />
          ) : (
            <>
              <input
                type="file"
                className="Searchprofile_filepond"
                name="filepond"
                accept="image/png, image/jpeg, image/gif"
                style={{ display: 'none' }}
              />
            </>
          )}
          <div className="Searchprofile_User_container">
            <div className="Searchprofile_avatar_circle">
              {userImg ? (
                <div className="Searchprofile_avatarimg">
                  <img src={userImg} alt="Avatar" />
                </div>
              ) : userData.profileImage ? (
                <div className="Searchprofile_avatarimg">
                  <img src={userData.profileImage} alt="Avatar" />
                </div>
              ) : (
                <FaCircleUser className="avatar" />
              )}
              <div className="Searchprofile_filepond-container">
                <FilePond
                  labelIdle={``}
                  imagePreviewHeight={170}
                  imageCropAspectRatio="1:1"
                  imageResizeTargetWidth={200}
                  imageResizeTargetHeight={200}
                  stylePanelLayout="compact circle"
                  styleLoadIndicatorPosition="center bottom"
                  styleButtonRemoveItemPosition="center bottom"
                  acceptedFileTypes={['image/*']}
                />
                <input
                  type="file"
                  className="Searchprofile_filepond"
                  name="filepond"
                  accept="image/png, image/jpeg, image/gif"
                  style={{ display: 'none' }}
                  onChange={e => {
                    const file = e.target.files[0];
                    if (file) {
                      setUserImg(URL.createObjectURL(file));
                    }
                  }}
                />
              </div>
            </div>
            <div className="Searchprofile_username_Container">
              <div className="Searchprofile_Name">
                <p>{userData.FirstName} {userData.LastName}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='Searchprofile_nav_container_box'>
          <div className='Searchprofile_followbuttons'>
            <button
              className={`follow-button ${following ? 'following' : ''}`}
              onClick={handleClickBtn}
            >
              {following ? 'Following' : '+ Follow'}
            </button>
            <button className="message_btn" onClick ={showViewPost}>Message</button>

          </div>
          <div className='Searchprofile_navbar'>
            <ul>
              <li><a href="#" className={`nav-link ${active === 'Posts' ? 'active' : ''}`} onClick={() => handleClick('Posts')}>Posts</a></li>
              <li><a href="#" className={`nav-link ${active === 'About' ? 'active' : ''}`} onClick={() => handleClick('About')}>About</a></li>
              <li><a href="#" className={`nav-link ${active === 'Friends' ? 'active' : ''}`} onClick={() => handleClick('Friends')}>Friends</a></li>
              <li><a href="#" className={`nav-link ${active === 'Photos' ? 'active' : ''}`} onClick={() => handleClick('Photos')}>Photos</a></li>
              <li><a href="#" className={`nav-link ${active === 'Videos' ? 'active' : ''}`} onClick={() => handleClick('Videos')}>Videos</a></li>
            </ul>
          </div>
        </div>
      </div>
         <div className={`viewpost ${viewPostVisible ? 'visible' : ''}`}>
      <div className='message_maincontainer'><Message_btn/></div>
        </div>
      <div className='Searchprofile_user_post_maincontainer'>
        {active === 'Posts' && <Searchpro_Posts userData={userData} />}
        {active === 'About' && <About userData={userData} />}
        {/* {active === 'Friends' && <Friends />}
        {active === 'Photos' && <Photos />}
        {active === 'Videos' && <Videos />} */}
      </div>
    </div>
  );
}
export default SerachedProfile;