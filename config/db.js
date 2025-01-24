import exp from "constants";
import mongoose from "mongoose";


const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_CONNECTION_URL);
        console.log(`MongoDB connected ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;