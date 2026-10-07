import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MONGODB CONNECTED SUCCESSFULLY");
  } catch (error) {
    console.log("Error connecting to Database:", error.message);
    // throw error;
  }
};

export default connectDB;
