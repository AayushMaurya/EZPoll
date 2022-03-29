import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export const checkVoterLoginData = async (loginInfo) => {
    try {
        const { data } = await axios.post("https://ezserver.herokuapp.com/api/voter/login", loginInfo);
        console.log("received data: ", data);

        localStorage.setItem('voterJwtToken', data.token);
        setAuthToken(data.token);

        return data;
    }
    catch (err) {
        console.log(err);
        return {
            success: false,
            message: "cannot login at this moment"
        }
    }
}