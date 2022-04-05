import React, { useEffect, useState } from "react";
import { getAllPolls } from "../../apis/clientApi";
import { useNavigate } from "react-router";

const ClientDashboard = () =>{
    const [allPoll, setAllPoll] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(async () => {
        const data = await getAllPolls();
        console.log("data: ", data);
        if(data.success)
        {
            setAllPoll(data.result);
            setIsLoading(false);
            console.log("all polls: ", allPoll);
        }
        else
        {
            alert(data.message);
            navigate('/');
            setIsLoading(true);
        }
    }, []);
    const data = getAllPolls();
    return (
        <>
            {isLoading ? <div>
                Loadinf Dashboard ...
            </div> : <div>
                {allPoll.map((poll, index) => (
                    <div key={index}>
                    <div>
                        poll name: {poll.title}
                    </div>
                    </div>
                ))}
            </div>}
        </>
    );
}

export default ClientDashboard;