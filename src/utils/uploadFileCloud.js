const cloudinary = require("cloudinary");

cloudinary.config({ 
  cloud_name: 'dsbvqrhhk', 
  api_key: '147731471822864', 
  api_secret: 'I8ywJkvXO3-qmuARLi_8fYe6Pig' 
});

const uploadToCloudinary = async (file, folder, imagePublicId) => {
  return await cloudinary.uploader.upload(file, {
    folder: folder,
  });
};

module.exports = { uploadToCloudinary };
