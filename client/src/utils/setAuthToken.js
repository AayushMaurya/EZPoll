import axios from "axios"

const setAuthToken = (token) => {
    try{
        if(token){
            axios.defaults.headers.common['Authotization'] = token;
            console.log("default is set to token");
        }
        else{
            delete axios.defaults.headers.common['Authorization'];
        }
    }
    catch(err){
        console.log(err);
    }
}

export default setAuthToken;

// this will set token as default to header of every api request 