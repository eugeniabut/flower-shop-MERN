import mongoose from "mongoose";

const connectDB = async()=>{
    const MONGO_URI=process.env.SECRET_MONGO_URI
    try {
        await mongoose.connect(MONGO_URI)
    } catch (error) {
       console.log(error.message)
    }
}

export default connectDB