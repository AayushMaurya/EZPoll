import React, { useEffect, useState } from "react";
import { getAllPolls } from "../../apis/clientApi";
import { useNavigate } from "react-router";
import { FaPoll } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaShareAltSquare } from "react-icons/fa";
import { deletePoll } from "../../apis/clientApi";
import SharePoll from "./SharePoll";
import Helmet from "react-helmet";

const ClientDashboard = () => {
  const [allPoll, setAllPoll] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [isPopup, setIsPopup] = useState(false);
  const [share_id, setShare_id] = useState("");
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
      
      const data1 = await getAllPolls();
      if(data.success)
        setAllPoll(data1.result);
    }
    else
      alert(data.message);
  }

  // to share the poll
  const share = (share_id) => {
    setShare_id(share_id);
    setIsPopup(true);
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
        <div className="container dash">
            <div className="row my-2">
                <h3>Your Recently Created Polls</h3>
            </div>
          {allPoll.map((poll, index) => (
            <div key={index}>
              <div className="row my-2 dashPoll">
                  <div className="col">
                    poll : {poll.title}
                  </div>
                  <div className="col">
                    <div className="row w-50 btnOpt">
                      <div className="col">
                          <button type="button" className="noneBtn" onClick={() => {seeResult(poll.poll_id)}}>
                            <FaPoll size="25" />
                          </button>
                      </div>
                      <div className="col" >
                        <button type="button" className="noneBtn" onClick={() => {deletepoll(poll._id)}}><FaTrash size="22" /></button>
                      </div>
                      <div className="col">
                        <button type="button" className="noneBtn" onClick={() => {share(poll.poll_id)}}><FaShareAltSquare size="25" /></button>
                      </div>
                    </div>
                  </div>
                
                </div>
            </div>
          ))}
        </div>
      )}
      {isPopup && <SharePoll handleClose={() => setIsPopup(false)} share_id={share_id} />}
    </>
  );
};

export default ClientDashboard;
