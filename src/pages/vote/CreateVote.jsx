import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createVote, addCandidate, addVoters } from "../../apis/voteApi";
import { useDispatch, useSelector } from "react-redux";
import { setPosition, setstep } from "../../redux/actions/createVoteAction";
import { decodeToken } from "../../utils/decodeToken";
import { Helmet } from "react-helmet"

const CreateVote = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [voteInfo, setVoteInfo] = useState({
    name: "",
    description: "",
  });
  const [name, setName] = useState("");
  const [partyName, setPartyName] = useState("");
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState(null);
  const [voteId, setVoteId] = useState();
  const [voterList, setVoterList] = useState(null);
  const dispatch = useDispatch();
  const [allCandidates, setAllCandidate] = useState([]);
  const store = useSelector((store) => store);

  // check if there is already a vote
  useEffect(() => {
      if(store.createVote.isThere)
      {
          setStep(store.createVote.step);
          setVoteInfo(store.createVote.position);
      }
  });

  // handle avatar
  const imagehandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setProfile(img);
    }
  };

  // handle voter list
  const voterListHandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      let xml = e.target.files[0];
      setVoterList(xml);
    }
  };

  // handle vote info
  const changeHandler1 = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setVoteInfo({
      ...voteInfo,
      [name]: value,
    });
  };

  // submit vote details
  const formHandler1 = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    var data = await createVote(voteInfo);
    if (data.success) {
      console.log("voteId:", data.response._id);
      setVoteId(data.response.position_id);

      // set position and step in redux
      dispatch(setstep(2));
      dispatch(setPosition(voteInfo));

      alert("vote successfully created");
      setIsLoading(false);
      try{
      const token = decodeToken(store.createVote);
      localStorage.setItem('createVoteJwtToken', token);
      }
      catch(err){
        console.log(err);
      }

    } else {
      setIsLoading(false);
      alert(data.message);
    }
    // store data in local storage
    // console.log("store.createVote: ", store.createVote.isThere)
    // const token = await decodeToken({name: "aayush"});
    // localStorage.setItem('createVoteJwtToken', token);
    // console.log("token: ", token);
  };

  const insertCandidate = () => {
    setAllCandidate([...allCandidates, {name: name, partyName: partyName}]);
    setName("");
    setEmail("");
    setPartyName("");
    setPhone(null);
    // setProfile(null);
  }

  // submit candidate details
  const formHandler2 = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("partyName", partyName);
    formData.append("profile", profile);
    formData.append("position_id", voteId);

    const data = await addCandidate(formData);
    if (data.success) {
      console.log("success:", data);
      setIsLoading(false);
      insertCandidate();
      alert("Candidate added");
    } else {
      alert(data.message);
      setIsLoading(false);
    }
  };

  // submit voter list
  const formHandler3 = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("excel", voterList);
    formData.append("position_id", voteId);

    const data = await addVoters(formData);
    if (data.success) {
      setIsLoading(false);
      navigate("/");
    } else {
      alert(data.message);
      setIsLoading(false);
    }
  };

  const next = () => {
    dispatch(setstep(3));
  };
  const back = () => {
    dispatch(setstep(2));
  };

  return (
    <>
    <Helmet>
      <title>Vote • EZPoll</title>
    </Helmet>
      {step === 1 && (
        <div className="container stp1">
          <div className="row">
            <h2 className="stp">Step 1 of 3</h2>
          </div>
          <div className="row">
            <h4 className="stpD">Enter details of Position</h4>
          </div>
          <div className="row">
            <form onSubmit={formHandler1}>
              <div className="row">
                <div className="col my-1">
                  <h4 className="pos">Position Name </h4>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    name="name"
                    className="stpInp"
                    required
                    value={voteInfo.name}
                    onChange={changeHandler1}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <h4 className="pos">Description of position</h4>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    name="description"
                    className="stpInp"
                    required
                    value={voteInfo.description}
                    onChange={changeHandler1}
                  />
                </div>
              </div>
              <div className="row">
                {!isLoading && (
                  <button type="submit" className="btn3 mx-2">
                    Create
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="container stp1">
          <div className="row">
            <h2 className="stp">Step 2 of 3</h2>
          </div>

          <div className="row">
            <h4 className="posD">Position {voteInfo.name}</h4>
            <h4 className="posD">Description {voteInfo.description}</h4>
          </div>
          <div className="row">
            <h4 className="stpD">Enter details of the Candidate</h4>
          </div>
          <div className="row">
            <form onSubmit={formHandler2}>
              <div className="row">
                <div className="col my-1">
                  <h4 className="pos">Name </h4>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    className="stpInp"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col my-1">
                  <h4 className="pos">Party Name </h4>
                </div>
                <div className="col-6">
                  <input
                    className="stpInp"
                    type="text"
                    name="partyName"
                    value={partyName}
                    onChange={(e) => setPartyName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col my-1">
                  <h4 className="pos">Mobile No. </h4>
                </div>
                <div className="col-6">
                  <input
                    className="stpInp"
                    type="tel"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col my-1">
                  <h4 className="pos">Email </h4>
                </div>
                <div className="col-6">
                  <input
                    type="email"
                    className="stpInp"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col my-1">
                  <h4 className="pos">Avatar </h4>
                </div>
                <div className="col-6">
                  <input
                    className="stpInpF"
                    required
                    type="file"
                    accept=".jpg,.png,.jpeg"
                    onChange={imagehandler}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  {!isLoading && (
                    <button type="submit" className="btn3">
                      Add
                    </button>
                  )}
                </div>
                <div className="col-1">
                  <button className="btn4" onClick={next}>
                    Next
                  </button>
                </div>
              </div>
            </form>
            {allCandidates.map((candidate, index) => (
              <div key={index}>
                {candidate.name}: {candidate.partyName}
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="container stp1">
          <div className="row">
            <h2 className="stp">Step 3 of 3</h2>
          </div>
          <div className="row">
            <h4 className="stpD">Insert Voters List</h4>
          </div>

          <form onSubmit={formHandler3}>
            <div className="row">
              <div className="col-6">
                <input
                  type="file"
                  className="stpInpF"
                  required
                  name="voterList"
                  onChange={voterListHandler}
                />
              </div>
            </div>

            <div className="row">
              <div className="col">
                {!isLoading && (
                  <button type="submit" className="btn3">
                    Create
                  </button>
                )}
              </div>
              <div className="col-1">
                <button className="btn4" onClick={back}>
                  Back
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      {/* <lable>step: {step}</lable> */}
    </>
  );
};

export default CreateVote;
