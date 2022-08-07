const express = require('express');
const {
  addSong,
  getAllSongs,
  addPlaylist,
  getSinglePlaylist,
  updateSinglePlaylist,
  deleteSinglePlaylist,
  updateSingleSong,
} = require('../controllers/song');
const { protect, authorize } = require('../middlewares/auth');
const { uploadSong } = require('../middlewares/multer');
const {
  addSongValidators,
  songValidator,
} = require('../middlewares/songValidator');

const router = express.Router();

router.post(
  '/songs',
  protect,
  authorize('admin'),
  uploadSong.single('src'),
  addSongValidators,
  songValidator,
  addSong
);
router.get('/songs', protect, getAllSongs);
router.post('/songs/add-playlist', protect, addPlaylist);
router.get('/songs/playlists/:playlistId', protect, getSinglePlaylist);
router.put('/songs/playlists/:playlistId', protect, updateSinglePlaylist);
router.delete('/songs/playlists/:playlistId', protect, deleteSinglePlaylist);
router.put(
  '/songs/:songId',
  protect,
  authorize('admin'),
  uploadSong.single('src'),
  updateSingleSong
);

module.exports = router;
