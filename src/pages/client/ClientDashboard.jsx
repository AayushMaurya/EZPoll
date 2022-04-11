import React, { useEffect, useState } from "react";
import { getAllPolls } from "../../apis/clientApi";
import { useNavigate } from "react-router";
import { FaPoll } from "react-icons/fa";
import { deletePoll } from "../../apis/clientApi";
import Helmet from "react-helmet";

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

  // to delete a poll
  const deletepoll = async (poll_id) => {
    console.log("poll to be deleted: ", poll_id);
    const data = await deletePoll(poll_id);
    console.log(data);
    if(data.success){
      console.log(data.message);
      // refresh page
      // window.location.reload(false);
      const data1 = await getAllPolls();
      if(data.success)
        setAllPoll(data1.result);
    }
    else
      alert(data.message);
  }

//   const data = getAllPolls();
  return (
    <>
    <Helmet>
      <title>Dash • EZPoll</title>
    </Helmet>
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
                  <div className="col" >
                    <button type="button" onClick={() => {deletepoll(poll._id)}}>delete</button>
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
