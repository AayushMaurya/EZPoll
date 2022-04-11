import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getPollInfo, submitPollChoice } from "../apis/pollApi";
import { useNavigate } from "react-router";
// import Modal from 'react-overlays/Modal'
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import QRCode from "qrcode.react";

const Poll = () => {
  const { id } = useParams();
  const [pollinfo, setPollinfo] = useState({});
  const [isPoll, setIsPoll] = useState(false);
  const navigate = useNavigate();
  const [userChoice, setUserChoice] = useState({
    poll_id: "",
    choice_id: "",
  });
  const [loadinSubmit, setLoadingSubmit] = useState(false);
  const [ULR, setULR] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      });
    } else {
      alert(data.message);
      navigate("/polls");
    }
    const text = `http://localhost:3000/poll/${id}`;
    setULR(text);
  }, []);

  const changeHandler = (e) => {
    setUserChoice({
      ...userChoice,
      choice_id: e.target.value,
    });
    console.log("useChoice: ", userChoice);
  };
  const copyToClipboard = (e) => {
    navigator.clipboard.writeText(window.location.toString());
  };
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
  };

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
                  {pollinfo.choices.map((c, index) => (
                    <div className="row" key={index}>
                      <div className="col-1">
                        <input
                          type="radio"
                          name="choice"
                          value={c._id}
                          id="choice1"
                          className="choice"
                          onChange={changeHandler}
                        />
                      </div>
                      <div className="col">
                        <label for="choice1">{c.choiceValue}</label>
                      </div>
                    </div>
                  ))}
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
              <h4 className="shLink">Link to POLL: </h4>
            </div>
            <div className="row">
              <div className="col">
                <a href={ULR} className="link">
                  {ULR}
                </a>
              </div>
              <div className="col-2">
                <button className="btn2 copyBtn" onClick={copy}>
                  Copy
                </button>
              </div>

              <div className="col">
                <Button
                  type="submit"
                  onClick={handleShow}
                  className=" showQrBtn btn3"
                >
                  Show QR-Code
                </Button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      {" "}
                      <h4 className="shLink">QR-Code</h4>{" "}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="qrStyle">
                      <QRCode value={ULR} />
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>

              {/* <div className="row my-4">
                <h4 className="shLink">
                  Scan this QR to access the Poll from your Smartphone
                </h4>
                <QRCode value={ULR} />
              </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Poll;
