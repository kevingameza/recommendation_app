// Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import '../App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    // e.preventDefault();
    // Add authentication logic here
  };

  return (
    <div className="login-container">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Lastfm_logo.svg/2560px-Lastfm_logo.svg.png" alt="Last.fm Logo" className="logo" />
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="user"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn">Login</button>
      </form>
      <p>
        Don't have an account?{' '}
        <Link to="/register" className="login-link">
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login;
