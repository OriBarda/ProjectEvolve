const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");
dotenv.config({ path: "../.env" });

cloudinary.config({
  cloudName: process.env.CLOUDNAME,
  apiKey: process.env.CLOUDAPIKEY,
  apiSecret: process.env.CLOUDINARYSECRET,
});

const folderPath = path.join(__dirname, "../../frontEnd/src/assets");

console.log("Folder Path:", folderPath);

files.forEach((file) => {
  const filePath = path.join(folderPath, file);
  console.log("Uploading:", filePath);

  cloudinary.uploader.upload(filePath, function (error, result) {
    if (error) {
      console.error("Error uploading", file, error);
    } else {
      console.log("Uploaded", file, result);
    }
  });
});
