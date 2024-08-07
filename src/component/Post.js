import React, { useState, useRef } from 'react';
import "../css/post.css";
import { FaHome } from "react-icons/fa";
import { MdOutlineRssFeed } from "react-icons/md";
import { IoIosHeart } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import { FcAddImage, FcVideoCall } from "react-icons/fc";
import axios from 'axios';
import { PiVideoFill } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import Cookies from 'universal-cookie';

const cookies = new Cookies(); 

function Posts(props) {
  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [postVideo, setPostVideo] = useState(null);
  const [error, setError] = useState(null);
  const [viewPostVisible, setViewPostVisible] = useState(false);
  const [likedPosts, setLikedPosts] = useState(new Set());

  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const userData = props.userData;

  const handlePostTextChange = (e) => {
    setPostText(e.target.value);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submit behavior
    console.log("post button clicked");

    const token = cookies.get('token');
    const formData = new FormData();

    if (postImage) {
      formData.append('postImage', postImage);
    }

    if (postVideo) {
      formData.append('postVideo', postVideo);
    }

    formData.append('postText', postText);

    setViewPostVisible(false);

    try {
      const response = await axios.post(
        postImage ? 'https://wesocial-backend.onrender.com/api/auth/postImage' : 'https://wesocial-backend.onrender.com/api/auth/postVideo',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
          timeout: 1800000,
        }
      );

      console.log(`${postImage ? 'postImage' : 'postVideo'} uploaded successfully:`, response.data);
      // Reset form state
      setPostText('');
      setPostImage(null);
      setPostVideo(null);
      // Hide the viewpost container after posting
    } catch (error) {
      setError(`Error uploading ${postImage ? 'imgpost' : 'postVideo'}: ${error.message}`);
      console.error(`Error uploading ${postImage ? 'imgpost' : 'postVideo'}:`, error);
    }
  };

  const showViewPost = () => {
    setViewPostVisible(true);
  };

  const closeViewPost = () => {
    setViewPostVisible(false);
  };

 const handleLikeButtonClick = async (postId) => {
  const token = cookies.get('token');
  const updatedLikedPosts = new Set(likedPosts);

  if (likedPosts.has(postId)) {
    updatedLikedPosts.delete(postId);
  } else {
    updatedLikedPosts.add(postId);
  }

  setLikedPosts(updatedLikedPosts);

  try {
    await axios.post(
      'https://wesocial-backend.onrender.com/api/auth/likePost',
      { postId, userId: userData.userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error(`Error liking post ${postId}:`, error);
  }
};

  return (
    <>
      <div className={`overlay ${viewPostVisible ? 'visible' : ''}`} onClick={() => setViewPostVisible(false)}></div>
      <div className="posts_Maincontainer">
        <div className="intro_container">
          <div className='intro_textcontainer'>
            <h5>Intro</h5>
            <p><FaHome /> Lives in New York, US</p>
            <p><MdOutlineRssFeed /> Followed by 500</p>
            <p><IoIosHeart /> Single</p>
          </div>
        </div>

        <div>
          <form onSubmit={handlePostSubmit} className="post_form">
            <div className='post_heading'>
              <div className='post_usercirleicon'>
                {userData.profileImage ? (
                  <div className='postusercircleimg'>
                    <img src={userData.profileImage} alt="Avatar" />
                  </div>
                ) : (
                  <FaCircleUser className="post_usericon" />
                )}
              </div>

              <textarea
                onChange={showViewPost}
                onClick={showViewPost}
                placeholder="What's on your mind?"
                className="post_textarea"
                readOnly
              ></textarea>
            </div>

            <div className='post_buttonbox'>
              <FcAddImage
                className="photos-icon"
                onClick={() => {
                  showViewPost();
                }}
              />
              <PiVideoFill
                className="postvideo_icon"
                onClick={() => {
                  showViewPost();
                }}
              />
            </div>
          </form>
        </div>
      </div>

       {userData.posts && (
 <div className="user_feed_maincontainer">
 <div className="user_Postgalary">
<div className='galary_maincontainer'>
  <div className='galarytitle'><p>Photos</p></div>
  <div className='photos_maincontainer'>
    {userData.posts.filter(post => post.postImage.length > 0).map((post, index) => (
      post.postImage.map((image, imgIndex) => (
        <div key={`${index}-${imgIndex}`} className="imagecontainer">
          <img src={image} alt={`Post ${index}`} />
        </div>
      ))
    ))}
  </div>
</div>
<div className='Friends_maincontainer' >

  <div className='friends_containertext'><p>Friends</p></div>
</div>
  </div>
  <div className="user_feed">
    {userData.posts.map(post => ( 
      <div className="feed_post" key={post._id}>
        <div className="circle_profile_container">
          {userData.profileImage ? (
            <div className="postusercircleimg">
              <img src={userData.profileImage} alt="Avatar" />
            </div>
          ) : (
            <FaCircleUser className=" " />
          )}
          <p>{userData.FirstName} {userData.LastName}</p>
        </div>
        <div className="feed_posttextbox">
          <p>{post.postText}</p>
        </div>
        <div className="Post_mediacontainer">
          {post.postImage.length > 0 && post.postImage.map((image, index) => (
            <img key={index} src={image} alt="Post" className="post_media" />
          ))}
          {post.postVideo && (
            <video src={post.postVideo} controls className="post_media" />
          )}
        </div>
        <div className="feed_postbuttonbox">
          <button 
            onClick={() => handleLikeButtonClick(post._id)} 
            className={likedPosts.has(post._id) ? 'liked' : ''}
          >
            {likedPosts.has(post._id) ? <AiFillLike /> : <AiOutlineLike />}
          </button>
          <buttontext><p>Like</p></buttontext>
          
        </div>
      </div>
    ))}
  </div>
</div>
       )}
     <div className={`viewpost ${viewPostVisible ? 'visible' : ''}`}>
  <div className={`postcreate ${viewPostVisible ? 'visible' : ''}`}>
    <div className='post_topbar'>
      <button type="submit" className='post_topbarbtn' onClick={closeViewPost}><RxCross2 /></button>
      <p>Create post</p>
    </div>
    <div className='post_useravatar'>
      {userData.profileImage ? (
        <div className='postuseravatarimg'>
          <img src={userData.profileImage} alt="Avatar" />
        </div>
      ) : (
        <FaCircleUser className="post_usericon" />
      )}
      <p>{userData.FirstName} {userData.LastName}</p>
    </div>

    <form onSubmit={handlePostSubmit}>
      <div className='textarea_container'>
        <textarea
          value={postText}
          onChange={handlePostTextChange}
          onClick={showViewPost}
          placeholder="What's on your mind?"
          className="post_textarea"
        ></textarea>
      </div>
      <div className='view_postcontainer'>
        {!postImage && !postVideo && (
          <div className='genratepost_buttonbox'>
            <FcAddImage
              className="photos-icon"
              onClick={() => {
                fileInputRef.current.click();
                showViewPost();
              }}
            />
            <input
              type="file"
              ref={fileInputRef}
              className="filepond"
              accept="image/png, image/jpeg, image/gif"
              style={{ display: 'none' }}
              onChange={e => {
                const file = e.target.files[0];
                if (file) {
                  setPostImage(file);
                }
              }}
            />
            <PiVideoFill
              className="postvideo_icon"
              onClick={() => {
                videoInputRef.current.click();
                showViewPost();
              }}
            />
            <input
              type="file"
              ref={videoInputRef}
              className="filepond"
              accept="video/mp4, video/webm, video/ogg"
              style={{ display: 'none' }}
              onChange={e => {
                const file = e.target.files[0];
                if (file) {
                  setPostVideo(file);
                }
              }}
            />
          </div>
        )}
        {postImage && (
          <div className="image-container">
            <img src={URL.createObjectURL(postImage)} alt="Selected" className="selected-image" />
          </div>
        )}
        {postVideo && (
          <div className="video-container">
            <video src={URL.createObjectURL(postVideo)} controls className="selected-video" />
          </div>
        )} 
      </div>
      <div className="Post_buttonbox">
        <button type="submit" className='post_createbtn'>Post</button>
      </div>
    </form>
  </div>
</div>

    </>
  );
}
 
export default Posts;
