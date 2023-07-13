import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import Login from "./components/Login";
import Header from "./components/Header";
import Home from "./components/Home";
import Recommendations from "./components/Recommendations";

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/account" />
  );
};

const App = () => {
  const [isAuthenticated, isUserAuthenticated] = useState(false);
  return (
    <Router>
      <Routes>
        <Route
          path="/account"
          element={<Login isUserAuthenticated={isUserAuthenticated} />}
        />
        <Route
          path="/"
          element={<PrivateRoute isAuthenticated={isAuthenticated} />}
        >
          <Route path="/" element={<Home />} />
        </Route>
        <Route
          path="/"
          element={<PrivateRoute isAuthenticated={isAuthenticated} />}
        >
          <Route path="/searchByLocation" element={<Recommendations/>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
