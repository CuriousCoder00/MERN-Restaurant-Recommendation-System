import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const loginInitialValues = {
  username: " ",
  password: " ",
};

const signupInitialValues = {
  name: " ",
  username: " ",
  password: " ",
};

const Login = (props) => {
  const [account, toggleAccount] = useState("login");
  const [signup, setSignup] = useState(signupInitialValues);
  const [login, setLogin] = useState(loginInitialValues);
  const { isUserAuthenticated } = props;
  let navigate = useNavigate()

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };

  const userLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login",{
        username: login.username,
        password: login.password
      });
      const { foundUser, token } = res.data;
      if (!foundUser ||!token ) throw new Error('Invalid credentials');
      localStorage.setItem("token", token);

      navigate('/');
      isUserAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  };

  const signupUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name: signup.name,
        username: signup.signupUsername,
        password: signup.password,
      });
      const { newUser, token } = res.data;
      if (!newUser || !token) throw new Error('Invalid credentials');
      localStorage.setItem("token", token);
      toggleAccount('login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="container border rounded border-2 my-4 p-3"
      style={{ width: "400px" }}
    >
      <div className="mt-3 container text-center">
        <h2 className="text-danger">
          <b>Restaurant Recommendor</b>
        </h2>
        <p className="text-secondary">Your Personal Restaurant Recommendor</p>
      </div>
      {account === "login" ? (
        <form className="my-5 w-75 mx-auto">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              onChange={onValueChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={onValueChange}
              required
            />
          </div>
          <div className="container mx-auto text-center">
            <button className="btn btn-primary" onClick={userLogin}>
              Login
            </button>
            <p className="text-secondary mt-3">OR</p>
            <button
              type="submit"
              className="btn btn-outline-secondary"
              onClick={toggleSignup}
            >
              Create an Account
            </button>
          </div>
        </form>
      ) : (
        <form className="w-75 mx-auto">
          <div className="mb-3">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={onInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="singupUsername" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="signupUsername"
              name="signupUsername"
              onChange={onInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              onChange={onInputChange}
              required
            />
          </div>
          <div className="container mx-auto text-center">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={signupUser}
            >
              Singup
            </button>
            <p className="text-secondary mt-3">OR</p>
            <button
              type="submit"
              className="btn btn-outline-secondary"
              onClick={toggleSignup}
            >
              Already have an account?
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
