import { v2 as cloudinary} from "cloudinary";
import { response } from "express";
import fs from "fs"
import { type } from "os";
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: CLOUDINARY_API_SECRET
});

const uploadOnCloudnary = async(localFilePAth)=>{
    
     try{
          
        if(!localFilePAth)
        return null;

        // upload the file on cloudinary 

       const response =   await cloudinary.uploader.upload(localFilePAth,{
            resource_type : "auto"
        })

        // file has been uploaded successfully
        console.log("file is uploaded on cloudinary", response.url);
        return response;
     }catch(error){
          fs.unlinkSync(localFilePAth)  // remove the locally saved temporary file as the upload operation got failed
          return null;
     }

}


cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });

  export {uploadOnCloudnary}