import React, { useEffect, useState } from "react";
import { checkVoterLoginData } from "../../apis/voterApi"
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setVoter } from "../../redux/actions/voterAction";
import store from "../../redux/store";
import decodeToken from "../../utils/decodeToken";

const VoterLogin = () => {
    const [voterLoginInfo, setVoterLoginInfo] = useState({
        username: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const store = useSelector((store) => store);
    const dispatch = useDispatch();

    useEffect(() => {
        if (store.voter.isAuthenticated) {
            navigate("/voterHome")
        }
    });

    const changeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setVoterLoginInfo({
            ...voterLoginInfo,
            [name]: value
        });
    }

    const formHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        console.log("login info: ", voterLoginInfo);

        const data = await checkVoterLoginData(voterLoginInfo);
        if (data.success) {
            const voterCridentials = decodeToken(data.token);
            alert("loged in");
            dispatch(setVoter(voterCridentials));
        }
        else {
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