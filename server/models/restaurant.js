const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  cuisine: { 
    type: String, 
    required: true 
  },
  location: { 
    type: String, 
    required: true 
  },
  rating: { 
    type: Number, 
    default: 0 
  },
  reviews: [{ 
    type: String 
  }],
});


module.exports = mongoose.model("Restaurant", RestaurantSchema);