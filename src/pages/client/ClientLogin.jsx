import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setClient } from "../../redux/actions/clientAction";
import decodeToken from "../../utils/decodeToken";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { checkClientLoginData } from "../../apis/clientApi";
import { Link } from "react-router-dom";
import "./clientCss.css";

const ClientLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    registrationNumber: "",
    password: "",
  });
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (store.client.isAuthenticated) {
      navigate("/");
    }
  }, [store.client.isAuthenticated]);

  const changeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const formHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    console.log("login info is: ", loginInfo);

    const token = await checkClientLoginData(loginInfo);
    if (token) {
      console.log("admin ok with token: ", token);
      const clientCridentials = decodeToken(token);
      console.log(clientCridentials);

      dispatch(setClient(clientCridentials));
    } else {
      console.log("login info is wrong");
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="container loginForm">
        <div className="row formBody">
          <div className="row">
            <h3 className="clientLoginTitle">Client Login</h3>
          </div>

          <form onSubmit={formHandler}>
            <input
              className="inp"
              type="text"
              name="registrationNumber"
              onChange={changeHandler}
              value={loginInfo.email}
              placeholder="Username"
            />
            <br />
            <input
              className="inp"
              type="text"
              name="password"
              onChange={changeHandler}
              value={loginInfo.password}
              placeholder="Password"
            />
            <div className="row">
              {!isLoading && (
                <button type="submit" className="btn loginBtn">
                  Login
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="row">
          <div className="dont">
            Don't have an account{" "}
            <Link to="/clientSignup" className="donts">
              SignUp
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientLogin;
