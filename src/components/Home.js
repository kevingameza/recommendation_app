import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import '../App.css';

function Home() {
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const userId = localStorage.getItem('userId'); // Get user ID from local storage

  useEffect(() => {
    if (userId) { 
      const fetchRecommendations = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/user/${userId}/recomendations/`);
          if (!response.ok) {
            throw new Error('Failed to fetch recommendations');
          }
          const recommendations = await response.json();
          // Fetch additional information for each song
          const songsWithDetails = await Promise.all(recommendations.map(async (recomendation) => {
            const songResponse = await fetch(`http://127.0.0.1:8000/songs/${recomendation.item_id}`);
            if (!songResponse.ok) {
              throw new Error('Failed to fetch song details');
            }
            const songDetails = await songResponse.json();
            return { ...recomendation, ...songDetails }; // Combine the recommendation and detailed information
          }));
          setRecommendedSongs(songsWithDetails); // Aquí es donde deberíamos usar la variable correcta
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
          <Link to={`/songs/${song.item_id}`} key={song.item_id} className="song-card">
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
