import axios from "axios";

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
