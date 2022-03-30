import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getVoteInfo } from "../../apis/voteApi";
import { useNavigate } from "react-router";

const Vote = () => {
    const { id } = useParams();
    const [voteInfo, setVoteInfo] = useState();
    const [isVote, setIsVote] = useState(false);
    const navigate = useNavigate();

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
                    {voteInfo.result.map((candidate) => 
                        <div id={candidate._id}>
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
                        </div>
                    )}
                </div>
            </div>}
        </>
    )
}

export default Vote;