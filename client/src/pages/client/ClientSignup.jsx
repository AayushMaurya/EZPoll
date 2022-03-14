import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import decodeToken from "../../utils/decodeToken";
import { useNavigate } from "react-router-dom";
import { addNewClient, checkClientLoginData } from "../../apis/clientApi";
import { setClient } from "../../redux/actions/clientAction";
import { Link } from 'react-router-dom';

const ClientSignup = () => {
    const [signupInfo, setSignupInfo] = useState({
        name: "",
        email: "",
        dob: "",
        contactNumber: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const store= useSelector((store) => store);

    // if client logged in then navigate to clientHome
    useEffect(() => {
        if(store.client.isAuthenticated){
            navigate('/client');
        }      
    }, [store.client.isAuthenticated]);

    const changeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setSignupInfo({
            ...signupInfo,
            [name]: value
        });
    }

    const formHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const data = await addNewClient(signupInfo);
        if(data.success)
        {
            console.log("client can be added");
            alert(data.message);
            console.log(data);

            const token = await checkClientLoginData({registrationNumber: data.response.registrationNumber,
                password: data.response.dob});
            if(token)
            {
                const clientCridentials = decodeToken(token);
                dispatch(setClient(clientCridentials));
            }
            else{
                setIsLoading(false)
                alert("login info is wrong");
            }
        }
        else{
            console.log(data.message);
            alert(data.message);
            setIsLoading(false);
        }

    }

    return (
        <>
        <h1>This is client signup page</h1>
            <form onSubmit={formHandler}>
                <label>Name: </label>
                <input type="text" name="name" required value={signupInfo.name} onChange={changeHandler} />
                <br />
                <label>Email: </label>
                <input type="email" name="email" required value={signupInfo.email} onChange={changeHandler} />
                <br />
                <label>DOB: </label>
                <input type="text" name="dob" required value={signupInfo.dob} onChange={changeHandler} />
                <br />
                <label>contactNumber: </label>
                <input type="tel" name="contactNumber" required value={signupInfo.contactNumber} onChange={changeHandler} />
                <br />
                {!isLoading && <button type="submit">SignUp</button>}
            </form>
            <div>Already have an account <Link to="/clientLogin" >LogIn</Link></div>
        </>
    );
}

export default ClientSignup;