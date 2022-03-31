import React, { useEffect, useState } from "react";
import { createPoll } from "../../apis/pollApi";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import QRCode from "qrcode.react";

const CreatePoll = () => {
  // const [pollinfo, setPollInfo] = useState({
  //   title: "",
  //   description: "",
  //   choice1: "",
  //   choice2: "",
  //   choice3: "",
  // });
  const [pollInfo, setPollInfo] = useState({
    title: "",
    description: ""
  });
  const [choices, setChoices] = useState([{choiceNo: "", choiceValue: ""}, {choiceNo: "", choiceValue: ""}]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [poll_id, setpoll_id] = useState("");
  const navigate = useNavigate();
  const store = useSelector((store) => store);
  const [ULR, setULR] = useState("");

  useEffect(() => {
    // iski wajah se back button press karne par wapas nhi ja pa rhe
    // agar login nhi hai to loop me ho ja rha hai
    if (!store.client.isAuthenticated) navigate("/clientSignup");
  }, []);

  const changeHandler1 = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setPollInfo({
      ...pollInfo,
      [name]: value,
    });
  };

  // handle choice change
  const changeHandler2 = (e, index) => {
    const values = [...choices];
    values[index].choiceNo = e.target.name;
    values[index].choiceValue = e.target.value;
    setChoices(values);
  }

  const formHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    console.log("choices: ", choices);

    const formData = new FormData();

    formData.append('title', pollInfo.title);
    formData.append('description', pollInfo.description);
    formData.append('choices', choices);

    var data = await createPoll(formData);

    if (data.success) {
      alert("Poll successfully created");
      setIsCreated(true);

      setpoll_id(data.poll.poll_id);

      const text = `http://localhost:3000/poll/${poll_id}`;
      setULR(text);
    } else {
      setIsLoading(false);
      alert(data.message);
    }

  };

  // copy link
  const copy = async () => {
    const text = `http://localhost:3000/poll/${poll_id}`;
    // setULR(text);
    await navigator.clipboard.writeText(text);
  }

  // add choice
  const addChoice = () => {
    setChoices([...choices, {choiceNo: "", choiceValue: ""}]);
  }

  // remove choice
  const removeChoice = () => {
    const values = [...choices];
    values.splice(-1);
    setChoices(values);
  }

  return (
    <>
      {!isCreated && (
        <div>
          <div className="container createForm">
            <div className="row formHead">
              <div className="row">
                <h3 className="crTitle">Create a Poll</h3>
              </div>
              <div className="row">
                <h4 className="crSubtitle">
                  Fill the below form to create your Poll
                </h4>
              </div>
            </div>
            <div className="row crForm">
              <form onSubmit={formHandler}>
                <h4 className="formEle">Title</h4>
                <input
                  type="text"
                  className="formInp"
                  name="title"
                  required
                  value={pollInfo.title}
                  onChange={changeHandler1}
                />
                <br />
                <h4 className="formEle">Description</h4>
                <input
                  type="text"
                  className="formInp"
                  name="description"
                  value={pollInfo.description}
                  onChange={changeHandler1}
                />
                <br />
                <h4 className="formEle">Answer options </h4>
                {choices.map((choice, index) => (
                  <div key={index}>
                  <input
                  type="text"
                  className="formInp"
                  name={`choice${index+1}`}
                  required
                  value={choice.choiceValue}
                  onChange={e => changeHandler2(e, index)}
                  placeholder={`option ${index+1}`}
                />
                  </div>
                ))}
                <button type="button" onClick={addChoice}>+</button>
                <button type="button" onClick={removeChoice}>-</button>
                {/* <input
                  type="text"
                  className="formInp"
                  name="choice1"
                  required
                  value={pollinfo.choice1}
                  onChange={changeHandler}
                  placeholder="Option 1 "
                />
                <input
                  type="text"
                  className="formInp"
                  name="choice2"
                  required
                  value={pollinfo.choice2}
                  onChange={changeHandler}
                  placeholder="Option 2 "
                />
                <input
                  type="text"
                  className="formInp"
                  name="choice3"
                  required
                  value={pollinfo.choice3}
                  onChange={changeHandler}
                  placeholder="Option 3 "
                /> */}
                <div className="row crBtn">
                  {!isLoading && (
                    <button type="submit" className="createbtn">
                      Create
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {isCreated && (
        <div className="container cr">
          <div className="row my-3 crH">
            <h2>Your poll is successfully created</h2>
          </div>
          <div className="row created">
            <div className="row createdHeader">
              <h4 className="createdTitle">{pollInfo.title}</h4>
              <h4 className="createdDes">{pollInfo.description}</h4>
            </div>
            <div className="row">
              <h4 className="createdChoices">Choices</h4>
            </div>
            {/* <div className="row">
              <h4 className="creatdC">{pollinfo.choice1}</h4>
            </div>
            <div className="row">
              <h4 className="creatdC">{pollinfo.choice2}</h4>
            </div>
            <div className="row">
              <h4 className="creatdC">{pollinfo.choice3}</h4>
            </div> */}
            <div className="row createdFooter">
              <h4 className="createdL">Poll Link</h4>
              <div className="row crL">
                <div className="col">
                  <h4 className="createdLink">
                    http://localhost:3000/poll/{poll_id}
                  </h4>
                </div>
                <div className="col">
                  <button className="btn2 copyBtn" onClick={copy}>Copy</button>
                  {/* <button className="btn2 copyBtn">Copy</button> */}
                </div>
                <QRCode value={ULR} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePoll;

