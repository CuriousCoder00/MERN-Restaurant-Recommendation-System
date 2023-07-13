import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on component mount and update state accordingly.
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/restaurant/getall");
        setRestaurants(res.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchRestaurants();
    // eslint-disable-next-line
  }, []);

  const firstUppercase = (str) => {
    const arr = str.split(" ");

    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }

    return arr.join(" ");
  };

  // If loading, display loading message.
  if (loading) return <div>Loading...</div>;
  // If error, display error message.
  if (error) return <div>{error}</div>;
  // If no data, display no data message.
  if (!restaurants.length) return <div>No restaurants available.</div>;
  return (
    <div className="container">
      <h2 className="text-center my-3">Restaurant Recommendations</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
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
                  <h5 className="card-title text-center">{restaurant.name}</h5>
                  <p className="card-text">{restaurant.cuisine}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">{firstUppercase(restaurant.location)}</small>
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
  );
};

export default Home;
