import React, { useState } from "react";

const CreatePoll = () => {
    const [options, setOptions] = useState({})
    const [formInfo, setFormInfo] = useState({
        title: "",
        description: "",
        options: options
    });

    const changeHandler = (e) => {
        let name=e.target.name;
        let value = e.target.value;

        setFormInfo({
            ...formInfo,
            [name]: value
        });
    }

    const formHandler = (e) => {
        e.preventDefault();
        console.log(formInfo);
    }

    return (
        <>
            <div>
                <h1>Create a Poll</h1>
                <form onSubmit={formHandler}>
                    <label>Title: </label>
                    <input type="text" name="title" value={formInfo.title} onChange={changeHandler} />
                    <br />
                    <label>Description: </label>
                    <input type="text" name="description" value={formInfo.description} onChange={changeHandler} />
                    <br />                 
                    <button type="submit">Create</button>
                </form>
            </div>
        </>
    );
}

export default CreatePoll;