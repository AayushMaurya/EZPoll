import React, { useEffect, useState } from "react";
import { getAllPolls } from "../../apis/clientApi";
import { useNavigate } from "react-router";
import { FaPoll } from "react-icons/fa";

const ClientDashboard = () => {
  const [allPoll, setAllPoll] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(async () => {
    const data = await getAllPolls();
    console.log("data: ", data);
    if (data.success) {
      setAllPoll(data.result);
      setIsLoading(false);
      console.log("all polls: ", allPoll);
    } else {
      alert(data.message);
      navigate("/");
      setIsLoading(true);
    }
  }, []);

  const seeResult = (poll_id) => {
      console.log("result for poll id: ", poll_id);
      const url = "/pollResult/" + poll_id;
      navigate(url)
  }

//   const data = getAllPolls();
  return (
    <>
      {isLoading ? (
        <div>Loading Dashboard ...</div>
      ) : (
        <div className="container">
            <div className="row my-2">
                <h3>Your Recently Created Polls</h3>
            </div>
          {allPoll.map((poll, index) => (
            <div key={index}>
              <div className="row my-2">
                  <div className="col">
                    poll name: {poll.title}
                  </div>
                  <div className="col">
                      <button type="button" className="noneBtn" onClick={() => {seeResult(poll.poll_id)}}>
                        <FaPoll size="25" />
                      </button>
                  </div>
                
                </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ClientDashboard;
