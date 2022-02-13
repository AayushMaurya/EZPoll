import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import decodeToken from "../../utils/decodeToken";
import { setAdmin } from "../../redux/actions/adminAction";
import { addNewAdmin, checkAdminLoginData} from "../../apis/adminApi"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminSignup = () => {
    const navigate = useNavigate();
    const store= useSelector((store) => store);
    const [signupInfo, setSignupInfo] = useState({
        name: "",
        email: "",
        dob: "",
        contactNumber: ""
    });
    const [loginInfo, setLoginInfo] = useState({
        registrationNumber: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if(store.admin.isAuthenticated){
            navigate('/admin');
        }      
    }, [store.admin.isAuthenticated])

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

        const data = await addNewAdmin(signupInfo);
        if(data.success)
        {
            console.log("admin can be added");

            setLoginInfo({
                registrationNumber: data.response.registrationNumber,
                password: data.response.dob
            });
            console.log(loginInfo);
            // now logging in the created account
            const token = await checkAdminLoginData(loginInfo);
            if(token)
            {
                const adminCridentials = decodeToken(token);
                dispatch(setAdmin(adminCridentials));
            }
            else{
                setIsLoading(false)
                alert("login info is wrong");
            }
        }
        else{
            console.log(data.message);
            alert(data.message);
            isLoading(false);
        }

    }

    return (
        <div>
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
        </div>
    );
}

export default AdminSignup;