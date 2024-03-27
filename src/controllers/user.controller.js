import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res)=>{

      // get user details from frontend
      // validation 
      // check if user alredy exists : username , email
      // check for images , check for avatar
      // upload to cloudinary, avatar
      //create user object - create entru in db
      // remove password and refresh token field from response
      // check for user creation 
      // return res

     // get user details from frontend //

     const {fullname, email, username , password} = req.body
     console.log("email",  email);

     if( 
      [fullname, email, username, password].some((field)=> 
      field?.trim() === "")
     ){
        throw new ApiError(400, "All fields are required");
     }

    const existedUser = await User.findOne({
         $or: [{username}, {email}]
     })

     if(existedUser){
      throw new ApiError(409,"User with email or username alredy exists" )
     }
      
     const avatartLocalPath = req.files?.avatar[0]?.path;
     const coverImageLocalPath = req.files?.coverImage[0]?.path;

     if(!avatartLocalPath){
      throw new ApiError(400, "Avatar file is required ")
     }

     const avatar = await uploadOnCloudinary(avatartLocalPath);
     const coverImage = await uploadOnCloudinary(coverImageLocalPath);

     if(!avatar){
      throw new ApiError(40, "Avatar file is required")
     }
     
     const user = await User.create({
      fullname,
      avatar : avatar.url,
      coverImage : coverImage?.url || "",
      email,
      password,
      username
     })
    
      const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
      )

      if(!createdUser){
            throw new ApiError(500, "Somehting went wrong while registering the user" );
      }

      return res.status(201).json(
            new ApiResponse(200, createdUser, "User registered Successfully")
      )
})

export {registerUser}

