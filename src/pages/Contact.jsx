import React, { useState } from "react";
import { contactCreater } from "../apis/contactapi";

const Contact = () => {
    const [formData, setFormData] = useState({
        email: "",
        subject: "",
        message: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const changeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    const formHandler = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        const data = await contactCreater(formData);
        if(data.success)
        {
            alert(data.message);
            setIsLoading(false);
        }
        else{
            alert(data.message);
            setIsLoading(false);
        }
    }

    return(
        <>
            <h1>Contact Creater</h1>
            <form onSubmit={formHandler}>
                <label>Email: </label>
                <input type="email" name="email" onChange={changeHandler} value={formData.email} />
                <br />
                <label>Subject: </label>
                <input type="text" name="subject" onChange={changeHandler} value={formData.subject} />
                <br />
                <label>Message: </label>
                <textarea type="text" name="message" onChange={changeHandler} value={formData.message} />
                <br />
                {!isLoading && <button type="submit">submit</button>}
            </form>
        </>
    );
}

export default Contact;