import axios from "axios";

export const createPoll = async (pollInfo) => {
    try {
        const { data } = await axios.post("https://ezserver.herokuapp.com/api/poll/create", pollInfo);
        console.log(data);
        return data;
    }
    catch (err) {
        return {
            success: false,
            message: "Poll cannot be created"
        };
    }
}

export const getPollInfo = async (poll_id) => {
    const uri = "https://ezserver.herokuapp.com/api/poll/" + poll_id;
    try {
        const { data } = await axios.get(uri);
        return data;
    }
    catch (err) {
        console.log(err);
        return {
            success: false,
            message: "Some error occured, try again later"
        };
    }
}

export const submitPollChoice = async (userChoice) => {
    const uri = "https://ezserver.herokuapp.com/api/poll/";
    try{
        const {data} = await axios.post(uri, userChoice);
        return data;
    }
    catch (err) {
        console.log(err);
        return {
            success: false,
            message: "cannot take your vote"
        }
    }
}