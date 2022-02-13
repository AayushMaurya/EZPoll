import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import { setClient } from "../../redux/actions/clientAction";
import decodeToken from "../../utils/decodeToken";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { checkClientLoginData } from "../../apis/clientApi";

const ClientLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        registrationNumber: "",
        password: ""
    });
    const store= useSelector((store) => store);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(store.client.isAuthenticated){
            navigate('/client');
        }      
    }, [store.client.isAuthenticated])

    const changeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setLoginInfo({ ...loginInfo, [name]: value });
    }

    const formHandler = async(e) => {
        e.preventDefault();
        setIsLoading(true);

        const token = await checkClientLoginData(loginInfo);
        if(token)
        {
            console.log("admin ok with token: ", token);
            const clientCridentials = decodeToken(token);
            console.log(clientCridentials);
            
            dispatch(setClient(clientCridentials));
        }
        else{
            console.log("login info is wrong");
            setIsLoading(false);
        }
    }

    return (
        <>
            <h1>This is client login page</h1>
            <br />
            <dvi>
                <form onSubmit={formHandler}>
                    <label>Registration No. </label>
                    <input type="text" name="registrationNumber" onChange={changeHandler} value={loginInfo.email} />
                    <br />
                    <label>Registration No. </label>
                    <input type="text" name="password" onChange={changeHandler} value={loginInfo.password} />
                    <br />
                    {!isLoading && <button type="submit">Login</button>}
                </form>
            </dvi>
        </>
    );
}

export default ClientLogin;