const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  audio: { type: String, required: true },
  image: { type: String, required: true },
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;