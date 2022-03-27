import axios from "axios";

export const checkVoterLoginData = async (loginInfo) => {
    try{
        const { data } = await axios.post("https://ezserver.herokuapp.com/api/voter/login", loginInfo);
        console.log("received data: ", data);
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