import React from "react";
import "../Playlist.css";

const Playlist = () => {
  return (
    <div className="side-box">
      <label className="box">
        <img
          src="/images/setting.jpg" // Replace with the path to your image
          alt="Set Icon"
          className="set-icon"
        />
        <span className="set-text">Settings</span>
        <span className="playlist-text">PLAYLIST</span>
      </label>
      <label className="box">
        <img
          src="/images/library.jpg" // Replace with the path to your image
          alt="Library Icon"
          className="lib-icon"
        />
        <span className="lib-text">Your Library</span>
      </label>
      <label className="box">
        <img
          src="/images/play.jpg" // Replace with the path to your image
          alt="Play Icon"
          className="play-icon"
        />
        <span className="play-text">Add playlist</span>
      </label>
      <label className="box">
        <img
          src="/images/profile.png" // Replace with the path to your image
          alt="Profile Icon"
          className="profile-icon"
        />
        <span className="profile-text">Profile</span>
      </label>
    </div>
  );
};

export default Playlist;
