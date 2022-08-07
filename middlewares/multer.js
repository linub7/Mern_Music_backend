const multer = require('multer');
const storage = multer.diskStorage({});

const songFileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('audio')) {
    return cb(new Error('File type not supported'), false);
  }
  cb(null, true);
};

exports.uploadSong = multer({
  storage,
  fileFilter: songFileFilter,
  //   limits: {
  //     fileSize: 1024 * 1024 * 2,
  //   },
});
