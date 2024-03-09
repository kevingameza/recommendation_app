import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import your styling
import './Preferences.css';
import '../App.css';

// Replace this with your actual data fetching logic
const recommendedSongs = [
  { id: 1, title: 'Song 1', artist: 'Artist 1', image: 'https://example.com/image1.jpg' },
  { id: 2, title: 'Song 2', artist: 'Artist 2', image: 'https://example.com/image2.jpg' },
  { id: 3, title: 'Song 3', artist: 'Artist 3', image: 'https://example.com/image3.jpg' },
  // ... more songs
];

function Preferences() {
  const [selectedSongs, setSelectedSongs] = useState([]);
  const navigate = useNavigate(); 
  const handleSelectSong = (songId) => {
    const isSelected = selectedSongs.some((selectedSong) => selectedSong === songId);
    setSelectedSongs(isSelected ? selectedSongs.filter((selectedSong) => selectedSong !== songId) : [...selectedSongs, songId]);
  };

  const handleSendPreferences = () => {
    // Replace this with your actual logic to send preferences to the backend
    console.log('Sending preferences to backend:', selectedSongs);
    navigate('/home');
  };

  return (
    <div className="home-view">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Lastfm_logo.svg/2560px-Lastfm_logo.svg.png" alt="Last.fm Logo" className="logo" />
      <h1>Select Your Preferences</h1>
      <div className="song-grid">
        {recommendedSongs.map((song) => (
          <div key={song.id} className={`${selectedSongs.includes(song.id) ? 'song-card-selected' : 'song-card'}`} onClick={() => handleSelectSong(song.id)}>
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
          </div>
        ))}
      </div>
      <button onClick={handleSendPreferences} disabled={selectedSongs.length === 0} className="btn">
        Save Preferences
      </button>
    </div>
  );
}

export default Preferences;
