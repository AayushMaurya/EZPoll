import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getPollInfo } from "../../apis/pollApi";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet";
import { PieChart, Pie} from 'recharts';
import SharePoll from "../client/SharePoll";
import { FaShareAltSquare } from "react-icons/fa";

const PollResult = () => {
  const { id } = useParams();
  const [pollInfo, setPollInfo] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isPopup, setIsPopup] = useState(false);

  useEffect(async () => {
    const data = await getPollInfo(id);
    console.log("data received :", data);
    if (data.success) {
      setPollInfo(data.result[0]);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      alert(data.message);
      navigate("/polls");
    }

    console.log("poll info: ", pollInfo);
  }, []);

  // to share the poll
  const share = () => {
    setIsPopup(true);
  }

  return (
    <>
    <Helmet>
      <title>Result • EZPoll</title>
    </Helmet>
      <div className="container my-4 resPage">
          <div className="row">
              <h4 className="stp">Poll Results</h4>
          </div>
        {isLoading ? (
          <div>Loading Result: {id}</div>
        ) : (
          <div className="row pollRes mx-1 my-2">
          {pollInfo.choices.map((choice, index) => (
            <div key={index} className="row resPg">
              <div className="col chtxt">
                {choice.choiceValue}  
              </div>
              <div className="col-2 chtxt">
                {choice.count}  
              </div>
            </div>
          ))}
          <button type="button" className="noneBtn" onClick={share}><FaShareAltSquare size="25" /></button>
          </div>
        )}
      </div>
      {isPopup && <SharePoll handleClose={() => setIsPopup(false)} share_id={id} name="pollResult" />}
    </>
  );
};

export default PollResult;
