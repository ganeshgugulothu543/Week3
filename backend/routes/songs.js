const express = require('express');
const { addSong, getSongs } = require('../controllers/songsController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/songs', upload.fields([{ name: 'audio' }, { name: 'image' }]), addSong);
router.get('/songs', getSongs);

module.exports = router;