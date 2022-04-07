import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getVoteInfo } from "../../apis/voteApi";
import { useNavigate } from "react-router";
import { giveVote } from "../../apis/voterApi";
import Popup from "./Popup";
import { voterLogout } from "../../redux/actions/voterAction";
import { useDispatch } from "react-redux";

const Vote = () => {
    const { id } = useParams();
    const [voteInfo, setVoteInfo] = useState();
    const [isVote, setIsVote] = useState(false);
    const navigate = useNavigate();
    const [userChoice, setUserChoice] = useState({
        position_id: "",
        choice_id: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isPopup, setIsPopup] = useState(false);
    const dispatch = useDispatch();

    // fetch the vote info on loading the page
    useEffect(async() => {
        const data = await getVoteInfo(id);
        console.log("received data: ", data);

        if(data.success) {
            setVoteInfo(data);
            setIsVote(true);
        }
        else{
            alert(data.message);
            setIsVote(false);
            navigate("/");
        }

    }, []);

    const changeHandler = (e) => {
        console.log("choice: ", e.target.value);
        setUserChoice({
            ...userChoice,
            position_id: voteInfo.position[0].position_id,
            choice_id: e.target.value
        });
    }

    const formHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        console.log("now the vote is being submitted");
        console.log("user chocice : ", userChoice);

        const data = await giveVote(userChoice);
        if(data.success)
        {
            alert(data.message);
            if(data.message === "Already voted"){
                dispatch(voterLogout());
                navigate("/");
            }
            setIsPopup(true);
            setIsLoading(false);
        }
        else{
            alert(data.message);
            setIsLoading(false);
        }
    }

    return (
        <>
            {!isVote && <h2>Loading poll: {id} ...</h2>}
            {isVote && <div>
                <div>Position: {voteInfo.position[0].name}</div>
                <br />
                <div>Description: {voteInfo.position[0].description}</div>
                <br />
                <h3>Candidates: </h3>
                <div>
                <form onSubmit={formHandler}>
                    {voteInfo.result.map((candidate, index) => 
                        <div key={index}>
                            <img src={candidate.profile} height="200" width="200" alt="candidate image" />
                            <br />
                            <label>name: {candidate.name}</label>
                            <br />
                            <label>party name: {candidate.partyName}</label>
                            <br />
                            <label>phone: {candidate.phone}</label>
                            <br />
                            <label>email: {candidate.email}</label>
                            <br />
                            <input type="radio" name="choice" value={candidate._id} onChange={changeHandler}/>
                        </div>
                    )}
                    {!isLoading && <button type="submit">Vote</button>}
                </form>
                </div>
            </div>}
            {isPopup && <Popup handleClose={() => setIsPopup(false)} choice_id={userChoice.choice_id} position_id={userChoice.position_id} />}
        </>
    )
}

export default Vote;