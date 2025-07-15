import mongoose from "mongoose"

export const connectDB= async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Mongo_db connected: ${conn.connection.host}`);
    }
    catch(error){
        console.log('connection error',error);
    }
};