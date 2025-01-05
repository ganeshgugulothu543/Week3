const Song = require('../models/Song'); // Ensure the Song model exists and is correctly imported

// Add a new song
const addSong = async (req, res) => {
  try {
    const { title, artist } = req.body;
    const audio = req.files.audio[0].path;
    const image = req.files.image[0].path;

    const newSong = new Song({
      title,
      artist,
      audio,
      image,
    });

    await newSong.save();
    res.status(201).json({ message: 'Song added successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
};

// Get all songs
const getSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
};

module.exports = { addSong, getSongs };