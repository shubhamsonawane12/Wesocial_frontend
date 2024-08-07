import React, { useEffect ,useState, useRef } from 'react';
import "../css/searchpro_post.css";
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

function Searchpro_Posts(props) {
  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [postVideo, setPostVideo] = useState(null);
  const [error, setError] = useState(null);
  const [viewPostVisible, setViewPostVisible] = useState(false);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const userData = props.userData;




useEffect(() => {

 const printconsol=()=>{
  console.log('Searched Data from post: ', userData);


 }
 printconsol()

})







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
    

       {userData.posts.length > 0 ? (
         
         
 <div className="searchpro_user_feed_maincontainer">

                           
                      
 
 <div className="searchpro_user_Postgalary">
  
   <div className="searchpro_posts_Maincontainer">
        <div className="searchpro_intro_container">
          <div className='searchpro_intro_textcontainer'>
            <h5>Intro</h5>
            <p><FaHome /> Lives in New York, US</p>
            <p><MdOutlineRssFeed /> Followed by 500</p>
            <p><IoIosHeart /> Single</p>
          </div>
        </div>

      
      </div>
 
 
<div className='searchpro_galary_maincontainer'>
  <div className='searchpro_galarytitle'><p>Photos</p></div>
  <div className='searchpro_photos_maincontainer'>
    {userData.posts.filter(post => post.postImage.length > 0).map((post, index) => (
      post.postImage.map((image, imgIndex) => (
        <div key={`${index}-${imgIndex}`} className="searchpro_imagecontainer">
          <img src={image} alt={`Post ${index}`} />
        </div>
      ))
    ))}
  </div>
</div>
<div className='searchpro_Friends_maincontainer' >

  <div className='searchpro_friends_containertext'><p>Friends</p></div>
</div>


  </div> 

   
    
  <div className="searchpro_user_feed">
    {userData.posts.map(post => ( 
      <div className="searchpro_feed_post" key={post._id}>
        <div className="searchpro_circle_profile_container">
          {userData.profileImage ? (
            <div className="searchpro_postusercircleimg">
              <img src={userData.profileImage} alt="Avatar" />
            </div>
          ) : (
            <FaCircleUser className=" " />
          )}
          <p>{userData.FirstName} {userData.LastName}</p>
        </div>
        <div className="searchpro_feed_posttextbox">
          <p>{post.postText}</p>
        </div>
        <div className="searchpro_Post_mediacontainer">
          {post.postImage.length > 0 && post.postImage.map((image, index) => (
            <img key={index} src={image} alt="Post" className="searchpro_post_media" />
          ))}
          {post.postVideo && (
            <video src={post.postVideo} controls className="searchpro_post_media" />
          )}
        </div>
        <div className="searchpro_feed_postbuttonbox">
          <button 
            onClick={() => handleLikeButtonClick(post._id)} 
            className={likedPosts.has(post._id) ? 'liked' : ''}
          >
            {likedPosts.has(post._id) ? <AiFillLike /> : <AiOutlineLike />}
          </button>
          <searchpro_buttontext><p>Like</p></searchpro_buttontext>
          
        </div>
      </div>
    ))}
  </div>
</div>
   ) : (
                    <p>No posts available.</p>
                )}
         
  
     <div className={`viewpost ${viewPostVisible ? 'visible' : ''}`}>
  <div className={`postcreate ${viewPostVisible ? 'visible' : ''}`}>
    <div className='searchpro_post_topbar'>
      <button type="submit" className='searchpro_post_topbarbtn' onClick={closeViewPost}><RxCross2 /></button>
      <p>Create post</p>
    </div>
    <div className='searchpro_post_useravatar'>
      {userData.profileImage ? (
        <div className='searchpro_postuseravatarimg'>
          <img src={userData.profileImage} alt="Avatar" />
        </div>
      ) : (
        <FaCircleUser className="searchpro_post_usericon" />
      )}
      <p>{userData.FirstName} {userData.LastName}</p>
    </div>

    <form onSubmit={handlePostSubmit}>
      <div className='searchpro_textarea_container'>
        <textarea
          value={postText}
          onChange={handlePostTextChange}
          onClick={showViewPost}
          placeholder="What's on your mind?"
          className="searchpro_post_textarea"
        ></textarea>
      </div>
      <div className='searchpro_view_postcontainer'>
        {!postImage && !postVideo && (
          <div className='searchpro_genratepost_buttonbox'>
            <FcAddImage
              className="searchpro_photos-icon"
              onClick={() => {
                fileInputRef.current.click();
                showViewPost();
              }}
            />
            <input
              type="file"
              ref={fileInputRef}
              className="searchpro_filepond"
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
              className="searchpro_postvideo_icon"
              onClick={() => {
                videoInputRef.current.click();
                showViewPost();
              }}
            />
            <input
              type="file"
              ref={videoInputRef}
              className="searchpro_filepond"
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
          <div className="searchpro_image-container">
            <img src={URL.createObjectURL(postImage)} alt="Selected" className="searchpro_selected-image" />
          </div>
        )}
        {postVideo && (
          <div className="searchpro_video-container">
            <video src={URL.createObjectURL(postVideo)} controls className="searchpro_selected-video" />
          </div>
        )} 
      </div>
      <div className="searchpro_Post_buttonbox">
        <button type="submit" className='searchpro_post_createbtn'>Post</button>
      </div>
    </form>
  </div>
</div>

    </>
  );
}
 
export default Searchpro_Posts;
 