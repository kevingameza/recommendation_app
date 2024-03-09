import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';
import '../App.css';

function Landing() {
  return (
    <div className="landing-page">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Lastfm_logo.svg/2560px-Lastfm_logo.svg.png" alt="Last.fm Logo" className="logo" />
      <h1>Welcome to recommendations app</h1>
      <p>Discover new music and connect with other music lovers!</p>
      <div className="buttons">
        <Link to="/login" className="btn">Login</Link>
        <Link to="/register" className="btn">Register</Link>
      </div>
    </div>
  );
}


export default Landing;
