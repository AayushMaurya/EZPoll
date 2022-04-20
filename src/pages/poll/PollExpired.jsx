import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const PollExpired = () => {
    const navigate = useNavigate();
    const goToHome = () => {
        navigate('/');
    }

    return (
        <>

            {/* <h1>Thanks for voting</h1>
            <button onClick={goToHome}>Home</button> */}
            <div className="jumbotron text-center thanks" style={{margin: "2rem"}}>
                <h1 className="display-3">This Poll is Expired</h1>
                {/* <p className="lead">Result for this vote will be reflected soon.</p> */}
                <hr />
                    <p>
                        Having trouble? <Link to="/contact">Contact us</Link>
                    </p>
                    <p className="lead">
                        <button onClick={goToHome} className="btn btn-primary btn-sm" href="https://bootstrapcreative.com/" role="button">Continue to homepage</button>
                    </p>
            </div>
        </>
    );
}

export default PollExpired;