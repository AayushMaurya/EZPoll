import React, { useState } from "react";
import { createPoll } from "../../apis/pollApi";

const CreatePoll = () => {

    const [pollinfo, setPollInfo] = useState({
        title: "",
        description: "",
        choice1: "",
        choice2: "",
        choice3: ""
    });
    const [isCreated, setIsCreated] = useState(false);
    const [poll_id, setpoll_id] = useState("");

    const changeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setPollInfo({
            ...pollinfo,
            [name]: value
        });
    }

    const formHandler = async (e) => {
        e.preventDefault();

        var data = await createPoll(pollinfo);

        if (data.success) {
            alert("Poll successfully created");
            setIsCreated(true);
            setpoll_id(data.poll.poll_id);
        }
        else
            console.log("ayu");
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
                    <input type="text" name="description" value={pollinfo.desc} onChange={changeHandler} />
                    <br />
                    <lable>Answer options: </lable>
                    <input type="text" name="choice1" required value={pollinfo.choice1} onChange={changeHandler} />
                    <br />
                    <input type="text" name="choice2" required value={pollinfo.choice2} onChange={changeHandler} />
                    <br />
                    <input type="text" name="choice3" required value={pollinfo.choice3} onChange={changeHandler} />
                    <br />
                    <button type="submit">Create</button>
                </form>
            </div>}
            {isCreated && <div>
                <h1>Your poll is successfull created</h1>
                <div><table className="table border">
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
                            <tr>
                                <td>share</td>
                                <td>http://localhost:3000/poll/{poll_id}</td>
                            </tr>
                        </tbody>
                    </table></div>
            </div>}
        </>
    );
}

export default CreatePoll;