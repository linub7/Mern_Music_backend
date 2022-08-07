const { check, validationResult } = require('express-validator');
exports.addSongValidators = [
  check('title').trim().not().isEmpty().withMessage('Please Provide a name'),
  check('artist')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please Provide an artist'),
  check('album').trim().not().isEmpty().withMessage('Please Provide an album'),
  check('year').trim().not().isEmpty().withMessage('Please Provide a year'),
  check('duration')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please Provide a duration'),
];

exports.songValidator = (req, res, next) => {
  const error = validationResult(req).array();
  if (error.length) {
    return res.status(400).json({
      error: error.map((error) => error.msg),
    });
  }
  next();
};
