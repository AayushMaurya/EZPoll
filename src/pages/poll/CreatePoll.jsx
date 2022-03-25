import React, { useEffect, useState } from "react";
import { createPoll } from "../../apis/pollApi";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const CreatePoll = () => {
  const [pollinfo, setPollInfo] = useState({
    title: "",
    description: "",
    choice1: "",
    choice2: "",
    choice3: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [poll_id, setpoll_id] = useState("");
  const navigate = useNavigate();
  const store = useSelector((store) => store);

  useEffect(() => {
    // iski wajah se back button press karne par wapas nhi ja pa rhe
    // agar login nhi hai to loop me ho ja rha hai
    if (!store.client.isAuthenticated) navigate("/clientSignup");
  }, []);

  const changeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setPollInfo({
      ...pollinfo,
      [name]: value,
    });
  };

  const formHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    var data = await createPoll(pollinfo);

    if (data.success) {
      alert("Poll successfully created");
      setIsCreated(true);
      setpoll_id(data.poll.poll_id);
    } else {
      setIsLoading(false);
      alert(data.message);
    }
  };

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
                  value={pollinfo.title}
                  onChange={changeHandler}
                />
                <br />
                <h4 className="formEle">Description</h4>
                <input
                  type="text"
                  className="formInp"
                  name="description"
                  value={pollinfo.desc}
                  onChange={changeHandler}
                />
                <br />
                <h4 className="formEle">Answer options </h4>
                <input
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
                />
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
              <h4 className="createdTitle">{pollinfo.title}</h4>
              <h4 className="createdDes">{pollinfo.description}</h4>
            </div>
            <div className="row">
              <h4 className="createdChoices">Choices</h4>
            </div>
            <div className="row">
              <h4 className="creatdC">{pollinfo.choice1}</h4>
            </div>
            <div className="row">
              <h4 className="creatdC">{pollinfo.choice2}</h4>
            </div>
            <div className="row">
              <h4 className="creatdC">{pollinfo.choice3}</h4>
            </div>
            <div className="row createdFooter">
              <h4 className="createdL">Poll Link</h4>
              <div className="row crL">
                <div className="col">
                  <h4 className="createdLink">
                    http://localhost:3000/poll/{poll_id}
                  </h4>
                </div>
                <div className="col">
                  <button className="btn2 copyBtn">Copy</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePoll;

