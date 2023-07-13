const express = require('express');
const cors = require('cors');

const dotenv = require('dotenv')

const connectToMongo = require('./config/db')

const app = express();

// Load environment variables from .env file, if any. This is important for security reasons
dotenv.config();

// Connect to MongoDB
connectToMongo();

// Init Middleware
app.use(cors());
app.use(express.json({ extended: true }));

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/restaurant', require('./routes/restaurant'));


// Define PORT
const PORT = process.env.PORT;

// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));  
