import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decodeToken } from "../../utils/decodeToken";
import { useNavigate } from "react-router-dom";
import { addNewClient, checkClientLoginData } from "../../apis/clientApi";
import { setClient } from "../../redux/actions/clientAction";
import { Link } from "react-router-dom";
import './clientCss.css';
import { Helmet } from "react-helmet"

const ClientSignup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((store) => store);
  const [isMatching, setIsMatching] = useState(true);
  const [isShowPass, setIsShowPass] = useState(false);

  // if client logged in then navigate to clientHome
  useEffect(() => {
    if (store.client.isAuthenticated) {
      navigate("/client");
    }
  }, [store.client.isAuthenticated]);

  useEffect(() => {
    if(signupInfo.password === signupInfo.confirmPassword)
      setIsMatching(false);
    else
      setIsMatching(true);
  });

  const changeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setSignupInfo({
      ...signupInfo,
      [name]: value,
    });
  };

  const formHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = await addNewClient(signupInfo);
    if (data.success) {
      console.log("client can be added");
      alert(data.message);
      console.log(data);

      const token = await checkClientLoginData({
        registrationNumber: data.response.registrationNumber,
        password: signupInfo.password,
      });
      if (token) {
        const clientCridentials = decodeToken(token);
        dispatch(setClient(clientCridentials));
      } else {
        setIsLoading(false);
        alert("login info is wrong");
      }
    } else {
      console.log(data.message);
      alert(data.message);
      setIsLoading(false);
    }
  };

  return (
    <>
    <Helmet>
      <title>Signup • EZPoll</title>
    </Helmet>
      <div className="container loginForm">
        <div className="row formBody">
          <div className="row">
            <h3 className="clientLoginTitle">Client Signup</h3>
          </div>

          <form onSubmit={formHandler}>
            <input
              type="text"
              name="name"
              className="inp"
              required
              value={signupInfo.name}
              onChange={changeHandler}
              placeholder="Name"
            />
            <br />
            <input
              type="email"
              name="email"
              className="inp"
              required
              value={signupInfo.email}
              onChange={changeHandler}
              placeholder="Email"
            />
            <br />
            <input
              type={isShowPass ? "text" : "password"}
              name="password"
              className="inp"
              required
              value={signupInfo.password}
              onChange={changeHandler}
              placeholder="Password"
            />
            <button type="button" onClick={() => {setIsShowPass(!isShowPass)}} >show</button>
            <br />
            <input
              type={isShowPass ? "text" : "password"}
              name="confirmPassword"
              className="inp"
              required
              value={signupInfo.confirmPassword}
              onChange={changeHandler}
              placeholder="Confirm Password"
            />
            {isMatching && <lable>password doesnot match</lable>}
            <button type="button" onClick={() => {setIsShowPass(!isShowPass)}} >show</button>
            <br />
            <input
              type="tel"
              name="contactNumber"
              className="inp"
              required
              value={signupInfo.contactNumber}
              onChange={changeHandler}
              placeholder="Contact No."
            />
            <br />
            <div className="row">
              {!isLoading && (
                <button type="submit" className="btn signupBtn">
                  Signup
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="row">
          <div className="dont">
            Already have an account{" "}
            <Link to="/clientLogin" className="donts">
              LogIn
            </Link>
          </div>
        </div>
      </div>
      {/* <form onSubmit={formHandler}>
                <label>Name: </label>
                <input type="text" name="name" required value={signupInfo.name} onChange={changeHandler} />
                <br />
                <label>Email: </label>
                <input type="email" name="email" required value={signupInfo.email} onChange={changeHandler} />
                <br />
                <label>DOB: </label>
                <input type="text" name="dob" required value={signupInfo.dob} onChange={changeHandler} />
                <br />
                <label>contactNumber: </label>
                <input type="tel" name="contactNumber" required value={signupInfo.contactNumber} onChange={changeHandler} />
                <br />
                {!isLoading && <button type="submit">SignUp</button>}
            </form>
            <div>Already have an account <Link to="/clientLogin" >LogIn</Link></div> */}
    </>
  );
};

export default ClientSignup;
