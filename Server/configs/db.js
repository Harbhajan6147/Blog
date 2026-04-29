import mongoose from "mongoose";


const connectDB= async ()=>{
    const dbOptions = {
        dbName: "Ai-BlogDB"
    }
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`, dbOptions);
        console.log("Connected to MongoDB");
    } catch (error) {
          console.log(error.message);
    }
}

export default connectDB;