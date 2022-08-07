const cloudinary = require('../cloud');

exports.uploadSongToCloudinary = async (filePath) => {
  const { secure_url: url, public_id } = await cloudinary.uploader.upload(
    filePath,
    {
      folder: 'linuxx/songs',
      resource_type: 'raw',
      use_filename: true,
      unique_filename: false,
    }
  );
  return { url, public_id };
};

exports.destroySongFromCloudinary = async (public_id) => {
  const { result } = await cloudinary.uploader.destroy(public_id);
  console.log(result);

  return result;
};
