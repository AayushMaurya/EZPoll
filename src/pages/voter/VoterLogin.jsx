import React, { useState } from "react";
import { checkVoterLoginData } from "../../apis/voterApi"
import { useNavigate } from "react-router";

const VoterLogin = () => {
    const [voterLoginInfo, setVoterLoginInfo] = useState({
        username: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const changeHandler = (e) => {
        let name=e.target.name;
        let value=e.target.value;

        setVoterLoginInfo({
            ...voterLoginInfo,
            [name]: value
        });
    }

    const formHandler = (e) =>{
        e.preventDefault();
        setIsLoading(true);

        console.log("login info: ", voterLoginInfo);

        const data = checkVoterLoginData(voterLoginInfo);
        if(data.success)
        {
            alert("loged in");
            navigate("/");
        }   
        else{
            alert(data.message);
            setIsLoading(false);
        }
    }

    return (
        <>
           <form onSubmit={formHandler}>
               <lable>Username: </lable>
               <input type="text" name="username" value={voterLoginInfo.username} onChange={changeHandler} required />
               <br />
               <lable>Password: </lable>
               <input type="text" name="password" value={voterLoginInfo.password} onChange={changeHandler} required />
               <br />
               {!isLoading && <button type="submit">login</button>}
           </form>
        </>
    )
}

export default VoterLogin;