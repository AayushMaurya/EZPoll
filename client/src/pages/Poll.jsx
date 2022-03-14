import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getPollInfo, submitPollChoice } from "../apis/pollApi";
import { useNavigate } from "react-router";

const Poll = () => {
    const { id } = useParams();
    const [pollinfo, setPollinfo] = useState({});
    const [isPoll, setIsPoll] = useState(false);
    const navigate = useNavigate();
    const [userChoice, setUserChoice] = useState({
        _id: "",
        poll_id: id,
        choice: ""
    });
    const [loadinSubmit, setLoadingSubmit] = useState(false);

    useEffect(async () => {
        const data = await getPollInfo(id);
        console.log(data);
        if (data.success) {
            setPollinfo(data.result[0]);
            // console.log("pollinfo: ", pollinfo);
            setIsPoll(true);
            setUserChoice({
                ...userChoice,
                _id: pollinfo._id
            });
        }
        else {
            alert(data.message);
            navigate('/polls');
        }
    }, []);

    const changeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUserChoice({
            ...userChoice,
            [name]: value
        });
    }

    const formHandler = async (e) => {
        e.preventDefault();
        setLoadingSubmit(true);

        console.log("pollinfo: ", pollinfo);
        console.log("usechoice: ", userChoice);

        const data = await submitPollChoice(userChoice);
        if(data.success)
        {
            alert("choice successfully submited");
            // navigate(`/pollResult/{id}`);
        }
        else{
            alert(data.message);
            setLoadingSubmit(false);
        }
    }

    return (
        <>
            {!isPoll && <h1> Loading poll {id} ...</h1>}
            {isPoll && <div>
                <h1>{pollinfo.title}</h1>
                <h3>{pollinfo.description}</h3>
                <h3>Choices: </h3>
                <br />
                <form onSubmit={formHandler}>
                    <label>{pollinfo.choice1}</label>
                    <input type="radio" name="choice" value="choice1" onChange={changeHandler} />
                    <br />
                    <label>{pollinfo.choice2}</label>
                    <input type="radio" name="choice" value="choice2" onChange={changeHandler} />
                    <br />
                    <label>{pollinfo.choice3}</label>
                    <input type="radio" name="choice" value="choice3" onChange={changeHandler} />
                    <br />
                    {!loadinSubmit && <button type="submit" >Submit</button>}
                </form>
            </div>}
        </>
    )
}

export default Poll;