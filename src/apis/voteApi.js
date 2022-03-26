import axios from "axios";

// api request to create a vote portal
export const createVote = async (voteInfo) => {
    try{
        const { data } = await axios.post("https://ezserver.herokuapp.com/api/client/addposition", voteInfo);
        console.log("data received: ", data);
        return data;
    }
    catch (err) {
        return {
            success: false,
            message: "Vote cannot be created at this moment"
        };
    }
}

// api request to add candidate
export const addCandidate = async (candidate) =>{
    try{
        console.log("sending data: ", candidate);
        const {data} = await axios.post("https://ezserver.herokuapp.com/api/client/addCandidate", candidate);
        console.log("data received: ", data);
        return data;
    }
    catch (err) {
        console.log("given error:", err);
        return {
            success: false,
            message: "Cannot add candidate at this moment"
        }
    }
}

