import React, { useState } from "react";
import { useNavigate } from "react-router";

const OngoingPolls = () => {
    const navigate = useNavigate();
    const [poll_id, setpoll_id] = useState("");

    const changeHandler = (e) => {
        setpoll_id(e.target.value);
    }

    const findPoll = () => {
        navigate(`/poll/${poll_id}`);
    }

    return (
        <>
        <div className="container ongoingPoll">
            <div className="row ongoingHeader">
                <h2 className="ongoingTitle">Find the latest ongoing polls. </h2>
            </div>
            <div className="row ">
                <div className="col">
                    <input type="text" value={poll_id} onChange={changeHandler} placeholder = "Enter Poll ID" className="ongoingInp"/>
                </div>
                <div className="col">
                    <button onClick={findPoll}  className = "findBtn btn2">Find</button>
                </div>
            </div>
        </div>
        </>
    );
}

export default OngoingPolls;