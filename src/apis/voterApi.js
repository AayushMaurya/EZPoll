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

export const giveVote = async(vote_info) =>{
    try{
        console.log("sending data: ", vote_info);
        const { data } = await axios.post("https://ezserver.herokuapp.com/api/voter/post", vote_info);
        console.log("received data: ", data);
        return {
            success: true,
            message: data.message
        };
    }
    catch (err){
        return{
            success: false,
            message: "cannot take vote at this moment"
        }
    }
}

export const setOTP = async(vote_info) => {
    try{
        console.log("sending data: ", vote_info);
        const { data } = await axios.post("https://ezserver.herokuapp.com/api/voter/postOTP", vote_info);
        console.log("received data: ", data);
        return {
            success: true,
            message: data.message
        };
    }
    catch (err) {
        console.log(err);
        return{
            success: false,
            message: "cannot take vote at this moment"
        }
    }
}