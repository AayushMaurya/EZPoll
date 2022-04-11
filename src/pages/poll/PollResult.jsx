import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getPollInfo } from "../../apis/pollApi";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet";

const PollResult = () => {
  const { id } = useParams();
  const [pollInfo, setPollInfo] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <>
    <Helmet>
      <title>Result • EZPoll</title>
    </Helmet>
      <div className="container my-4">
          <div className="row">
              <h4 className="stp">Poll Results</h4>
          </div>
        {isLoading ? (
          <div>Loading Result: {id}</div>
        ) : (
          <div className="row pollRes mx-1 my-2">
          {pollInfo.choices.map((choice, index) => (
            <div key={index} className="row">
              {choice.choiceValue}: {choice.count}
            </div>
          ))}
            {/* <div className="row">
              {pollInfo.choice1} : {pollInfo.choice1Vote}
            </div>
            <div className="row">
              {pollInfo.choice2} : {pollInfo.choice2Vote}
            </div>
            <div className="row">
              {pollInfo.choice3} : {pollInfo.choice3Vote}
            </div> */}
          </div>
        )}
      </div>
    </>
  );
};

export default PollResult;
