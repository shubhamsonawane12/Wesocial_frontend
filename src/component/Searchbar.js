import React, { useState } from 'react';
import axios from 'axios';
import '../css/searchbar.css';
import { HiOutlineSearch } from "react-icons/hi";
import { FaCircleUser } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

function SearchBar() {
    const [searchText, setSearchText] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    const fetchSuggestions = async () => {
        if (searchText.length > 0) {
            try {
                const response = await axios.get('https://wesocial-backend.onrender.com/api/auth/search', { params: { q: searchText } });
                setSuggestions(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            fetchSuggestions();
        }
    };

    const handleIconClick = () => {
        fetchSuggestions();
    };

    const handleSuggestionClick = (_id) => {
        setSuggestions([]); // Clear suggestions to close the suggestions container
        navigate(`/searchProfile/${_id}`); // Redirect to the search profile page
    };

    return (
        <div className="container">
            <div className="searchInputWrapper">
                <input
                    className="searchInput"
                    type="text"
                    placeholder="Type here to search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <i className="searchInputIcon" onClick={handleIconClick}>
                    <div className='searchicon'><HiOutlineSearch /></div>
                </i>
            </div>
            {suggestions.length > 0 && (
                <ul className={`suggestionsList ${suggestions.length > 0 ? 'show' : ''}`}>
                    {suggestions.map((user, index) => (
                        <li key={index} className="suggestionItem" onClick={() => handleSuggestionClick(user._id)}>
                            <div className='user_container'>
                                {user.profileImage ? (
                                    <div className="searchbar_usercircleimg">
                                        <img src={user.profileImage} alt="Avatar" />
                                    </div>
                                ) : (
                                    <div className="searchbar_maincontainerusericon"><FaCircleUser className='searchbar_usericon' /></div>
                                )}
                                <div className='searchbar_textcontainer'>
                                    <p>{user.Firstname} {user.Lastname}</p>
                                    {user.Username}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchBar;
