import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export const checkClientLoginData = async (loginInfo) => {
    try{
        const { data } = await axios.post("https://ezserver.herokuapp.com/api/client/login", loginInfo);

        const { token } = data;

        localStorage.setItem('clientJwtToken', token);
        setAuthToken(token);
        
        return token;
    }
    catch(err){
        setAuthToken(false);
        return false;
    }
}

export const addNewClient = async (signupInfo) => {
    try{
        const {data} = await axios.post("https://ezserver.herokuapp.com/api/client/addClient", signupInfo);

        console.log(data);
        return data;
    }
    catch(err){
        setAuthToken(false);
        return {success: false,
                message: "cannot create account at this moment"};
    }
}