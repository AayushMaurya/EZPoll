import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export const checkClientLoginData = async (loginInfo) => {
    try{
        const { data } = await axios.post("http://localhost:5000/api/client/login", loginInfo);

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
        const {data} = await axios.post("http://localhost:5000/api/client/addClient", signupInfo);

        console.log(data);
        return data;
    }
    catch(err){
        setAuthToken(false);
        return {success: false};
    }
}