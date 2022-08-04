const express = require('express');
const { addSong, getAllSongs } = require('../controllers/song');
const { protect } = require('../middlewares/auth');
const {
  addSongValidators,
  songValidator,
} = require('../middlewares/songValidator');

const router = express.Router();

router.post('/songs', protect, addSongValidators, songValidator, addSong);
router.get('/songs', protect, getAllSongs);

module.exports = router;
