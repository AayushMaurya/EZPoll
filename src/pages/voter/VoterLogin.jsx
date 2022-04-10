import React, { useEffect, useState } from "react";
import { checkVoterLoginData } from "../../apis/voterApi";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setVoter } from "../../redux/actions/voterAction";
import { decodeToken } from "../../utils/decodeToken";

const VoterLogin = () => {
  const { id } = useParams();

  const [voterLoginInfo, setVoterLoginInfo] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const store = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    if (store.voter.isAuthenticated) {
      navigate(`/vote/${id}`)
    }
  });

  const changeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setVoterLoginInfo({
      ...voterLoginInfo,
      [name]: value,
    });
  };

  const formHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    console.log("login info: ", voterLoginInfo);

    const data = await checkVoterLoginData(voterLoginInfo);
    if (data.success) {
      const voterCridentials = decodeToken(data.token);
      alert("loged in");
      dispatch(setVoter(voterCridentials));
    } else {
      alert(data.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="container loginForm">
        <div className="row formBody">
          <div className="row">
            <h3 className="clientLoginTitle">Voter Login</h3>
          </div>

          <form onSubmit={formHandler}>
            <input
              className="inp"
              type="text"
              name="username"
              onChange={changeHandler}
              value={voterLoginInfo.username}
              placeholder="Username"
              required
            />
            <br />
            <input
              className="inp"
              type="text"
              name="password"
              onChange={changeHandler}
              value={voterLoginInfo.password}
              placeholder="Password"
              required
            />
            <div className="row">
              {!isLoading && (
                <button type="submit" className="btn2 vloginBtn">
                  Login
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default VoterLogin;
