import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom"; // Importar useParams

import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons"; // Import specific icons

import "./Detail.css"; // Import your styling
import "../App.css";

function Detail(props) {
  const [song, setSong] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null); // Track selected rating
  const { songId } = useParams();

  const userId = localStorage.getItem("userId"); // Get user ID from local storage

  useEffect(() => {
    if (userId) {
      const fetchRecommendations = async () => {
        try {
          const response = await fetch(
            `http://127.0.0.1:8000/recomendations/${songId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch recommendations");
          }
          const recommendation = await response.json();
          const songResponse = await fetch(
            `http://127.0.0.1:8000/songs/${recommendation.item_id}`
          );
          if (!songResponse.ok) {
            throw new Error("Failed to fetch song details");
          }
          const songDetails = await songResponse.json();
          const songsWithDetails = {
            ...recommendation,
            title: songDetails.title,
          };
          setSong(songsWithDetails); // Aquí es donde deberíamos usar la variable correcta
        } catch (error) {
          console.error("Error fetching recommendations:", error);
          // Handle errors (display an error message to the user)
        }
      };

      fetchRecommendations();
    }
  }, [userId, songId]); // Re-run useEffect when userId changes

  const handleRateSong = async (rating) => {
    setSelectedRating(rating === selectedRating ? null : rating); // Toggle rating

    if (!song || !song.id) {
      console.error("Missing song data or ID to update recommendation status.");
      return; // Prevent sending request without song information
    }

    if (rating === null) {
      console.error("Missing rating.");
      return; // Prevent sending request without rating information
    }

    const response = await fetch(`http://127.0.0.1:8000/recommendations/${song.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: rating === "thumbsDown" ? "negative" : "positive",
      }), // Send the updated status
    });

    if (!response.ok) {
      console.error(
        `Error updating recommendation status for song ${song.id}:`,
        await response.text()
      );
    } else {
      console.log(`Recommendation status updated for song ${song.id}`);
      // Optionally, update the song state locally if successful
      // setSong({ ...song, status: rating }); // Update song status in state
    }
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
        <h3>Escuchas esperadas: {song.pred}</h3>

        {/* Rating Widget */}
        <div className="rating-widget">
          <button
            type="button"
            className={`thumbs-up ${
              selectedRating === "thumbsUp" ? "selected" : ""
            }`}
            onClick={() => handleRateSong("thumbsUp")}
          >
            <i className="fas fa-thumbs-up">
              <FontAwesomeIcon icon={faThumbsUp} />
            </i>
          </button>
          <button
            type="button"
            className={`thumbs-down ${
              selectedRating === "thumbsDown" ? "selected" : ""
            }`}
            onClick={() => handleRateSong("thumbsDown")}
          >
            <i className="fas fa-thumbs-down">
              <FontAwesomeIcon icon={faThumbsDown} />{" "}
            </i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
