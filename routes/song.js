const express = require('express');
const {
  addSong,
  getAllSongs,
  addPlaylist,
  getSinglePlaylist,
  updateSinglePlaylist,
  deleteSinglePlaylist,
} = require('../controllers/song');
const { protect } = require('../middlewares/auth');
const {
  addSongValidators,
  songValidator,
} = require('../middlewares/songValidator');

const router = express.Router();

router.post('/songs', protect, addSongValidators, songValidator, addSong);
router.get('/songs', protect, getAllSongs);
router.post('/songs/add-playlist', protect, addPlaylist);
router.get('/songs/playlists/:playlistId', protect, getSinglePlaylist);
router.put('/songs/playlists/:playlistId', protect, updateSinglePlaylist);
router.delete('/songs/playlists/:playlistId', protect, deleteSinglePlaylist);

module.exports = router;
