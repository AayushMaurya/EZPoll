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
            <h1>All ongoing polls</h1>
            <input type="text" value={poll_id} onChange={changeHandler} />
            <button onClick={findPoll}>Find</button>
        </>
    );
}

export default OngoingPolls;