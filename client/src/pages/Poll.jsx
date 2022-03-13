import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getPollInfo } from "../apis/pollApi";
import { useNavigate } from "react-router";

const Poll = () => {
    const { id } = useParams();
    const [pollinfo, setPollinfo] = useState({});
    const [isPoll, setIsPoll] = useState(false);
    const navigate = useNavigate();

    useEffect(async () => {
        const data = await getPollInfo(id);
        console.log(data);
        if (data.success) {
            setPollinfo(data.result[0]);
            console.log(pollinfo);
            setIsPoll(true);
        }
        else {
            alert(data.message);
            navigate('/');
        }
    }, []);

    console.log(id);
    return (
        <>
            {!isPoll && <h1> Loading poll {id} ...</h1>}
            {isPoll && <div><table className="table border">
                <tbody>
                    <tr>
                        <td>Title</td>
                        <td>{pollinfo.title}</td>
                    </tr>
                    <tr>
                        <td>Desc</td>
                        <td>{pollinfo.description}</td>
                    </tr>
                    <tr>
                        <td>choice1</td>
                        <td>{pollinfo.choice1}</td>
                    </tr>
                    <tr>
                        <td>choice2</td>
                        <td>{pollinfo.choice2}</td>
                    </tr>
                    <tr>
                        <td>choice3</td>
                        <td>{pollinfo.choice3}</td>
                    </tr>

                </tbody>
            </table></div>}
        </>
    )
}

export default Poll;