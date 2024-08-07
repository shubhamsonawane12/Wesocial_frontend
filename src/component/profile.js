import React, { useState, useRef } from 'react';
import { FaCircleUser } from "react-icons/fa6";
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import "../css/profile.css";
import { IoCamera } from "react-icons/io5";
import axios from 'axios';
import Cookies from 'universal-cookie';
import Posts from "./Post.js";
import About from './About';
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

function Profile(props) {
  const [coverImg, setCoverImg] = useState(null);
  const [userImg, setUserImg] = useState(null);
  const [error, setError] = useState(null);
    const [active, setActive] = useState('Posts');

  

  const fileInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const userData = props.userData;

  const cookies = new Cookies();
  const handleClick = (link) => {
    setActive(link);
  }; 

  const handleUploadToBackend = async (file) => {
    const token = cookies.get('token'); // Adjust the method of getting token if necessary
    if (!file) return console.log("Image file is not selected");

    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      const response = await axios.post('https://wesocial-backend.onrender.com/api/auth/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, // Ensure the token is included
        },
        timeout: 30000 // Set timeout to 30 seconds
      });
      console.log('Image uploaded successfully:', response.data);
    } catch (error) {
      setError('Error uploading image: ' + error.message);
      console.error('Error uploading image:', error);
    }
  };

  const coverupload = async (file) => {
    const token = cookies.get('token');
    if (!file) return console.log("Cover file is not selected");

    const formData = new FormData();
    formData.append('coverImage', file);

    try {
      const response = await axios.post('https://wesocial-backend.onrender.com/api/auth/coverupload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
        // timeout: 30000 // Set timeout to 30 seconds
      });
      console.log('Cover image uploaded successfully:', response.data);
    } catch (error) {
      setError('Error uploading cover image: ' + error.message);
      console.error('Error uploading cover image:', error);
    }
  };

  const handleFileChange = (fileItems) => {
    if (fileItems.length > 0) {
      const file = fileItems[0].file;
      setUserImg(URL.createObjectURL(file));
      handleUploadToBackend(file); // Automatically upload image
    }
  };

  const handlecoverFileChange = (fileItems) => {
    if (fileItems.length > 0) {
      const file = fileItems[0].file;
      setCoverImg(URL.createObjectURL(file));
      coverupload(file);
    }
  };

  if (!userData) {
    return <button>Login please</button>; // Or any loading indicator
  }

  return (
    <div className="Main_profile_container">
      <div className="profile_container">
        <div className="coverimg_container">
          {coverImg ? (
            <img src={coverImg} alt="Cover Avatar" />
          ) : userData.coverImage ? (
            <img src={userData.coverImage} alt="Cover Avatar" />
          ) : (
            <>
              <button onClick= {() => coverInputRef.current.click()} >Add Cover Photo</button>
              <input
                type="file"
                ref={coverInputRef}
                className="filepond"
                name="filepond"
                accept="image/png, image/jpeg, image/gif"
                style={{ display: 'none' }}
                onChange={e => {
                  const file = e.target.files[0];
                  if (file) {
                    setCoverImg(URL.createObjectURL(file));
                    coverupload(file);
                  }
                }}
              />
              <FilePond
                labelIdle={``}
                imagePreviewHeight={170}
                imageCropAspectRatio="1:1"
                imageResizeTargetWidth={200}
                imageResizeTargetHeight={200}
                // stylePanelLayout="compact circle"
                styleLoadIndicatorPosition="center bottom"
                styleButtonRemoveItemPosition="center bottom"
                acceptedFileTypes={['image/*']}
                onupdatefiles={handlecoverFileChange}
              />
            </>
          )}
          <div className="User_container">
            <div className="avatar_circle">
              {userImg ? (
                <div className="avatarimg">
                  <img src={userImg} alt="Avatar" />
                </div>
              ) : userData.profileImage ? (
                <div className="avatarimg">
                  <img src={userData.profileImage} alt="Avatar" />
                </div>
              ) : (
                <FaCircleUser className="avatar" />
              )}
              <div className="filepond-container">
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
                  onupdatefiles={handleFileChange}
                />
                {!userData.profileImage && !userImg && (
                  <IoCamera
                    className="camera-icon"
                    onClick={() => fileInputRef.current.click()}
                  />
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="filepond"
                  name="filepond"
                  accept="image/png, image/jpeg, image/gif"
                  style={{ display: 'none' }}
                  onChange={e => {
                    const file = e.target.files[0];
                    if (file) {
                      setUserImg(URL.createObjectURL(file));
                      handleUploadToBackend(file);
                    }
                  }}
                />
              </div>
            </div>
            <div className="username_Container">
              <div className="Name">
                <p>{userData.FirstName} {userData.LastName}</p>
              </div>
            </div>
          </div>
        </div>
       <div className='nav_container_box'> 

  



<div className='navbar'>
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
<div className='user_post_maincontainer'>


     <div className='user_post_maincontainer'>
        {active === 'Posts' && <Posts userData={userData} />}
        {active === 'About' && <About userData={userData}/>}
        {/* {active === 'Friends' && <Friends />}
        {active === 'Photos' && <Photos />}
        {active === 'Videos' && <Videos />} */}
      </div>
</div>
      </div>
   
  );
}

export default Profile;
