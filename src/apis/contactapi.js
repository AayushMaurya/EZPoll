import axios from "axios";

export const contactCreater = async (formData) => {
    try{
        console.log("sending data: ", formData);
        const {data} = await axios.post("https://ezserver.herokuapp.com/api/client/feedback", formData);
        console.log("data received :", data);
        return data;
    }
    catch(err){
        return {
            success: false,
            message: "cannot take your response at this moment"
        }
    }
}