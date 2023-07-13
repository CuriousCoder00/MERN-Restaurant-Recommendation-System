import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav
      className="navbar sticky-top navbar-expand-lg bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link to='/' className="navbar-brand mx-auto">Restaurant Recommendor</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <Link to='searchByLocation' className="nav-link mx-4">
                Search by Location
            </Link>
          </ul>
          <div className="d-flex nav-link justify-content-center text-light align-items-center">
            Logout
            <Link to="account" className=" nav-link">
              <i className="bi bi-box-arrow-right text-light fs-4 mx-3"></i>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
