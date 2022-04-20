import React from "react";
import { useNavigate } from "react-router";

const ThanksForVote = () => {
    const navigate = useNavigate();
    const goToHome = () => {
        navigate('/');
    }
    return(
        <>
            <h1>Thanks for voting</h1>
            <button onClick={goToHome}>Home</button>
        </>
    );
}

export default ThanksForVote;