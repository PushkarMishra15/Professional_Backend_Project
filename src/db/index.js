import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connnectDB = async()=>{

     try{

       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
       console.log("MongoDb Connected !! ");
       console.log(connectionInstance.connection.host);

     }catch(err){
        console.log("MONGODB Connection error", err);
        process.exit(1)
     }

}

export default connnectDB