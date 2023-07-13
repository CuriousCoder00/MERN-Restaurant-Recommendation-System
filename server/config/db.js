const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();


const connectToMongo = async () => {
    await mongoose.connect(process.env.MONGO_URI).then(console.log('Connected to Mongo.'))
}

module.exports = connectToMongo;