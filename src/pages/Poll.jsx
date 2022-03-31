import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getPollInfo, submitPollChoice } from "../apis/pollApi";
import { useNavigate } from "react-router";
import QRCode from "qrcode.react";

const Poll = () => {
  const { id } = useParams();
  const [pollinfo, setPollinfo] = useState({});
  const [isPoll, setIsPoll] = useState(false);
  const navigate = useNavigate();
  const [userChoice, setUserChoice] = useState({
    // poll_id: id, ye backup hai
    _id: "",
    choice: "",
  });
  const [loadinSubmit, setLoadingSubmit] = useState(false);
  const [ULR, setULR] = useState("");


  useEffect(async () => {
    const data = await getPollInfo(id);
    console.log(data);
    if (data.success) {
      setPollinfo(data.result[0]);
      // console.log("pollinfo: ", pollinfo);
      setIsPoll(true);
      setUserChoice({
        ...userChoice,
        poll_id: id,
        _id: pollinfo._id,
      });
    } else {
      alert(data.message);
      navigate("/polls");
    }
    const text = `http://localhost:3000/poll/${id}`;
    setULR(text);
  }, []);

  const changeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUserChoice({
      ...userChoice,
      [name]: value,
    });
  };
const copyToClipboard = e => {
  navigator.clipboard.writeText(window.location.toString())
}
  const formHandler = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);

    console.log("pollinfo: ", pollinfo);
    console.log("usechoice: ", userChoice);

    const data = await submitPollChoice(userChoice);
    if (data.success) {
      alert("choice successfully submited");
      navigate(`/pollResult/${id}`);
    } else {
      alert(data.message);
      setLoadingSubmit(false);
      if (data.message == "Already voted") navigate(`/pollResult/${id}`);
    }
  };

  // copy link
  const copy = async () => {
    const text = `http://localhost:3000/poll/${id}`;
    // setULR(text);
    await navigator.clipboard.writeText(text);
    // alert('Text copied');
  }

  return (
    <>
      {!isPoll && <h1> Loading poll {id} ...</h1>}
      {isPoll && (
        <div>
          <div className="container pollSec">
            <div className="row pollHeader">
              <h1 className="pollTitle">{pollinfo.title}</h1>
              <h3 className="pollDes">{pollinfo.description}</h3>
            </div>
            <div className="row pollFooter">
              <h3 className="pollChoices">Choices </h3>
              <form onSubmit={formHandler}>
                <div className="row">
                  <div className="row">
                    <div className="col-1">
                      <input
                        type="radio"
                        name="choice"
                        value="choice1"
                        id="choice1"
                        className="choice"
                        onChange={changeHandler}
                      />
                    </div>
                    <div className="col">
                      <label for="choice1">{pollinfo.choice1}</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-1">
                      <input
                        type="radio"
                        name="choice"
                        value="choice2"
                        id="choice2"
                        className="choice"
                        onChange={changeHandler}
                      />
                    </div>
                    <div className="col">
                      <label for="choice2">{pollinfo.choice2}</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-1">
                      <input
                        type="radio"
                        name="choice"
                        value="choice3"
                        id="choice3"
                        className="choice"
                        onChange={changeHandler}
                      />
                    </div>
                    <div className="col">
                      <label for="choice3">{pollinfo.choice3}</label>
                    </div>
                  </div>
                </div>
                <div className="row pollsubbtn">
                  {!loadinSubmit && (
                    <button type="submit" className=" btn2 pollsubmitBtn">
                      Vote
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
          <div className="container shareSec">
              <div className="row">
                  <h4 className="shTitle">Share this Poll with your friends</h4>
              </div>
              <div className="row">
                  <div className="col">
                    <h4 className="shLink">Link to POLL: </h4>
                    <a href={ULR}>{ULR}</a>
                  </div>
                  <div className="col-2">
                    <button className="btn2 copyBtn" onClick={copy}>Copy</button>
                  </div>
                  <QRCode value={ULR} />
              </div>
          </div>
          
        </div>
      )}
    </>
  );
};

export default Poll;
