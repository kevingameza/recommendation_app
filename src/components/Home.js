import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import '../App.css';

// Replace this with your actual data fetching logic
const recommendedSongs = [
  { id: 1, title: 'Song 1', artist: 'Artist 1', image: 'https://example.com/image1.jpg' },
  { id: 2, title: 'Song 2', artist: 'Artist 2', image: 'https://example.com/image2.jpg' },
  { id: 3, title: 'Song 3', artist: 'Artist 3', image: 'https://example.com/image3.jpg' },
  // ... more songs
];

function Home() {
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
