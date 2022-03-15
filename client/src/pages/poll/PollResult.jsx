import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getPollInfo } from "../../apis/pollApi";
import { useNavigate } from "react-router";

const PollResult = () => {
    const { id } = useParams();
    const [pollInfo, setPollInfo] = useState({});
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(async () => {
        const data = await getPollInfo(id);
        console.log("data received :", data)
        if(data.success){
            setPollInfo(data.result[0]);
            setIsLoading(false);
        }
        else{
            setIsLoading(true);
            alert(data.message);
            navigate('/polls');
        }
        
        console.log("poll info: ", pollInfo);
    }, []);

    return (
        <>
            {isLoading ? <div>Loading Result: {id}</div> : <div>
                <div>
                    {pollInfo.choice1} : {pollInfo.choice1Vote}
                </div>
                <div>
                    {pollInfo.choice2} : {pollInfo.choice2Vote}
                </div>
                <div>
                    {pollInfo.choice3} : {pollInfo.choice3Vote}
                </div>
            </div>}
        </>
    );
}

export default PollResult;