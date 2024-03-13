import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import '../App.css';

function Home() {

  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const userId = localStorage.getItem('userId'); // Get user ID from local storage

  useEffect(() => {
    // Fetch recommendations only if userId exists
    if (userId) {
      const fetchRecommendations = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/user/${userId}/recommendations/`);
          if (!response.ok) {
            throw new Error('Failed to fetch recommendations');
          }
          const data = await response.json();
          setRecommendedSongs(data);
        } catch (error) {
          console.error('Error fetching recommendations:', error);
          // Handle errors (display an error message to the user)
        }
      };

      fetchRecommendations();
    }
  }, [userId]); // Re-run useEffect when userId changes


  return (
    <div className="home-view">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Lastfm_logo.svg/2560px-Lastfm_logo.svg.png" alt="Last.fm Logo" className="logo" />
      <h1>Recommended Songs</h1>
      <div className="song-grid">
        {recommendedSongs.map((song) => (
          <Link to={`/songs/${song.id}`} key={song.id} className="song-card">
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
