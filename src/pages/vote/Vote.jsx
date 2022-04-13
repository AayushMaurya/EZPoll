import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getVoteInfo } from "../../apis/voteApi";
import { useNavigate } from "react-router";
import { giveVote } from "../../apis/voterApi";
import Popup from "./Popup";
import { voterLogout } from "../../redux/actions/voterAction";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

const Vote = () => {
  const { id } = useParams();
  const [voteInfo, setVoteInfo] = useState();
  const [isVote, setIsVote] = useState(false);
  const navigate = useNavigate();
  const [userChoice, setUserChoice] = useState({
    position_id: "",
    choice_id: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  const dispatch = useDispatch();

  // fetch the vote info on loading the page
  useEffect(async () => {
    const data = await getVoteInfo(id);
    console.log("received data: ", data);

    if (data.success) {
      setVoteInfo(data);
      setIsVote(true);
    } else {
      alert(data.message);
      setIsVote(false);
      navigate("/");
    }
  }, []);

  const changeHandler = (e) => {
    console.log("choice: ", e.target.value);
    setUserChoice({
      ...userChoice,
      position_id: voteInfo.position[0].position_id,
      choice_id: e.target.value,
    });
  };

  const formHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    console.log("now the vote is being submitted");
    console.log("user chocice : ", userChoice);

    const data = await giveVote(userChoice);
    if (data.success) {
      alert(data.message);
      if (data.message === "Already voted") {
        dispatch(voterLogout());
        navigate("/");
      }
      setIsPopup(true);
      setIsLoading(false);
    } else {
      alert(data.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Vote • EZPoll</title>
      </Helmet>
      {!isVote && <h3 className="mx-2 my-2">Loading poll: {id} ...</h3>}
      {isVote && (
        <div className="container votPg">
          <div className="row my-3">
            <div className="row">
              <div className="col-4">
                <h3 className="votInfo"> Position </h3>
              </div>
              <div className="col">
                <h3 className="votInfo"> {voteInfo.position[0].name} </h3>
              </div>
            </div>
            
            <div className="row">
              <div className="col-4">
                <h3 className="votInfo"> Description </h3>
              </div>
              <div className="col">
                <h3 className="votInfo"> {voteInfo.position[0].description} </h3>
              </div>
            </div>

          </div>

          <div className="row my-3">
            <form onSubmit={formHandler}>
              <CardGroup className="cardGrp">
                {voteInfo.result.map((candidate, index) => (
                  <Card
                    className="mx-4 text-center cardStyle"
                    style={{ width: "15rem" }}
                    key={index}
                  >
                      <div className="imgCrp my-3">
                        <Card.Img className="cardImage" variant="center" src="https://cdn.pixabay.com/photo/2019/03/08/17/04/elephants-4042763_960_720.jpg" />
                      </div>
                    <Card.Body>
                      <h4>name: {candidate.name}</h4>
                      <h4>party name: {candidate.partyName}</h4>
                      <h4>phone: {candidate.phone}</h4>
                      <h4>email: {candidate.email}</h4>
                      <div className="row m-auto">
                          <input
                            className="choiceRadio m-auto"
                            type="radio"
                            name="choice"
                            value={candidate._id}
                            onChange={changeHandler}
                            data-toggle="tooltip"
                            data-placement="bottom" 
                            title="I choose this Candidate"
                          />
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </CardGroup>
              <div className="row my-2">
                {!isLoading && (
                  <button className="btn5 m-auto" type="submit">
                    Vote
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
      {isPopup && (
        <Popup
          handleClose={() => setIsPopup(false)}
          choice_id={userChoice.choice_id}
          position_id={userChoice.position_id}
        />
      )}
    </>
  );
};

export default Vote;
