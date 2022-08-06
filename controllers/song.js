const User = require('../models/user');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');
const { validationResult } = require('express-validator');
const Song = require('../models/song');

exports.addSong = asyncHandler(async (req, res, next) => {
  const {
    body: { title, artist, src, album, year, duration },
  } = req;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const song = await Song.create({
    title,
    artist,
    src,
    album,
    year,
    duration,
  });

  res.status(201).json({
    success: true,
    song,
  });
});

exports.addPlaylist = asyncHandler(async (req, res, next) => {
  const {
    body: { payload },
    user: { _id },
  } = req;

  console.log(payload);

  let existUser = await User.findById(_id)
    .populate('playlists.songs')
    .select('-password');

  if (!existUser) {
    return next(new ErrorResponse('User not found', 404));
  }

  const existPlaylist = existUser.playlists.find(
    (playlist) => playlist.name === payload.name
  );

  if (existPlaylist) {
    return next(new ErrorResponse('Playlist already exist', 400));
  }

  existUser.playlists.push({
    name: payload.name,
    songs: payload.songs,
  });

  await existUser.save();

  // repopulate playlists.songs to get the newly added song
  const updatedUser = await User.findById(_id)
    .populate('playlists.songs')
    .select('-password');

  res.status(201).json({
    success: true,
    user: updatedUser,
  });
});

exports.updateSinglePlaylist = asyncHandler(async (req, res, next) => {
  const {
    params: { playlistId },
    body: { payload },
    user: { _id },
  } = req;

  let existUser = await User.findById(_id)
    .populate('playlists.songs')
    .select('-password');

  if (!existUser) {
    return next(new ErrorResponse('User not found', 404));
  }

  const existPlaylist = existUser.playlists?.find(
    (playlist) => playlist._id.toString() === playlistId.toString()
  );

  if (!existPlaylist) {
    return next(new ErrorResponse('Playlist not found', 404));
  }

  existPlaylist.name = payload.name ? payload.name : existPlaylist.name;
  existPlaylist.songs = payload.songs ? payload.songs : existPlaylist.songs;

  await existUser.save();

  // repopulate playlists.songs to get the newly added song
  const updatedUser = await User.findById(_id)
    .populate('playlists.songs')
    .select('-password');

  res.status(201).json({
    success: true,
    user: updatedUser,
  });
});

exports.getAllSongs = asyncHandler(async (req, res, next) => {
  const songs = await Song.find();
  res.status(200).json({
    success: true,
    count: songs.length,
    songs,
  });
});

exports.getSinglePlaylist = asyncHandler(async (req, res, next) => {
  const {
    params: { playlistId },
    user: { _id },
  } = req;

  const existUser = await User.findById(_id).populate('playlists.songs');

  if (!existUser) {
    return next(new ErrorResponse('User not found', 404));
  }

  const existPlaylist = existUser.playlists?.find(
    (playlist) => playlist._id.toString() === playlistId.toString()
  );

  if (!existPlaylist) {
    return next(new ErrorResponse('Playlist not found', 404));
  }

  res.status(200).json({
    playlist: existPlaylist,
  });
});

exports.deleteSinglePlaylist = asyncHandler(async (req, res, next) => {
  const {
    params: { playlistId },
    user: { _id },
  } = req;

  const existUser = await User.findById(_id).populate('playlists.songs');

  if (!existUser) {
    return next(new ErrorResponse('User not found', 404));
  }

  const idx = existUser.playlists?.findIndex(
    (playlist) => playlist._id.toString() === playlistId.toString()
  );

  if (idx === -1) {
    return next(new ErrorResponse('Playlist not found', 404));
  }

  existUser.playlists?.splice(idx, 1);

  await existUser.save();

  const updatedUser = await User.findById(_id).populate('playlists.songs');

  res.status(200).json({
    success: true,
    user: updatedUser,
  });
});
