import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'; // Import specific icons

import "./Detail.css"; // Import your styling
import "../App.css";

// Replace with your actual data fetching logic (based on song ID)
function getSongDetails(songId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: songId,
        title: "Song Title",
        artist: "Artist Name",
        album: "Album Name",
        image: "https://example.com/image.jpg",
        // Add other song details as needed
        rating: null, // Add a rating property to the song data
      });
    }, 1000); // Simulate data fetching delay
  });
}

function Detail(props) {
  const [song, setSong] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null); // Track selected rating

  useEffect(() => {
    const songId = props.id;
    getSongDetails(songId).then((data) => setSong(data));
  }, [props]);

  const handleRateSong = (rating) => {
    setSelectedRating(rating===selectedRating?null:rating);

    // Simulate sending rating to backend (replace with your actual API call)
    console.log(`Sending rating: ${rating} for song: ${song.id}`);
  };

  if (!song) {
    return <div className="detail-view">Loading...</div>;
  }

  return (
    <div className="detail-view">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Lastfm_logo.svg/2560px-Lastfm_logo.svg.png"
        alt="Last.fm Logo"
        className="logo"
      />
      <div className="info-container">
        <h1>{song.title}</h1>
        <h3>{song.artist}</h3>
        <p>Album: {song.album}</p>
        {/* Add additional song details here */}

        {/* Rating Widget */}
        <div className="rating-widget">
          <button
            type="button"
            className={`thumbs-up ${
              selectedRating === "thumbsUp" ? "selected" : ""
            }`}
            onClick={() => handleRateSong("thumbsUp")}
          >
            <i className="fas fa-thumbs-up"><FontAwesomeIcon icon={faThumbsUp} /></i>
          </button>
          <button
            type="button"
            className={`thumbs-down ${
              selectedRating === "thumbsDown" ? "selected" : ""
            }`}
            onClick={() => handleRateSong("thumbsDown")}
          >
            <i className="fas fa-thumbs-down"><FontAwesomeIcon icon={faThumbsDown} /> </i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
