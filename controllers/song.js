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

exports.getAllSongs = asyncHandler(async (req, res, next) => {
  const songs = await Song.find();
  res.status(200).json({
    success: true,
    count: songs.length,
    songs,
  });
});
