import React, { useEffect } from "react";
import { voterLogout } from "../../redux/actions/voterAction";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const VoterHome = () =>{

    const store = useSelector((store) => store);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(!store.voter.isAuthenticated) {
            navigate("/voterLogin")
        }
    })

    const logoutHandler = (e) =>{
        dispatch(voterLogout());
        navigate("/");
    }

    return (
        <>
            <h1>this is voter home page</h1>
            <button onClick={logoutHandler}>logout</button>
        </>
    );
}

export default VoterHome;