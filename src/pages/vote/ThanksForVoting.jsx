import React from "react";
import { useNavigate } from "react-router";

const ThanksForVote = () => {
    const navigate = useNavigate();
    const goToHome = () => {
        navigate('/');
    }

    return (
        <>

            {/* <h1>Thanks for voting</h1>
            <button onClick={goToHome}>Home</button> */}
            <div className="jumbotron text-center thanks" style={{margin: "2rem"}}>
                <h1 className="display-3">Thank You For Voting!</h1>
                <p className="lead">Result for this vote will be reflected soon.</p>
                <hr />
                    {/* <p>
                        Having trouble? <a href="">Contact us</a>
                    </p> */}
                    <p className="lead">
                        <button onClick={goToHome} className="btn btn-primary btn-sm" href="https://bootstrapcreative.com/" role="button">Continue to homepage</button>
                    </p>
            </div>
        </>
    );
}

export default ThanksForVote;