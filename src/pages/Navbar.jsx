import React from "react";
import { useSelector } from "react-redux";
import "./index.css";
import "../images/bg.png";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { clientLogout } from "../redux/actions/clientAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(clientLogout());
    navigate("/");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <div className="container-fluid">
          <a className="logo navbar-brand" href="/">
            EZPoll
          </a>
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
              {/* <Link to="/create" className='navLinks'><li className="nav-link text-dark">Create a Poll</li></Link> */}
              <Link to="/CreatePoll" className="navLinks">
                <li className="nav-link text-dark">Create Poll</li>
              </Link>
              <Link to="/CreateVote" className="navLinks">
                <li className="nav-link text-dark">Voting Section</li>
              </Link>
              <Link to="/Polls" className="navLinks">
                <li className="nav-link text-dark">Ongoing Polls</li>
              </Link>
              <Link to="./how" className="navLinks">
                <li className="nav-link text-dark">How it Works</li>
              </Link>
            </ul>
          </div>
          <div>
            {store.client.isAuthenticated ? (
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic" >
                  <FaUserCircle size="35" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1" className="dropBtn">
                    <div className="container">
                      <div className="row clientDetails">
                            <h5 className="clientName">Hi ! {store.client.client.name}</h5>
                            <h8 className="clientEmail">{store.client.client.email}</h8>
                            <Link to="/client" className="clientLink"><h4 className="clientId">@{store.client.client.registrationNumber}</h4></Link>

                        <button onClick={logoutHandler} type="button" className="loginBtn">Logout</button>
                      </div>
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <div className="d-flex justify-content-end signBox">
                <Link to="/clientLogin" className="signLink mx-3">
                  <div className="text-dark">Login</div>
                </Link>
                <Link to="/clientSignup" className="signLink signUpLink mx-3">
                  <div className="">Signup</div>
                </Link>
              </div>
            )}
            {/* <div class="signLink mx-3">Signin</div>
          <div class="signLink signUpLink mx-3">Signup</div> */}
          </div>
        </div>
      </nav>
    </div>
  );
}
