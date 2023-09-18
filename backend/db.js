import mongoose from "mongoose";


const connectDB = async()=>{

    const MONGO_URI=process.env.SECRET_MONGO_URI
    console.log("DBconnected1")
    try {
        await mongoose.connect(MONGO_URI)
       console.log("DBconnected2")
    } catch (error) {
       console.log(error.message)
    }
}

export default connectDB