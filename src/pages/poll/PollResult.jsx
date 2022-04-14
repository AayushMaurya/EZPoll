import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getPollInfo } from "../../apis/pollApi";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet";
import { PieChart, Pie} from 'recharts';

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
          </div>
        )}
      </div>
    </>
  );
};

export default PollResult;
