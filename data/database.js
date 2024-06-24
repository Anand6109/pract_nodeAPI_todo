import mongoose from 'mongoose';


const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbname: "APi_Pract"
    })
        .then(() => console.log("database connected"))
        .catch((err) => console.log("not connected", err))

}

export { connectDB };