const mongoose = require("mongoose")

const connectDb = async()=>{
    try{
        const conn = await mongoose.connect('mongodb+srv://sandeepmaraboina14s:Sandeep123@cluster0.mhikrup.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log("MongoDb Connected")
    }catch(error){
        console.log("Error While Connecting to Database")
        process.exit(1)
    }
}

module.exports = connectDb