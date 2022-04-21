import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getVoteResult } from "../../apis/voteApi";
import { useNavigate } from "react-router";

const VoteResult = () => {
    const { id } = useParams();
    const [voteInfo, setVoteInfo] = useState({});
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [allCandidates, setAllCandidates] = useState();

    useEffect(async () => {
        const data = await getVoteResult(id);

        if (data.success) {
            setVoteInfo(data);
            setAllCandidates(data.candidates);
            setIsLoading(false);
        } else {
            setIsLoading(true);
            alert(data.message);
            navigate("/allposition");
        }

        console.log("voteinfo: ", voteInfo);

    }, [])

    console.log("all candidates: ", allCandidates);

    return (
        <>
            <h1>This is vote result</h1>
            {!isLoading && <div>
                {allCandidates.map((candidate, index) => (
                    <div key={index}>
                        <div className="col chtxt">
                            {candidate.name} {candidate.partyName} {candidate.count}
                        </div>
                        
                    </div>
                ))}
            </div>}
        </>
    )
}

export default VoteResult;