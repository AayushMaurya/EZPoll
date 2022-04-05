import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getVoteInfo } from "../../apis/voteApi";
import { useNavigate } from "react-router";

const Vote = () => {
    const { id } = useParams();
    const [voteInfo, setVoteInfo] = useState();
    const [isVote, setIsVote] = useState(false);
    const navigate = useNavigate();
    const [userChoice, setUserChoice] = useState({
        position_id: "",
        choice_id: ""
    });

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

    const formHandler = (e) => {
        e.preventDefault();

        console.log("now the vote is being submitted");
        console.log("user chocice : ", userChoice);
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
                    <button type="submit">Vote</button>
                </form>
                </div>
            </div>}
        </>
    )
}

export default Vote;