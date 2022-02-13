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