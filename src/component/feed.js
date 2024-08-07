import React, { useEffect, useState, useRef } from 'react';
import "../css/feed.css";
import { FaCircleUser } from "react-icons/fa6";
import axios from 'axios';
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function Feed(props) {
  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [postVideo, setPostVideo] = useState(null);
  const [error, setError] = useState(null);
  const [viewPostVisible, setViewPostVisible] = useState(false);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [followedPosts, setFollowedPosts] = useState([]);

  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const userData = props.userData || {};

  useEffect(() => {
    fetchLikedPosts();
    fetchFollowedPosts();
  }, [userData]);

const fetchLikedPosts = async () => {
  const token = cookies.get('token');
  try {
    const response = await axios.get('https://wesocial-backend.onrender.com/api/auth/likedPosts', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log('Fetched liked posts:', response.data); // Log this to verify response

    // Check if response.data is an array and map IDs
    if (Array.isArray(response.data)) {
      setLikedPosts(new Set(response.data.map(post => post._id)));
    } else {
      console.error('Unexpected response format:', response.data);
    }
  } catch (error) {
    console.error('Error fetching liked posts:', error);
  }
};

  const fetchFollowedPosts = async () => {
    const token = cookies.get('token');
    const userId = userData.userId;

    try {
      const response = await axios.get('https://wesocial-backend.onrender.com/api/auth/followedPosts', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        params: {
          userId, // Sending userId as a query parameter
        },
      });
      console.log('Fetched followed posts:', response.data); // Log this
      setFollowedPosts(response.data);
    } catch (error) {
      console.error('Error fetching followed posts:', error);
    }
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
      <div className={`feed_overlay ${viewPostVisible ? 'feed_visible' : ''}`} onClick={() => setViewPostVisible(false)}></div>

      <div className="feed_maincontainer">
        <div className="feed">
          {followedPosts.map(post => (
            <div className="feed_feed_post" key={post._id}>
              <div className="feed_circle_profile_container">
                {post.user.profileImage ? (
                  <div className="feed_postusercircleimg">
                    <img src={post.user.profileImage} alt="Avatar" />
                  </div>
                ) : (
                  <FaCircleUser className=" " />
                )}
                <p>{post.user.FirstName} {post.user.LastName}</p>
              </div>
              <div className="feed_feed_posttextbox">
                <p>{post.postText}</p>
              </div>
              <div className="feed_mediacontainer">
                {post.postImage.length > 0 && post.postImage.map((image, index) => (
                  <img key={index} src={image} alt="Post" className="feed_media" />
                ))}
                {post.postVideo && (
                  <video src={post.postVideo} controls className="feed_media" />
                )}
              </div>
              <div className="feed_feed_postbuttonbox">
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
    </>
  );
}

export default Feed;
