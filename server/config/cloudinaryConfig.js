import { config, uploader } from "cloudinary";

const cloudinaryConfig = (req, res, next) => {
  console.log("WHATS UP");
  config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  next();
};
export { cloudinaryConfig, uploader };
