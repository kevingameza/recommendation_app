// Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import '../App.css';

function Register() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); 
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('tests')

    // Simulate registration logic (replace with actual API calls or backend logic)
    try {
      // Perform registration actions (e.g., send data to a server)
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
      
      // Upon success, navigate to /preferences
      navigate('/preferences');
    } catch (error) {
      // Handle registration errors
      console.error('Registration error:', error);
      // Display an error message to the user
    }
  };

  return (
    <div className="register-container">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Lastfm_logo.svg/2560px-Lastfm_logo.svg.png" alt="Last.fm Logo" className="logo" />
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="user"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?{' '}
        <Link to="/login" className="register-link">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;
