// require('dotenv').config();

import dotenv from "dotenv"

// import mongoose, { connect } from "mongoose";
// import { DB_NAME } from "./constants";
import connnectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: './env'
})

connnectDB()
.then(()=>{
  app.listen(process.env.PORT || 8000, ()=>{
    console.log(`Server is running at port ${process.env.PORT}`);
  });

})
.catch((err)=>{
  console.log("MONGO db connection fialed !!! ", err);
})

// import express from "express";
// const app = express();

// ( async ()=>{

//     try {
        
//       await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//       app.on("erroe", (err)=>{
//         console.log("Error : ", err);
//         throw err;
//       })

//       app.listen(process.env.PORT, ()=>{
//         console.log(`App is listening on port ${process.env.PORT}`);
//       })

//     }catch(error){

//         console.log("ERROR : ", error);
//         throw error;
//     }
// })()