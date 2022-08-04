// const crypto = require('crypto');
const mongoose = require('mongoose');

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    artist: {
      type: String,
      required: true,
    },
    album: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Song', songSchema);

// https://res.cloudinary.com/sathya195/raw/upload/v1657472466/sheygram_udemy/New_York_Nagaram_iwkytp.mp3
