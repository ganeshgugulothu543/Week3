// filepath: /d:/EY-GDS P3/bharath/ganesh/ganesh/frontend/src/pages/Album.js
import React, { useState, useRef, useEffect } from "react";
import "../album.css";
import Songs from "./Songs";

const Album = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [playingSong, setPlayingSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [currentTime, setCurrentTime] = useState(0); // Current time of the song
  const [duration, setDuration] = useState(0); // Duration of the song
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (playingSong) {
      const updateTime = () => setCurrentTime(playingSong.currentTime);

      // Attach event listeners for time update and metadata loaded
      playingSong.addEventListener("timeupdate", updateTime);
      playingSong.addEventListener("loadedmetadata", () => {
        setDuration(playingSong.duration);
      });

      // Cleanup on component unmount or song change
      return () => {
        playingSong.removeEventListener("timeupdate", updateTime);
      };
    }
  }, [playingSong]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    console.log("Search initiated for:", searchQuery);
  };

  const handleTextClick = () => {
    searchInputRef.current?.focus();
  };

  const handlePlayPause = () => {
    if (playingSong) {
      if (isPlaying) {
        playingSong.pause();
      } else {
        playingSong.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePrevious = () => {
    console.log("Previous song button clicked");
  };

  const handleNext = () => {
    console.log("Next song button clicked");
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);

    if (playingSong) {
      playingSong.volume = newVolume; // Update volume of the current playing song
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleProgressChange = (e) => {
    const newTime = e.target.value;
    if (playingSong) {
      playingSong.currentTime = newTime; // Update the current time of the song
      setCurrentTime(newTime); // Update the state
    }
  };

  return (
    <div className="album-container">
      <div className="tooltip-container">
        <img src="/images/s-name.png" alt="Logo" className="top-left-logo" />
        <span className="tooltip-text">Spotify</span>
      </div>
      <div className="side-container">
        <label className="icon-label">
          <img src="/images/home.jpg" alt="Home Icon" className="home-icon" />
          <span className="home-text">Home</span>
        </label>
        <label className="icon-label" onClick={handleTextClick}>
          <img src="/images/searc.png" alt="Search Icon" className="search-icon" />
          <span className="search-text">Search</span>
        </label>
      </div>
      <div className="side-box">
        <label className="box">
          <img src="/images/setting.jpg" alt="Set Icon" className="set-icon" />
          <span className="set-text">Settings</span>
          <span className="playlist-text">PLAYLIST</span>
        </label>
        <label className="box">
          <img src="/images/library.jpg" alt="lib Icon" className="lib-icon" />
          <span className="lib-text">Your Library</span>
        </label>
        <label className="box">
          <img src="/images/OIP.jpg" alt="like Icon" className="like-icon" />
          <span className="like-text">Your Favorite</span>
        </label>
        <label className="box">
          <img src="/images/play.jpg" alt="play Icon" className="play-icon" />
          <span className="play-text">Add playlist</span>
        </label>
        <label className="box">
          <img src="/images/profile.png" alt="profile Icon" className="profile-icon" />
          <span className="profile-text">Profile</span>
        </label>
      </div>
      <div className="search-bar-container">
        <input
          type="text"
          ref={searchInputRef}
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="What do you want to play?"
          className="search-input"
        />
        <img src="/images/search.png" alt="Search" className="search-image" onClick={handleSearchClick} />
      </div>
      <div className="songs-container">
        <Songs
          searchQuery={searchQuery}
          playingSong={playingSong}
          setPlayingSong={setPlayingSong}
          setIsPlaying={setIsPlaying}
          volume={volume}
          currentTime={currentTime} // Pass current time
          duration={duration} // Pass song duration
          handleProgressChange={handleProgressChange} // Pass handle progress change
        />
      </div>

      {/* Footer with song controls */}
      <div className="footer">
        <div className="song-controls">
          <button onClick={handlePrevious} className="previous-button">
            <img src="/images/previous.png" alt="Previous" />
          </button>
          <button onClick={handlePlayPause} className="pause-button">
            <img src={isPlaying ? "/images/pause.png" : "/images/playy.png"} alt={isPlaying ? "Pause" : "Play"} />
          </button>
          <button onClick={handleNext} className="next-button">
            <img src="/images/next.png" alt="Next" />
          </button>
          <div className="volume-control">
            <input
              id="volume-slider"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
          <div className="progress-container">
            <input
              type="range"
              min="0"
              max={duration}
              step="0.01"
              value={currentTime}
              onChange={handleProgressChange}
              className="progress-bar"
            />
            <div className="time-display">
              <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Album;