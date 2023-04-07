const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: "455873487664113",
  api_secret: process.env.API_SECRET
 
});
// console.log('first', cloudinary)

// const cloudinaryUpload = async (fileToUpload) => {
//   return new Promise((resolve) => {
//     cloudinary.uploader.upload(fileToUpload, { resource_type: "auto" }, (error, result) => {
//       if (error) {
//         console.error(error);
//         return resolve({ error: "Error uploading file to Cloudinary" });
//       }
//       resolve({ url: result.secure_url });
//     });
//   });
// };
const cloudinaryUpload = async (fileToUpload) => {
    try {
      const result = await cloudinary.v2.uploader.upload(fileToUpload, {
        resource_type: "auto",
      });
      return { url: result.secure_url };
    } catch (error) {
      console.error(error);
      throw new Error("Could not upload file to Cloudinary");
    }
  };
  const cloudinaryDeleteImg = async (fileToDelete) => {
    return new Promise((resolve) => {
      cloudinary.uploader.destroy(fileToDelete, (result) => {
        resolve(
          {
            url: result.secure_url,
            asset_id: result.asset_id,
            public_id: result.public_id,
          },
          {
            resource_type: "auto",
          }
        );
      });
    });
  };
  
  

module.exports = {cloudinaryUpload,cloudinaryDeleteImg};
