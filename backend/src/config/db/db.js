const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()
const MONGO_URL = process.env.MONGO_URI;

const connectToDb = async () => {
    try {
        if (!MONGO_URL) {
            console.log("please add mongo url in your env file")
            process.exit(1)
        }
        await mongoose.connect(MONGO_URL);
        console.log("Data Base connect to Successfully")
    } catch (error) {
        console.log("Data not connected", error);
        process.exit(1)
    }
}

module.exports = connectToDb