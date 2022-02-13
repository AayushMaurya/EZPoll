import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import { setAdmin } from "../../redux/actions/adminAction";
import decodeToken from "../../utils/decodeToken";
import { checkAdminLoginData } from "../../apis/adminApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const navigate = useNavigate();
    const store= useSelector((store) => store);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        registrationNumber: "",
        password: ""
    });

    useEffect(() => {
        if(store.admin.isAuthenticated){
            navigate('/admin');
        }      
    }, [store.admin.isAuthenticated])

    const changeHandler=(e)=>{
        let name = e.target.name;
        let value = e.target.value;

        setLoginInfo({ ...loginInfo, [name]: value });
    }

    const formHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const token = await checkAdminLoginData(loginInfo);
        if(token)
        {
            console.log("admin ok with token: ", token);
            const adminCridentials = decodeToken(token);
            console.log(adminCridentials);
            
            dispatch(setAdmin(adminCridentials));
        }
        else{
            console.log("login info is wrong");
            setIsLoading(false);
        }
    }

    return (
        <>
            <div>
                <form onSubmit={formHandler}>
                    <label>Regitration Number: </label>
                    <input type="text" name="registrationNumber" onChange={changeHandler} value={loginInfo.email} />
                    <br />
                    <label>Password: </label>
                    <input type="text" name="password" onChange={changeHandler} value={loginInfo.password} />
                    <br />
                    {!isLoading && <button type="submit">Login</button>}
                </form>
            </div>
        </>
    );
}

export default AdminLogin;