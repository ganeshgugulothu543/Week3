import React, { useState } from "react";
import axios from "axios";
import "./Adminpage.css"; // Ensure your CSS file is properly linked

const AdminPage = () => {
  const [songData, setSongData] = useState({
    title: "",
    artist: "",
    audio: null,
    image: null, // Add image to the state
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "audio" || name === "image") {
      setSongData({ ...songData, [name]: files[0] });
    } else {
      setSongData({ ...songData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("title", songData.title);
      formData.append("artist", songData.artist);
      formData.append("audio", songData.audio);
      formData.append("image", songData.image); // Append image to form data

      // Send the song data to your backend
      const res = await axios.post("http://localhost:5000/api/songs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(res.data.message || "Song added successfully!");
      setSongData({
        title: "",
        artist: "",
        audio: null,
        image: null, // Reset image in the state
      });
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="admin-container">
      <h2>Add New Song</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="title">Song Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={songData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="artist">Artist</label>
          <input
            type="text"
            id="artist"
            name="artist"
            value={songData.artist}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="audio">Audio File</label>
          <input
            type="file"
            id="audio"
            name="audio"
            accept="audio/*"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="image">Song Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn-add-song">
          Add Song
        </button>
      </form>
      <div className="message">{message && <p>{message}</p>}</div>
    </div>
  );
};

export default AdminPage;