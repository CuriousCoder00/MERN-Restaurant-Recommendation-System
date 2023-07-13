import React, { useState } from "react";
import axios from "axios";

const Recommendations = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(" ");

  const inputLocation = (e) => {
    e.preventDefault();
    setLocation(e.target.value);
  };

  const firstUppercase = (str) => {
    const arr = str.split(" ");

    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }

    return arr.join(" ");
  };
  // Get all the restaurants related to the entered location
  const getRestaurantsByLocation = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `http://localhost:5000/api/restaurant/getall/${location}`
      );
      setRestaurants(res.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <h2 className="text-center my-3">Restaurant Recommendations</h2>
        <form className="d-flex mb-4" role="search">
          <input
            className="form-control me-2"
            type="search"
            onChange={inputLocation}
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success"
            type="submit"
            onClick={getRestaurantsByLocation}
          >
            Search
          </button>
        </form>
      </div>
      <div className="container my-4">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-center text-danger">{error}</div>
        ) : (
          <div className="row">
            {restaurants.map((restaurant) => (
              <div className="col-md-4" key={restaurant._id}>
                <div className="card mb-4 shadow-sm">
                  <img
                    src={`https://source.unsplash.com/random/100x40/?${restaurant.cuisine}`}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center">
                      {restaurant.name}
                    </h5>
                    <p className="card-text">{restaurant.cuisine}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">
                        {firstUppercase(restaurant.location)}
                      </small>
                      <small className="text-muted">{restaurant.rating}</small>
                      <small className="text-muted">{restaurant.review}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Recommendations;
