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

// api request to add voter list
export const addVoters = async (voterList) => {
    try{
        console.log("sending voter list: ", voterList);
        const { data } = await axios.post("https://ezserver.herokuapp.com/api/client/addVoter", voterList);
        console.log("received data: ", data);
        return (data);
    }
    catch(err){
        console.log(err);
        return {
            success: false,
            message: "cannot add voter list at this moment"
        }
    }
}

export const getVoteInfo = async (vote_id) => {
    const uri = "https://ezserver.herokuapp.com/api/voter/getAllCandidate/" + vote_id;
    try{
        const { data } = await axios.get(uri);
        return data;
    }
    catch(err){
        console.log(err);
        return {
            success: false,
            message: "cannot load the vote at this moment"
        };
    }
}

export const getVoteResult = async(position_id) => {
    const uri = "https://ezserver.herokuapp.com/api/voter/voteCount/" + position_id;
    console.log(uri);
    try{
        const { data } = await axios.get(uri);
        console.log("received data: ", data);
        return data;
    }
    catch(err){
        console.log(err);
        return {
            success: false,
            message: "cannot load the vote at this moment"
        };
    }
}

