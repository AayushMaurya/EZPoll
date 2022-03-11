import React, { useState } from "react";
import { Navigate } from "react-router";

const CreatePoll = () => { 

    const [pollinfo, setPollInfo] = useState({
        title: "",
        desc: "",
        option1: "",
        option2: ""
    });
    const [isCreated, setIsCreated] = useState(false);

    const changeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setPollInfo({
            ...pollinfo,
            [name]: value
        });
    }

    const formHandler = (e) => {
        e.preventDefault();
        
        setIsCreated(true);
    }

    return (
        <>
        {!isCreated && <div>
        <h1>Create a poll</h1>
        <form onSubmit={formHandler}>
        <lable>Title: </lable>
        <input type="text" name="title" required value={pollinfo.title} onChange={changeHandler} />
        <br />
        <lable>Description: </lable>
        <input type="text" name="desc" value={pollinfo.desc} onChange={changeHandler} />
        <br />
        <lable>Answer options: </lable>
        <input type="text" name="option1" required value={pollinfo.option1} onChange={changeHandler} />
        <br />
        <input type="text" name="option2" required value={pollinfo.option2} onChange={changeHandler} />
        <br />
        <button type="submit">Create</button>
        </form>
        </div>}
        {isCreated && <div>
            <h1>Your poll is successfull created</h1>
        </div>}
        </>
    );
}

export default CreatePoll;