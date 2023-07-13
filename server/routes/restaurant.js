const express = require('express');
const router = express.Router();

const Restaurant = require('../models/restaurant.js');

// @route   GET api/restaurant : To get all restaurants.
router.get('/getall', async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).send('Internal server error.');
    }
}
);
// @route  POST /api/restaurant: Create a new restaurant record in the database
router.post('/create', async (req, res) => {
    const { name, cuisine, location, rating } = req.body;
    try {
        const newRestaurant = await Restaurant.create({
            name,
            cuisine,
            location,
            rating
          });
        res.status(201).json(newRestaurant);
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error.');
    }
}
);
// @route
// GET /api/restaurants/getall/:location
// Retrieve restaurants by location
router.get("/getall/:location", async (req, res) => {
    try {
      const { location } = req.params;
      const restaurants = await Restaurant.find({ location });
      res.json(restaurants);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error.");
    }
  });
// @route   PUT api/restaurant/:id : To update a restaurant by id.
router.put('/update/:id', async (req, res) => {
    try {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedRestaurant);
    }
    catch (error) {
        res.status(500).send('Internal server error.');
    }
}
);
// @route   DELETE api/restaurant/:id : To delete a restaurant by id.
router.delete('/delete/:id', async (req, res) => {
    try {
        await Restaurant.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).send('Internal server error.');
    }
}
);

module.exports = router;
