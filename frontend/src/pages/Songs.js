import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Songs.css"; // Assuming you will create a CSS file for styles

const Songs = ({ searchQuery, playingSong, setPlayingSong, setIsPlaying }) => {
  const [songsData, setSongsData] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/songs");
        setSongsData(res.data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, []);

  const handlePlaySong = (audioUrl) => {
    if (playingSong) {
      playingSong.pause();
      playingSong.currentTime = 0;
    }
    const audio = new Audio(audioUrl);
    audio.play();
    setPlayingSong(audio);
    setIsPlaying(true);
  };

  const handleOpenAlbum = (album) => {
    setSelectedAlbum(album);
  };

  const handleCloseAlbum = () => {
    setSelectedAlbum(null);
  };

  const filteredSongs = songsData.filter((song) =>
    song.title.toLowerCase().includes(searchQuery?.toLowerCase() || "")
  );

  return (
    <div className="Songs-container">
      {selectedAlbum ? (
        <div className="telugu-container">
          <button className="close-button" onClick={handleCloseAlbum}>
            &times;
          </button>
          <div className="alb-header">
            <img
              src={`http://localhost:5000/${selectedAlbum.image}`}
              alt={`${selectedAlbum.title} cover`}
              className="alb-cover"
            />
            <h2 className="alb-title">{selectedAlbum.title}</h2>
          </div>
          <div className="telugu-songs">
            {selectedAlbum.songs?.map((song, index) => (
              <div key={index} className="telugu-song" onClick={() => handlePlaySong(`http://localhost:5000/${song.audio}`)}>
                <p>{song.title}</p>
                <button
                  onClick={() => handlePlaySong(`http://localhost:5000/${song.audio}`)}
                  className="play-button"
                >
                  <img
                    src="images/button.png"
                    alt="Play"
                    className="playing-icon"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="row">
            <h2 className="row-heading">Popular Songs</h2>
            {filteredSongs.slice(0, 5).map((song) => (
              <div key={song._id} className="song-card">
                <div
                  className="image-container"
                  onClick={() => handleOpenAlbum(song)}
                >
                  <img
                    src={`http://localhost:5000/${song.image}`}
                    alt={`${song.title} cover`}
                    className="song-cover"
                  />
                  <img
                    src="images/button.png"
                    alt="Overlay"
                    className="overlay-image"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent parent `onClick` from triggering
                      handlePlaySong(`http://localhost:5000/${song.audio}`);
                    }}
                  />
                </div>
                <div className="song-details">
                  <h3 className="song-title">{song.title}</h3>
                  <p className="song-artist">{song.artist}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="row">
            <h2 className="row-heading">Popular Songs</h2>
            {filteredSongs.slice(5).map((song) => (
              <div key={song._id} className="song-card">
                <div
                  className="image-container"
                  onClick={() => handleOpenAlbum(song)}
                >
                  <img
                    src={`http://localhost:5000/${song.image}`}
                    alt={`${song.title} cover`}
                    className="song-cover"
                  />
                  <img
                    src="images/button.png"
                    alt="Overlay"
                    className="overlay-image"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent parent `onClick` from triggering
                      handlePlaySong(`http://localhost:5000/${song.audio}`);
                    }}
                  />
                </div>
                <div className="song-details">
                  <h3 className="song-title">{song.title}</h3>
                  <p className="song-artist">{song.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Songs;