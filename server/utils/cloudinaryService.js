const cloudinary = require("../config/cloudinary.js");

const uploadToCloudinary = (fileBuffer, folder = "uploads") => {
  return new Promise((res, rej) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (err, result) => {
        if (err) return rej(err);
        res(result);
      },
    );

    uploadStream.end(fileBuffer);
  });
};

module.exports = {
  uploadToCloudinary,
};
