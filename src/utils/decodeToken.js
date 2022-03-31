import jwt_decode from "jwt-decode";

const sign = require('jwt-encode');
const secret = 'secret';

export const encodeToken = (data) => {
    return sign(data, secret);
}

export const decodeToken = (token) =>{
    return jwt_decode(token);
}