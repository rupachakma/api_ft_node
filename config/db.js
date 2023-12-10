import mongoose from 'mongoose'
import colors from 'colors'


const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongodb connected with: ${mongoose.connection.host}`.bgGreen.white)
    } catch(error) {
        console.log(`Mongodb connection error: ${error}`.bgRed.white)
    }
}


export default connectDB;